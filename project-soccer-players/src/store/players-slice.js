import axios, { all } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { dummyPlayers } from '../utils/dummyPlayerApi';

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    loadingState: false,
    allPlayers: [],
    filteredPlayers: [],
    favouritePlayerIDs: [],
    modalShow: false,
    filterConfig: {
      searchValue: '',
      position: 'All',
      nationality: 'All',
      ratingMin: '',
      ratingMax: '',
      ageMin: '',
      ageMax: '',
      heightMin: '',
      heightMax: '',
      weightMin: '',
      weightMax: '',
      injuredCheck: false,
    },
  },
  reducers: {
    modalOpen(state) {
      state.modalShow = true;
    },
    modalClose(state) {
      state.modalShow = false;
    },
    clearFavourites(state) {
      state.favouritePlayerIDs = [];
    },
    setLoadingState(state) {
      state.loadingState = !state.loadingState;
    },
    fillPlayersArray(state) {
      state.allPlayers = [...dummyPlayers];
      state.filteredPlayers = [...dummyPlayers];
    },

    favouriteSelected(state, action) {
      const newSelect = { ...action.payload };

      if (state.favouritePlayerIDs.includes(newSelect.id)) {
        state.favouritePlayerIDs = state.favouritePlayerIDs.filter(
          (item) => item !== newSelect.id
        );
      } else {
        state.favouritePlayerIDs.push(newSelect.id);
      }
    },

    filterSelected(state, action) {
      const newFilterObject = { ...state.filterConfig, ...action.payload };

      let filteredValue = [...state.allPlayers];

      if (newFilterObject.searchValue !== '') {
        filteredValue = filteredValue.filter(({ player }) =>
          player.name.includes(newFilterObject.searchValue)
        );
      }

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
      if (newFilterObject.ratingMin !== '' && newFilterObject.ratingMin >= 0) {
        filteredValue = filteredValue.filter(({ statistics }) =>
          statistics[0].games.rating !== null
            ? Number(statistics[0].games.rating) >= newFilterObject.ratingMin
            : false
        );
      }

      if (newFilterObject.ratingMax !== '' && newFilterObject.ratingMax > 0) {
        filteredValue = filteredValue.filter(({ statistics }) =>
          statistics[0].games.rating !== null
            ? Number(statistics[0].games.rating) <= newFilterObject.ratingMax
            : false
        );
      }
      if (newFilterObject.ageMin !== '' && newFilterObject.ageMin >= 0) {
        filteredValue = filteredValue.filter(
          ({ player }) => player.age >= newFilterObject.ageMin
        );
      }

      if (newFilterObject.ageMax !== '' && newFilterObject.ageMax > 0) {
        filteredValue = filteredValue.filter(
          ({ player }) => player.age <= newFilterObject.ageMax
        );
      }
      if (newFilterObject.heightMin !== '' && newFilterObject.heightMin >= 0) {
        filteredValue = filteredValue.filter(
          ({ player }) =>
            player.height !== null &&
            Number(player.height.replace(/\D/g, '')) >=
              newFilterObject.heightMin
        );
      }

      if (newFilterObject.heightMax !== '' && newFilterObject.heightMax > 0) {
        filteredValue = filteredValue.filter(
          ({ player }) =>
            player.height !== null &&
            Number(player.height.replace(/\D/g, '')) <=
              newFilterObject.heightMax
        );
      }

      if (newFilterObject.weightMin !== '' && newFilterObject.weightMin >= 0) {
        filteredValue = filteredValue.filter(
          ({ player }) =>
            player.weight !== null &&
            Number(player.weight.replace(/\D/g, '')) >=
              newFilterObject.weightMin
        );
      }

      if (newFilterObject.weightMax !== '' && newFilterObject.weightMax > 0) {
        filteredValue = filteredValue.filter(
          ({ player }) =>
            player.weight !== null &&
            Number(player.weight.replace(/\D/g, '')) <=
              newFilterObject.weightMax
        );
      }

      if (newFilterObject.injuredCheck === true) {
        filteredValue = filteredValue.filter(
          ({ player }) => player.injured === false
        );
      }

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
