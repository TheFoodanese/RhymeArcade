// GameSelection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameSelection = ({ platform, onSelect }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`https://gamedatabasestefan-skliarovv1.p.rapidapi.com/getGames`, {
          headers: {
            'X-RapidAPI-Key': '9267dab30amsh5c1c1a0dd63db9ap12616ajsn59ade57c372f',
            'X-RapidAPI-Host': 'GameDatabasestefan-skliarovV1.p.rapidapi.com'
          },
          params: {
            platform: platform.name
          }
        });

        // Fetch keywords for each game
        const gamesWithKeywords = await Promise.all(response.data.map(async (game) => {
          const keywordsResponse = await axios.get(`https://gamedatabasestefan-skliarovv1.p.rapidapi.com/getKeywords`, {
            headers: {
              'X-RapidAPI-Key': '9267dab30amsh5c1c1a0dd63db9ap12616ajsn59ade57c372f',
              'X-RapidAPI-Host': 'GameDatabasestefan-skliarovV1.p.rapidapi.com'
            },
            params: {
              gameId: game.id
            }
          });
          // Return the game object with keywords added
          return { ...game, keywords: keywordsResponse.data };
        }));

        setGames(gamesWithKeywords);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    if (platform) {
      fetchGames();
    }
  }, [platform]);

  return (
    <div>
      <h2>Select a Game</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <button onClick={() => onSelect(game)}>{game.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameSelection;
