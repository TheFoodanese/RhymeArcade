import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameSelection from './GameSelection';
import SpotifyIntegration from './SpotifyIntegration';
import PlaylistsPage from './PlaylistsPage'; // Import PlaylistsPage component
import CallbackComponent from './CallbackComponent'; // Import CallbackComponent
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Welcome to Rhyme Arcade!</h1>
        </header>
        <Switch>
          <Route exact path="/" component={GameSelection} />
          <Route path="/games/:id" component={SpotifyIntegration} />
          <Route path="/playlists" component={PlaylistsPage} />
          <Route path="/callback" component={CallbackComponent} /> {/* Add route for callback */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
