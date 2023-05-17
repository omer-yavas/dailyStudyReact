import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/user/UserSlice";
import GeneralSlice from "./features/user/GeneralSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    general: GeneralSlice,
  },
});

// const initialState = {
//   sidebarShow: true,
// };

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case "set":
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };

// const store = createStore(changeState);
export default store;
