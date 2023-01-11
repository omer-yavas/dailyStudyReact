import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    players: [],
    loadingState: false,
    categories: ['GoalKeeper', 'Defender', 'MiddlePlayer', 'Attack'],
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
    nationalitySelected() {},
    heightMinSelected() {},
    heightMaxSelected() {},
    weightMinSelected() {},
    weightMaxSelected() {},
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
