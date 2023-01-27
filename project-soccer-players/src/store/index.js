import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './players-slice';

const store = configureStore({
  reducer: { players: playersSlice.reducer },
});

export default store;
