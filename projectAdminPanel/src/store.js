import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/UserSlice';
import SectionTableSlice from './features/SectionTable/SectionTableSlice';
import PersonelSlice from './features/personel/PersonelSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    sectionTable: SectionTableSlice,
    personel: PersonelSlice,
  },
});
