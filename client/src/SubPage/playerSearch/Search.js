import React, { useState } from 'react';
import axios from 'axios';
import PlayerSearch from './PlayerSearch';
import PlayerInfo from './PlayerInfo';
import MatchHistory from './MatchHistory';
import './styles.css';

const Search = () => {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [error, setError] = useState(null);

  const searchPlayer = async (gameName, tagLine, server) => {
    try {
      const response = await axios.get(`/api/searchPlayer`, {
        params: {
          gameName,
          tagLine,
          server
        }
      });

      const { playerInfo, matchHistory } = response.data;
      setPlayerInfo(playerInfo);
      setMatchHistory(matchHistory);
      setError(null);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      setError('Wystąpił błąd podczas pobierania danych. Spróbuj ponownie.');
    }
  };

  return (
    <div className="search-container">
      <h2>Search Player</h2>
      <PlayerSearch onSearch={searchPlayer} />
      {error && <p className="error-message">{error}</p>}
      {playerInfo && <PlayerInfo playerInfo={playerInfo} className="player-info" />}
      {matchHistory.length > 0 && <MatchHistory matchHistory={matchHistory} className="match-history" />}
    </div>
  );
};


export default Search;
