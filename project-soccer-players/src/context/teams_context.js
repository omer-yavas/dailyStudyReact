import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
const TeamsContext = React.createContext();

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams?league=78&season=2022',
    headers: {
      'X-RapidAPI-Key': '62ec314e02msha83008fa1cbc55ep1d9675jsn3246344f664a',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  const fetchTeams = async () => {
    const { data } = await Axios.request(options);
    const products = data.response;
    setTeams(products);
    console.log(products);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamsContext.Provider value={[...teams]}>{children}</TeamsContext.Provider>
  );
};

export const useTeamsContext = () => {
  return useContext(TeamsContext);
};
