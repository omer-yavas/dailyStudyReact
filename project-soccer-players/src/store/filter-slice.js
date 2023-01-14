import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    players: [],
    loadingState: false,
    injuryStatus: false,
    textPlayerSearch: '',
    chosenCategory: 'all',
  },
  reducers: {
    minAgeSelected() {},
    maxAgeSelected() {},
    injuredToggle() {},
    clearFilters() {},
    searchByText() {},

    nationalitySelected() {},
    heightMinSelected() {},
    heightMaxSelected() {},
    weightMinSelected() {},
    weightMaxSelected() {},
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
