import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  masterReceipt: null,
  masterReceiptOwner: null,
  masterReceiptTable: null,
  standAlonePaymentGroups: [],
  groupPaymentGroups: [],
};

const ReceiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    changeMasterReceipt: (state, action) => {
      state.masterReceipt = action.payload;
    },
    changeMasterReceiptOwner: (state, action) => {
      state.masterReceiptOwner = action.payload;
    },
    changeMasterReceiptTable: (state, action) => {
      state.masterReceiptTable = action.payload;
    },
    uploadToStandAlonePaymentGroups: (state, action) => {
      state.standAlonePaymentGroups.push(action.payload);
    },
  },
});

export const {
  changeMasterReceipt,
  changeMasterReceiptOwner,
  changeMasterReceiptTable,
  uploadToStandAlonePaymentGroups,
} = ReceiptSlice.actions;
export default ReceiptSlice.reducer;
