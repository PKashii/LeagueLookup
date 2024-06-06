import "../App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const ChampionShow = () => { 
  const [champion, setChampion] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [championData, setChampionData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const championResponse = await axios.get(`http://localhost:3000/builds/${id}`);
        setChampion(championResponse.data);

        const championDataResponse = await axios.get(`http://localhost:3000/championAssets/${id}`);
        setChampionData(championDataResponse.data);

        const itemResponse = await axios.get(`http://localhost:3000/itemAssets`);
        setItemData(itemResponse.data);

        const favoriteResponse = await axios.get(`http://localhost:3000/favorites`);
        const isFav = favoriteResponse.data.some(fav => fav.id === parseInt(id));
        setIsFavorite(isFav);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:3000/favorites/${id}`);
      } else {
        await axios.post(`http://localhost:3000/favorites`, { id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <div>
      {champion ? (
        <div className="ChampShowDiv">
          {championData ? (
            <h1 className="ChampShow">
              <img src={championData.url} alt={`Not found`} />
              {champion.name}
              <span 
                className={`favorite-icon ${isFavorite ? 'favorite' : ''}`} 
                onClick={handleFavoriteToggle}
              >
                ★
              </span>
            </h1>
          ) : (
            <h1 className="ChampShow">
              <img src={`Not found`} alt="Not found" /> 
              {champion.name}
            </h1>
          )}
          <h2>Items:</h2>
          <ul>
            {champion.items.map((itemId, index) => {
              const item = itemData.find(item => parseInt(item.id) === parseInt(itemId));
              return (
                <li key={index}>
                  {item ? (
                    <div>
                      <img src={item.url} alt={`Item ${itemId}`} />
                      <p>{item.name}</p>
                    </div>
                  ) : (
                    <span>Item {itemId} not found</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>...</p>
      )}
    </div>
  );
};

export default ChampionShow;
