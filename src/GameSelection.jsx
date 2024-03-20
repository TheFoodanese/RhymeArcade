import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Importing Slider component from react-slick library
import 'slick-carousel/slick/slick.css'; // Importing slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Importing slick carousel theme CSS
import { FaWindows, FaPlaystation, FaXbox, FaSteam } from 'react-icons/fa'; // Importing platform icons from react-icons/fa

// Define API key and URL for fetching games data
const apiKey = '2e34e67511c14a3d880db20cf0570831';
const apiUrl = 'https://api.rawg.io/api';

// Function to fetch games data from the API
export const fetchGames = async () => {
  try {
    const response = await axios.get(`${apiUrl}/games?key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

// GameSelection component responsible for displaying games and handling game selection
const GameSelection = ({ onSelect }) => {
  const [games, setGames] = useState([]); // State to store fetched games data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(''); // State to store error message if any
  const [filteredGames, setFilteredGames] = useState([]);


  // // Effect hook to fetch games data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true); // Set loading to true before fetching data
  //       const data = await fetchGames(); // Fetch games data from the API
  //       setGames(data.results); // Set fetched games data to the state
  //     } catch (error) {
  //       console.error('Error fetching games:', error);
  //       setError('Error fetching games. Please try again.'); // Set error message if fetching fails
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching data
  //     }
  //   };

  //   fetchData(); // Invoke fetchData function
  // }, []); // Dependency array to run the effect only once when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGames();
        console.log("data:",data);
        // setGames(data.results);
        const gameResults = data.results;
        setGames(gameResults);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//         setFilteredGames([]);
//     } else {
//         const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
//         setFilteredGames(filteredGames);
//     }
// };

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//     console.log(event.target.value);
// };

  // Settings for the Slider component
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
      console.log('Platform:', platform.platform.name); // Log platform name to console
      switch (platform.platform.name.toLowerCase()) {
        case 'pc':
          return <FaWindows key={platform.platform.id} />; // Render Windows icon for PC platform
        case 'playstation':
          return <FaPlaystation key={platform.platform.id} />; // Render PlayStation icon for PlayStation platform
        case 'xbox':
          return <FaXbox key={platform.platform.id} />; // Render Xbox icon for Xbox platform
        case 'steam':
          return <FaSteam key={platform.platform.id} />; // Render Steam icon for Steam platform
        default:
          return null;
      }
    });
  };

  // JSX representing the GameSelection component UI
  return (
    <div>
      <h2>Select a Game:</h2>
      {/* <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search for a game" />
      <button onClick={handleSearch}>Search</button> */}
      {loading && <p>Loading games...</p>} {/* Display loading message while fetching data */}
      {error && <p>{error}</p>} {/* Display error message if fetching fails */}
      <Slider {...settings}> {/* Slider component to display games */}
        {/* Map through fetched games data and render game items */}
        {games.map((game) => (
          <div key={game.id} onClick={() => onSelect(game)}> {/* Handle click event for game selection */}
          <div>
            {filteredGames.length > 0 ? (
            <ul>
            {filteredGames.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
          ) : (
           <div>No games input </div>
           )}
          </div>
            <img src={game.background_image} alt={game.name} style={{ width: '100%' }} /> {/* Game image */}
            <p>{game.name}</p> {/* Game name */}
            <div>{renderPlatformIcons(game.platforms)}</div> {/* Render platform icons */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameSelection; // Export the GameSelection component
