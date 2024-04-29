import { useEffect, useState, Component } from "react";
import React from "react";

import "../App.css";
import pfp from './temo.png'
import axios, { Axios } from "axios";


const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:3000/itemAssets"); 
        setMatches(response.data);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchMatches();

    
    return () => {
      
    };
  }, []); 

  return (
    <div>
      <h1>Match List</h1>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <img src={match.url}></img>
            {match.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;