import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameSelection = ({ platform, onSelect }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Get game list
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.igdb.com/v4/games', {
          headers: {
            'Client-ID': 'dxfcuakih9y23imizkdp02z16ekbds',
            'Authorization': `Bearer Yfx9wlhmzfpx8n0h69n202ksrr68pkr`,
            'Accept': 'application/json'
          },
          data: `fields name; where platforms = ${platform.id};`
        });
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
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
