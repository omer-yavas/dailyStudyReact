import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './players-slice';
import filterSlice from './filter-slice';

const store = configureStore({
  reducer: { players: playersSlice.reducer, filter: filterSlice.reducer },
});

export default store;
