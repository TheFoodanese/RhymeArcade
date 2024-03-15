import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlatformSelection = ({ onSelect }) => {
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const options = {
          method: 'POST',
          url: 'https://gamedatabasestefan-skliarovv1.p.rapidapi.com/getPlatforms',
          headers: {
            'X-RapidAPI-Key': '9267dab30amsh5c1c1a0dd63db9ap12616ajsn59ade57c372f',
            'X-RapidAPI-Host': 'GameDatabasestefan-skliarovV1.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        setPlatforms(response.data);
      } catch (error) {
        setError('Error fetching platforms. Please try again later.');
      }
    };

    fetchPlatforms();
  }, []);

  return (
    <div>
      <h2>Select a Platform:</h2>
      {error && <p>{error}</p>}
      <ul>
        {platforms.map(platform => (
          <li key={platform.id} onClick={() => onSelect(platform)}>
            {platform.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformSelection;
