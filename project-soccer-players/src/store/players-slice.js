import axios, { all } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { dummyPlayers } from '../utils/dummyPlayerApi';

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    allPlayers: [],
    filteredPlayers: [],
    filterConfig: {
      position: 'All',
      nationality: 'All',
      ageMin: 0,
      ageMax: 100,
      heightMin: 100,
      heightMax: 250,
      weightMin: 0,
      weightMax: 200,
      injured: 'all',
    },

    loadingState: false,
  },
  reducers: {
    setLoadingState(state) {
      state.loadingState = !state.loadingState;
    },
    fillPlayersArray(state) {
      state.allPlayers = [...dummyPlayers];
      state.filteredPlayers = [...dummyPlayers];
    },

    filterSelected(state, action) {
      let first = state.filterConfig.position;
      let second = state.filterConfig.nationality;
      let third = state.filterConfig.ageMin;
      let forth = state.filterConfig.ageMax;
      let fifth = state.filterConfig.heightMin;
      let sixth = state.filterConfig.heightMax;
      if (action.payload[0] === 1) {
        state.filterConfig.position = action.payload[1];
        first = action.payload[1];
      } else if (action.payload[0] === 2) {
        state.filterConfig.nationality = action.payload[1];
        second = action.payload[1];
      } else if (action.payload[0] === 3) {
        state.filterConfig.ageMin = action.payload[1];
        third = action.payload[1];
      } else if (action.payload[0] === 4) {
        state.filterConfig.ageMax = action.payload[1];
        forth = action.payload[1];
      } else if (action.payload[0] === 5) {
        state.filterConfig.heightMin = action.payload[1];
        fifth = action.payload[1];
      } else if (action.payload[0] === 6) {
        state.filterConfig.heightMax = action.payload[1];
        sixth = action.payload[1];
      }

      state.filteredPlayers = state.allPlayers.filter(
        (arg) =>
          (first === 'All'
            ? arg
            : arg.statistics[0].games.position === first) &&
          (second === 'All' ? arg : arg.player.nationality === second) &&
          (third === 'Min' ? arg : arg.player.age >= third) &&
          (forth === 'Max' ? arg : arg.player.age <= forth) &&
          (fifth === 'Min' ? arg : arg.player.height >= fifth) &&
          (sixth === 'Max' ? arg : arg.player.height <= sixth)
      );
    },
  },
});

export const getAllPlayers = () => {
  return async (dispatch) => {
    dispatch(
      playersActions.setLoadingState({
        loadingState: true,
      })
    );

    const sendRequest = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '62ec314e02msha83008fa1cbc55ep1d9675jsn3246344f664a',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    //await sendRequest();
    dispatch(playersActions.fillPlayersArray());
    dispatch(playersActions.setLoadingState());
  };
};

export const playersActions = playersSlice.actions;

export default playersSlice;
