import { createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
  name: 'players',
  initialState: { players: [] },
  reducers: {},
});

export const getAllPlayers = () => {
  return async () => {
    const sendRequest = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '62ec314e02msha83008fa1cbc55ep1d9675jsn3246344f664a',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      const response = await fetch(
        'https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=2020',
        options
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    };

    await sendRequest();
  };
};

export const playersActions = playersSlice.actions;

export default playersSlice;
