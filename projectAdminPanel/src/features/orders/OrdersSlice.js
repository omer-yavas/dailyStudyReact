import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderList: [
    {
      orderID: 555,
      tableID: 'Salon5',
      customerID: 1223,
      list: ['Kuru Fasulye'],
    },
    {
      orderID: 333,
      tableID: 'Bahçe3',
      customerID: 1225,
      list: ['Kuru Fasulye'],
    },
  ],
};

const OrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      const newlist = [...state.orderList];
      newlist.splice(action.payload, 1);
      state.orderList = newlist;
    },
  },
});

export const { deleteOrder } = OrdersSlice.actions;
export default OrdersSlice.reducer;
