


import "../App.css";

import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const ChampionShow = () => { 
  const [champion, setChampion] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [championData, setChampionData] = useState(null);
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


        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  

    
  }, [id]);
  
  return (
    <div>
      {champion ? (
        
        <div className="ChampShowDiv">
          {championData ?(
          <h1 className="ChampShow"><img  src={championData.url} alt={`Not found`}></img> {champion.name} </h1>
        ) : (<h1 className="ChampShow"><img   src={`Not found`}></img> {champion.name} </h1>) }
          <h2>Items:</h2>
          <ul>
          {champion.items.map((itemId, index) => {
  
  
  const item = itemData.find(item => parseInt(item.id) === parseInt(itemId));
  
  return (
    <li key={index}>
      {item ? (
        <img src={item.url} alt={`Item ${itemId}`} />
      ) : (
        <span>Item {itemId} not found</span>
      )}
    </li>
  );
})}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChampionShow;
