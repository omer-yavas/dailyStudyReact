import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './players-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: { players: playersSlice.reducer, auth: authSlice.reducer },
});

export default store;
