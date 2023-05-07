import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuItemList: [
    {
      id: 1,
      name: 'Kuru Fasulye',
      price: 50,
      category: 'Ana Yemek',
      photo: null,
      options: 'çalı-horoz',
    },
  ],
  categories: ['Çorbalar', 'Ana Yemek', 'Tatlılar'],
};

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action) => {
      state.menuItemList.push(action.payload);
    },
    deleteMenuItem: (state, action) => {
      const newlist = [...state.menuItemList];
      newlist.splice(action.payload, 1);
      state.menuItemList = newlist;
    },
    updateMenuItem: (state, action) => {
      const { index, body } = { ...action.payload };
      state.menuItemList[index] = { ...body };
    },

    addCategoryItem: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategoryItem: (state, action) => {
      const newlist = [...state.categories];
      newlist.splice(action.payload, 1);
      state.categories = newlist;
    },
    updateCategoryItem: (state, action) => {
      const { index, categoryName } = action.payload;
      state.categories[index] = categoryName;
    },
  },
});

export const {
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  addCategoryItem,
  deleteCategoryItem,
  updateCategoryItem,
} = MenuSlice.actions;
export default MenuSlice.reducer;
