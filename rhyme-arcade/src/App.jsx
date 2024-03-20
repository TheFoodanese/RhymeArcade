import React, { useState, useEffect } from 'react';
import GameSelection, { fetchGames } from './GameSelection';
import SpotifyIntegration from './SpotifyIntegration';
import './App.css';

function App() {
  // State variables for selected game and list of games
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);

  // Effect hook to fetch games data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch games data
        const data = await fetchGames();
        // Update games state with fetched data
        setGames(data.results);
      } catch (error) {
        // Handle error if fetching data fails
        console.error('Error fetching games:', error);
      }
    };

    // Invoke fetchData function when component mounts
    fetchData();
  }, []);

  // Function to handle game selection
  const handleGameSelect = (game) => {
    // Update selectedGame state with the selected game
    setSelectedGame(game);
  };

  // JSX rendering
  return (
    <div>
      <h1>Welcome to Rhyme Arcade!</h1>

      {/* Display loading message if games data is not loaded yet */}
      {!games.length && <p>Loading games...</p>}
      {/* Display GameSelection component if games data is loaded and no game is selected */}
      {!!games.length && !selectedGame && <GameSelection games={games} onSelect={handleGameSelect} />}
      {/* Display SpotifyIntegration component if a game is selected */}
      {selectedGame && <SpotifyIntegration selectedGame={selectedGame} />}
    </div>
  );
}

export default App;
