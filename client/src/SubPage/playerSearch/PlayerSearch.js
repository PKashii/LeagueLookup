import React, { useState } from 'react';
import './styles.css'; 



const PlayerSearch = ({ onSearch }) => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [server, setServer] = useState('europe');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(gameName, tagLine, server);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tag"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          required
        />
        <select value={server} onChange={(e) => setServer(e.target.value)}>
          <option value="kr">Korea</option>
          <option value="na">NA</option>
          <option value="eun1">Europe East</option>
          <option value="euw1">Europe West</option>
          <option value="br">Brazil</option>
          {}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default PlayerSearch;
