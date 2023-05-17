import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
};

const GeneralSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeState: (state, action) => {
      console.log("state changed");
      const { type, sidebarShow } = action.payload;
      switch (type) {
        case "set":
          return { ...state, sidebarShow: sidebarShow };
        default:
          return state;
      }
    },
    changeUnfoldable: (state, action) => {
      console.log("unfoldable changed");
      const { sidebarUnfoldable } = action.payload;
      return { ...state, sidebarUnfoldable: sidebarUnfoldable };
    },
  },
});

export const { changeState, changeUnfoldable } = GeneralSlice.actions;
export default GeneralSlice.reducer;
