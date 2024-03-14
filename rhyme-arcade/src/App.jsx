import { useState } from 'react'
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css'
import SpotifyIntegration from './SpotifyIntegration';

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

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  // Function to handle game selection
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
      {SpotifyIntegration}
      <SpotifyIntegration selectedGame={selectedGame} />
    </div>
  );
};


export default App
