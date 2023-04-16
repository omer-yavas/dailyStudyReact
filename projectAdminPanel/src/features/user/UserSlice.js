import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //user: null,
  userList: [{ username: 'a', password: 'b' }],
  authenticated: null,
  validUserName: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.authenticated = null;
      state.validUserName = null;
    },
    checkLoginIsValid: (state, action) => {
      const { username, password } = { ...action.payload };
      state.validUserName = username;
      if (username === state.userList[0].username) {
        state.authenticated = true;
        state.validUserName = username;
      } else if (username !== state.userList[0].username) {
        state.authenticated = false;
      }
    },
  },
});

export const { checkLoginIsValid, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
