import axios, { all } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { dummyPlayers } from '../utils/dummyPlayerApi';

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    loadingState: false,
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
      const newFilterObject = { ...state.filterConfig, ...action.payload };

      let filteredValue = [...state.allPlayers];

      if (newFilterObject.position !== 'All') {
        filteredValue = filteredValue.filter(
          ({ statistics }) =>
            statistics[0].games.position === newFilterObject.position
        );
      }
      if (newFilterObject.nationality !== 'All') {
        filteredValue = filteredValue.filter(
          ({ player }) => player.nationality === newFilterObject.nationality
        );
      }

      if (newFilterObject.ageMin !== 'Min') {
        filteredValue = filteredValue.filter(
          ({ player }) => player.age >= newFilterObject.ageMin
        );
      }

      if (newFilterObject.ageMax !== 'Max') {
        filteredValue = filteredValue.filter(
          ({ player }) => player.age <= newFilterObject.ageMax
        );
      }
      // filteredValue = filteredValue.filter(
      //   ({ player }) =>
      //     player.height.match(/(\d+)/) >= newFilterObject.heightMin &&
      //     player.height.match(/(\d+)/) <= newFilterObject.heightMax
      // );

      state.filteredPlayers = filteredValue;
      state.filterConfig = newFilterObject;
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
