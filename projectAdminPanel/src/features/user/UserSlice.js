import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //user: null,
  userList: [{ username: 'a', password: 'b', role: 'admin' }],
  authenticated: null,
  validUserName: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList.push(action.payload);
    },
    deleteUser: (state, action) => {
      const newlist = [...state.userList];
      newlist.splice(action.payload, 1);
      state.userList = newlist;
    },
    updateUser: (state, action) => {
      const { index, body } = { ...action.payload };
      state.userList[index] = { ...body };
    },
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

export const {
  addUser,
  deleteUser,
  updateUser,
  checkLoginIsValid,
  logoutUser,
} = UserSlice.actions;
export default UserSlice.reducer;
