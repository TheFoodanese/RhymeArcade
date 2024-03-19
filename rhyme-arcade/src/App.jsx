import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import PlatformSelection from './PlatformSelection';
import { fetchGames } from './GameSelection';
import SpotifyIntegration from './SpotifyIntegration';
import './App.css'

function App() {
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
  

  return (
    <div>
      <h1>Welcome to Rhyme Arcade!</h1>
      <div className="outer-rec">
        <div className='inner-rec'>
          <h1>Please Select your Console</h1>
        </div>
      </div>

      {!selectedPlatform && <PlatformSelection onSelect={setSelectedPlatform} />}
      {selectedPlatform && !selectedGame && <GameSelection platform={selectedPlatform} onSelect={setSelectedGame} />}
      {selectedGame && <SpotifyIntegration selectedGame={selectedGame} />}

      <PlatformSelection onSelect={handlePlatformSelect} />
      {selectedPlatform && (
        <GameSelection platform={selectedPlatform} onSelect={handleGameSelect} />
      )}
      {selectedGame && (
        <SpotifyIntegration selectedGame={selectedGame} />
      )}
      {SpotifyIntegration}
      
    <div>
      <h1>Game List</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>


    </div>
  );
}

export default App;
