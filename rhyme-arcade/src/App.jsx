import React from 'react';
import PlatformSelection from './PlatformSelection';
import GameSelection from './GameSelection';
import SpotifyIntegration from './SpotifyIntegration';
import './App.css'

function App() {
  const [selectedPlatform, setSelectedPlatform] = React.useState(null);
  const [selectedGame, setSelectedGame] = React.useState(null);

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
    </div>
  );
}

export default App;
