import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import SearchIcon from "./search.svg";

const Champions_URL='https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json'

const App = () => {
  const [czempioni, setCzempioni] = useState([]);
  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Champions_URL);
        const championData = response.data.data;
        
        
        const wyodrębnieniCzempioni = Object.entries(championData).map(([klucz, wartość]) => ({
          nazwa: wartość.name,
          obraz: `https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${wartość.image.full}`,
        }));
        setCzempioni(wyodrębnieniCzempioni);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>League Lookup</h1>
        
        
        <div className="search">
                <input 
                placeholder="Search your champion"
                value=""
                onChange={()=>{}}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>{}}
                />
            </div>
      
      <ul>
        {czempioni.map(czempion => (
          <li key={czempion.nazwa}>
            <img src={czempion.obraz} alt={czempion.nazwa} />
            <span>{czempion.nazwa}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

