import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: { userLoggedIn: false },
  reducers: {
    changeLoggedInState(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice;
