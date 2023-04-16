import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personelList: ['Ricardo Quaresma', 'Cristiano Ronaldo'],
};

const PersonelSlice = createSlice({
  name: 'personel',
  initialState,
  reducers: {
    addPersonel: (state, action) => {
      state.personelList.push(action.payload);
    },
    deletePersonel: (state, action) => {
      const newlist = [...state.personelList];
      newlist.splice(action.payload, 1);
      state.personelList = newlist;
    },
  },
});

export const { addPersonel, deletePersonel } = PersonelSlice.actions;
export default PersonelSlice.reducer;
