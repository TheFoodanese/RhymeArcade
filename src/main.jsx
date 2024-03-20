import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// Render the App component wrapped in Auth0Provider for authentication
ReactDOM.render(
  <Auth0Provider
    domain="dev-6ziljfb0z6s42dae.us.auth0.com" // Auth0 domain
    clientId="FKcS6yZI6zIfbHR4FRhUAM8R0hSkDFre" // Auth0 client ID
    audience="http://localhost:5174/" // Audience for the API
    redirectUri={window.location.origin} // Redirect URI after authentication
    clientSecret="r-fTSXPOvJy9bBgxEtGew-Aquc_R506Z0_tRPJw_biKBHhMlCodSuP3uB4hCf5Rm" // Client secret
  >
    <App /> {/* App component */}
  </Auth0Provider>,
  document.getElementById('root') // Render to root element in the HTML
);
