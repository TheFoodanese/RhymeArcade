import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlatformSelector = ({ onSelect }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get('https://api.igdb.com/v4/platforms', {
          headers: {
            'Client-ID': 'dxfcuakih9y23imizkdp02z16ekbds',
            'Authorization': `Bearer Yfx9wlhmzfpx8n0h69n202ksrr68pkr`,
            'Accept': 'application/json'
          }
        });
        setPlatforms(response.data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };

    fetchPlatforms();
  }, []);

  return (
    <div>
      <h2>Select a Platform:</h2>
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

export default PlatformSelector;
