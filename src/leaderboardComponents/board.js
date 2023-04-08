import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profiles from './profiles';

export default function Board() {
  
  const [Leaderboard, setLeaderboard] = useState([]);

useEffect(() => {
  loadLeaderboard();
}, []);

const loadLeaderboard = async () => {
  const result = await axios.get("http://localhost:8080/Leaderboard");
  setLeaderboard(result.data);
};


  console.log(Leaderboard);


  const sortedLeaderboard = Leaderboard.sort((a, b) => b.score - a.score);
  
  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>
        <Profiles   Leaderboard={sortedLeaderboard}></Profiles>
    </div>
  )
}
