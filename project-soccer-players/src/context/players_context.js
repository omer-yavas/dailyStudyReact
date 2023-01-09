import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

const PlayersContext = React.createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [chosenTeamID, setChosenTeamID] = useState(null);

  const setTeamID = (x) => {
    setChosenTeamID(x);
  };

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players',
    params: { team: `${chosenTeamID}`, season: '2022' },
    headers: {
      'X-RapidAPI-Key': '62ec314e02msha83008fa1cbc55ep1d9675jsn3246344f664a',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  const fetchPlayers = async () => {
    const { data } = await Axios.request(options);
    const teamPlayers = data.response;
    console.log(teamPlayers);
    setPlayers(teamPlayers);
  };

  useEffect(() => {
    if (chosenTeamID !== null) {
      fetchPlayers();
    }
  }, [chosenTeamID]);

  return (
    <PlayersContext.Provider value={{ players,setTeamID }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayersContext = () => {
  return useContext(PlayersContext);
};
