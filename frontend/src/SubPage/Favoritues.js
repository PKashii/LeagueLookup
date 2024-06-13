import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favoriteChampions, setFavoriteChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
      }
    const fetchFavorites = async () => {
      try {
        const favoriteResponse = await axios.get(`http://localhost:3000/favorites`, {
          headers: {
            'Authorization': localStorage.getItem('token') 
          }
        });

        const favoriteIds = favoriteResponse.data;

        const championDataResponses = await Promise.all(
          favoriteIds.map(id => axios.get(`http://localhost:3000/championAssets/${id}`))
        );

        const championsData = championDataResponses.map(response => response.data);
        setFavoriteChampions(championsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleChampionClick = (id) => {
    navigate(`/build/${id}`);
  };

  return (
    <div>
      <h2>Your Favorite Champions</h2>
      <ul>
        {favoriteChampions.map((champion, index) => (
          <li key={index} onClick={() => handleChampionClick(champion.id)} style={{ cursor: 'pointer' }}>
            <div>
              <img src={champion.url} alt={`Champion ${champion.name}`} />
              <p>{champion.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;