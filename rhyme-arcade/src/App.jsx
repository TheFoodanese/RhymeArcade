import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import SpotifyIntegration from './SpotifyIntegration';

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  // Function to handle game selection
  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div>
      <h1>Welcome to Rhyme Arcade!</h1>
      <SpotifyIntegration selectedGame={selectedGame} />
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
