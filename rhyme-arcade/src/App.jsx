import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import PlatformSelection from './PlatformSelection';
import GameSelection from './GameSelection';
import SpotifyIntegration from './SpotifyIntegration';
import './App.css'

const App = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div>
      <h1>Welcome to Rhyme Arcade!</h1>
       <div className="outer-rec">
        <div className='inner-rec'>
          <h1>Please Select your Console</h1>
        </div>
      </div>

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
};

ReactDOM.render(
  <Auth0Provider
    domain="dev-6ziljfb0z6s42dae.us.auth0.com"
    clientId="FKcS6yZI6zIfbHR4FRhUAM8R0hSkDFre"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

export default App;
