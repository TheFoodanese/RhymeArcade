import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const SpotifyIntegration = ({ selectedGame }) => {
  const { isAuthenticated, user, logout, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [spotifyUserId, setSpotifyUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!isAuthenticated) {
 spotify
          throw new Error('User is not authenticated.');
=======
          loginWithRedirect();
          return;
 main
        }

        // Check if Spotify user ID is available in Auth0 user metadata
        if (user && user.sub && user.sub.split('|').length > 1) {
          const metadataResponse = await axios.get(`https://your-auth0-domain/userinfo`, {
            headers: {
              Authorization: `Bearer ${user.sub}`,
            },
          });
 spotify
          const spotifyId = metadataResponse.data && metadataResponse.data['https://spotify/user_id'];
          
          if (!spotifyId) {
            throw new Error('Spotify user ID not found.');
=======
        const { keywords, genre } = selectedGame;
        const spotifyUsername = user.nickname;
        const playlistName = `${spotifyUsername}'s ${selectedGame.name} Playlist`;

        // Combine keywords and genre into a single string
        const playlistDescription = `Playlist based on selected game: ${selectedGame.name}. Genres: ${genre}. Keywords: ${keywords.join(', ')}`;

        const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists`, {
          name: playlistName,
          description: playlistDescription,
          public: true
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
main
          }

          setSpotifyUserId(spotifyId);
        } else {
          throw new Error('Invalid user or Spotify user ID not found.');
        }
      } catch (error) {
        console.error('Error fetching Spotify user ID:', error);
        setError('Error fetching Spotify user ID. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
 spotify
  }, [isAuthenticated, user]);

  const createPlaylist = async () => {
    try {
      setLoading(true);

      if (!isAuthenticated) {
        throw new Error('User is not authenticated.');
      }

      const accessToken = await getAccessTokenSilently();

      // Create playlist using the Spotify user ID
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
        {
          name: `${selectedGame.name} Playlist`,
          description: `Playlist created from Rhyme Arcade for ${selectedGame.name}.`,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Playlist created with ID:', response.data.id);
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Error creating playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };
=======
 

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {isAuthenticated && (
        <div>
          <p>Logged in as {user.name}</p>
          {spotifyUserId && (
            <button onClick={createPlaylist}>Create Playlist</button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({ screen_hint: 'login', connection: 'spotify' })}>
          Login with Spotify
        </button>
      )}
    </div>
  );
};

export default SpotifyIntegration;
