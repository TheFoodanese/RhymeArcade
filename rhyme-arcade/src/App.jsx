 spotify
// App.jsx
import React, { useState, useEffect } from 'react';
import GameSelection, { fetchGames } from './GameSelection';
import SpotifyIntegration from './SpotifyIntegration';
import './App.css';

function App() {
spotify
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGames();
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchData();
  }, []);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };
=======
  const [selectedPlatform, setSelectedPlatform] = React.useState(null);
  const [selectedGame, setSelectedGame] = React.useState(null);
  const [games, setGames] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchGames();
          setGames(data.results);
        } catch (error) {
          // Handle error
        }
      };
  
      fetchData();
    }, []);
 main

  return (
    <div>
      <h1>Welcome to Rhyme Arcade!</h1>
 spotify
      {!games.length && <p>Loading games...</p>}
      {!!games.length && !selectedGame && <GameSelection games={games} onSelect={handleGameSelect} />}
      {selectedGame && <SpotifyIntegration selectedGame={selectedGame} />}
=======
      
    </div>
  );
}

export default App;
