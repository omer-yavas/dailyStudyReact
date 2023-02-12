import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../utils/constants';

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    loadingState: false,
    allPlayers: [],
    detail: [],
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
    fillPlayersArray(state, action) {
      state.allPlayers = [...action.payload];
      state.filteredPlayers = [...action.payload];
    },
    showDetailOfThisPlayer(state, action) {
      state.detail = action.payload;
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
          player.name.toLowerCase().includes(newFilterObject.searchValue)
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
      console.log(API_KEY);
      const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players',
        params: { league: '78', season: '2020' },
        headers: {
          'X-RapidAPI-Key': `${API_KEY}`,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.response);
          dispatch(playersActions.fillPlayersArray(response.data.response));
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    await sendRequest();

    dispatch(playersActions.setLoadingState());
  };
};

export const playersActions = playersSlice.actions;

export default playersSlice;
