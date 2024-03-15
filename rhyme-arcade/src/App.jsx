import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
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

      <PlatformSelection onSelect={handlePlatformSelect} />
      {selectedPlatform && (
        <GameSelection platform={selectedPlatform} onSelect={handleGameSelect} />
      )}
      {selectedGame && (
        <SpotifyIntegration selectedGame={selectedGame} />
      )}
      {SpotifyIntegration}
    


    </div>
  );
}

export default App;
