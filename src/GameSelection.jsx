import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FaWindows, FaPlaystation, FaXbox, FaSteam } from 'react-icons/fa'; // Import platform icons

const GameSelection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.rawg.io/api/games?key=2e34e67511c14a3d880db20cf0570831`);
        setGames(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Error fetching games. Please try again.');
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

  // Function to render platform icons based on game platforms
  const renderPlatformIcons = (platforms) => {
    return platforms.map((platform) => {
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
          <div key={game.id}>
            <Link to={{
              pathname: `/games/${game.id}`,
              state: { gameName: game.name }
            }}>
              <img src={game.background_image} alt={game.name} style={{ width: '100%' }} />
              <p>{game.name}</p>
              <div>{renderPlatformIcons(game.platforms)}</div> {/* Render platform symbols */}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameSelection;
