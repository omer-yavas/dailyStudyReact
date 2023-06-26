import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/user/UserSlice";
import GeneralSlice from "./features/user/GeneralSlice";
import { RestaurantLayoutApi } from "./features/RestaurantLayoutApi";
import { ItemApi } from "./features/ItemApi";
import { MenuApi } from "./features/MenuApi";
import { FileApi } from "./features/FileApi";
import { ReceiptApi } from "./features/ReceiptApi";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    general: GeneralSlice,
    [RestaurantLayoutApi.reducerPath]: RestaurantLayoutApi.reducer,
    [ItemApi.reducerPath]: ItemApi.reducer,
    [MenuApi.reducerPath]: MenuApi.reducer,
    [FileApi.reducerPath]: FileApi.reducer,
    [ReceiptApi.reducerPath]: ReceiptApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(RestaurantLayoutApi.middleware)
      .concat(ItemApi.middleware)
      .concat(MenuApi.middleware)
      .concat(FileApi.middleware)
      .concat(ReceiptApi.middleware),
});

export default store;
