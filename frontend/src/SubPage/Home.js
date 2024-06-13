import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import SearchIcon from "./search.svg";

const Champions_URL = 'http://localhost:5000/championAssets'; // URL Backend

const App = () => {
  const [Champions, setChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Champions_URL);
        
        const championData = response.data;

        const splittedChampions = championData.map(champion => ({
          name: champion.name,
          title: champion.title,
          champArt: champion.url,
          statsPage: `http://localhost:3000/build/${champion.name}`,
        }));
        setChampions(splittedChampions);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChampions = Champions.filter(champion =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="league-text">
        <span className="league">League</span>
        <span className="up">up</span>
      </div>
      <div className="look">
        <span>Look</span>
      </div>
  
      <div className="search">
        <input
          placeholder="Search Your Champion"
          value={searchTerm}
          onChange={handleSearch}
        />
        <img
          src={SearchIcon}
          alt="szukaj"
          onClick={() => {}}
        />
      </div>
  
      <ul>
        {filteredChampions.map(champion => (
          <li key={champion.name}>
            <a href={champion.statsPage} target="_blank" rel="noopener noreferrer">
              <img src={champion.champArt} alt={champion.name} />
              <h2>{champion.name}</h2>
              <h3>{champion.title}</h3>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  
};

export default App;
