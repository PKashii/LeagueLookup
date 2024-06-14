import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Champions_URL = "http://localhost:5000/championAssets";

const MatchHistory = ({ matchHistory }) => {
  const [championImages, setChampionImages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const images = {};

        
        for (const match of matchHistory) {
          for (const participant of match.info.participants) {
            const championName = participant.championName;
            if (!images[championName]) {
              const response = await axios.get(`${Champions_URL}/${championName}`);
              images[championName] = response.data.url;
            }
          }
        }

        setChampionImages(images);
      } catch (error) {
        console.error("Error fetching champion images:", error);
      }
    };

    fetchData();
  }, [matchHistory]);

  return (
    <div>
      <h2>Match History</h2>
      <ul>
        {matchHistory.map((match, matchIndex) => (
          <li key={matchIndex}>
            <h2>Match {matchIndex + 1}</h2>
            
            {match.info && (
              match.info.participants[0] && (
                <div>
                  <img
                    src={championImages[match.info.participants[0].championName]}
                    alt={`Champion ${match.info.participants[0].championName}`}
                    className="champion-image"
                  />
                  <div>
                    <h2>{match.info.participants[0].championName}</h2>
                    <h2>Kills: {match.info.participants[0].kills}</h2>
                    <h2>Deaths: {match.info.participants[0].deaths}</h2>
                    <h2>Assists: {match.info.participants[0].assists}</h2>
                    <h2>CS: {match.info.participants[0].totalMinionsKilled}</h2>
                  </div>
                </div>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchHistory;
