import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import SearchIcon from "./search.svg";

const Champions_URL='https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/champion.json'

const App = () => {
  const [Champions, setChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Champions_URL);
        const championData = response.data.data;
        
        const splittedChampions = Object.entries(championData).map(([key, value]) => ({
          name: value.name,
          title: value.title,
          champArt: `https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${value.image.full}`,
          statsPage: `https://LeagueLookUp.pl/${value.name}`,
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
      <h1>League LookUp</h1>
        
      <div className="search">
        <input 
          placeholder="Search your champion"
          value={searchTerm}
          onChange={handleSearch}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={()=>{}}
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
