import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sectionTableList: [
    { sectionName: 'Salon', numberOfTables: 10 },
    { sectionName: 'Bahçe', numberOfTables: 7 },
  ],
};

const SectionTableSlice = createSlice({
  name: 'sectionTable',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.sectionTableList.push(action.payload);
    },
    deleteListItem: (state, action) => {
      const newlist = [...state.sectionTableList];
      newlist.splice(action.payload, 1);
      state.sectionTableList = newlist;
    },
  },
});

export const { addList, deleteListItem } = SectionTableSlice.actions;
export default SectionTableSlice.reducer;
