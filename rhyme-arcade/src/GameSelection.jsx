
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '2e34e67511c14a3d880db20cf0570831'; 
const apiUrl = 'https://api.rawg.io/api';

export const fetchGames = async () => {
  try {
    const response = await axios.get(`${apiUrl}/games?key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};