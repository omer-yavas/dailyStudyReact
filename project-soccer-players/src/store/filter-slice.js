import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    players: [],
    loadingState: false,
    categories: [],
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
    categorySelected() {},
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
