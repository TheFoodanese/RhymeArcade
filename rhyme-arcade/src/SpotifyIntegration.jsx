import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const SpotifyIntegration = ({ selectedGame }) => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);

        if (!isAuthenticated) {
          return;
        }

        const accessToken = await getAccessTokenSilently();

        // Get keywords and genre from selected game
        const { keywords, genre } = selectedGame;

        // Get Spotify username
        const spotifyUsername = user.nickname;

        // Create playlist name using login details
        const playlistName = `${spotifyUsername}'s ${selectedGame.name} Playlist`;

        const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists`, {
          name: playlistName,
          description: `Playlist based on selected game: ${selectedGame.name}`,
          public: true
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        setPlaylistUrl(playlistResponse.data.external_urls.spotify);
      } catch (error) {
        console.error('Error:', error);
        setError('Error creating playlist. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedGame) {
      fetchData();
    }
  }, [getAccessTokenSilently, isAuthenticated, selectedGame, user]);

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login to Spotify</button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {playlistUrl && (
        <div>
          <h2>Playlist Created</h2>
          <p>Listen to your playlist <a href={playlistUrl} target="_blank" rel="noopener noreferrer">here</a></p>
        </div>
      )}
    </div>
  );
};

export default SpotifyIntegration;
