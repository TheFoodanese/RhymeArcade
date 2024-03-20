import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaWindows, FaPlaystation, FaXbox, FaSteam } from 'react-icons/fa';

const apiKey = '2e34e67511c14a3d880db20cf0570831'; 
const apiUrl = 'https://api.rawg.io/api';

export const fetchGames = async (page = 1, pageSize = 90) => {
  try {
    const response = await axios.get(`${apiUrl}/games?key=${apiKey}&page=${page}&page_size=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

const GameSelection = ({ onSelect }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGames();
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Error fetching games. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  // Function to render platform symbols based on game platforms
  const renderPlatformIcons = (platforms) => {
    return platforms.map((platform) => {
      console.log('Platform:', platform.platform.name); 
      switch (platform.platform.name.toLowerCase()) {
        case 'pc':
          return <FaWindows key={platform.platform.id} />;
        case 'playstation':
          return <FaPlaystation key={platform.platform.id} />;
        case 'xbox':
          return <FaXbox key={platform.platform.id} />;
        case 'steam':
          return <FaSteam key={platform.platform.id} />;
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <h2>Select a Game:</h2>
      {loading && <p>Loading games...</p>}
      {error && <p>{error}</p>}
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game.id} onClick={() => onSelect(game)}>
            <img src={game.background_image} alt={game.name} style={{ width: '100%' }} />
            <p>{game.name}</p>
            <div>{renderPlatformIcons(game.platforms)}</div> {/* platform icons */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameSelection;
