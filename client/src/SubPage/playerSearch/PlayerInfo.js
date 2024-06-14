import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 

const PlayerInfo = ({ playerInfo }) => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    const fetchIconUrl = async () => {
      try {
        const response = await axios.get(`/iconAssets`);
        const icon = response.data.find(icon => icon.id === playerInfo.profileIconId);
        if (icon) {
          setIconUrl(icon.url);
        } else {
          console.error('Icon not found for profileIconId:', playerInfo.profileIconId);
        }
      } catch (error) {
        console.error('Error fetching icon URL:', error);
      }
    };

    fetchIconUrl();
  }, [playerInfo.profileIconId]);

  if (!iconUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-info">
      <img src={iconUrl} alt="Ikona gracza" />
      <h2>Level: {playerInfo.summonerLevel}</h2>
    </div>
  );
};

export default PlayerInfo;
