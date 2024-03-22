import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { redirectToAuthCodeFlow, getAccessToken, refreshAccessToken, clearTokens } from './spotifyAuth';

const SpotifyIntegration = () => {
  const location = useLocation();
  const history = useHistory();

  const gameName = location.state?.gameName;
  const [playlists, setPlaylists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const expiresIn = localStorage.getItem('expiresIn');
      if (!accessToken || !expiresIn || Date.now() > parseInt(expiresIn, 10)) {
        if (!location.search.includes('code=')) {
          setIsLoggedIn(false);
          return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          await getAccessToken("60e38dde15b847ddb34db989a19e4c97", code);
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [location]);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const expiresIn = localStorage.getItem('expiresIn');
      if (!expiresIn || Date.now() > parseInt(expiresIn, 10)) {
        await refreshAccessToken("60e38dde15b847ddb34db989a19e4c97");
      }
    };

    const fetchPlaylists = async () => {
      if (!isLoggedIn || !gameName) return;

      await checkAndRefreshToken();
      const accessToken = localStorage.getItem('accessToken');
      const headers = new Headers({
        'Authorization': `Bearer ${accessToken}`,
      });

      try {
        console.log('Fetching playlists for game:', gameName);
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(gameName)}&type=playlist&limit=50`, { headers });
        const data = await response.json();
        if (data.playlists) {
          setPlaylists(data.playlists.items);
        } else {
          console.error('Spotify API error:', data.error);
        }
      } catch (error) {
        console.error('Error searching for playlists:', error);
      }
    };

    fetchPlaylists();
  }, [gameName, isLoggedIn]);

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
  };

  const navigateToPlaylistsPage = () => {
    history.push('/playlists', { playlists });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={() => redirectToAuthCodeFlow("60e38dde15b847ddb34db989a19e4c97")}>Login with Spotify</button>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>Playlists for {gameName}:</h2>
          <button onClick={navigateToPlaylistsPage}>View Playlists</button>
        </>
      )}
    </div>
  );
};

export default SpotifyIntegration;
