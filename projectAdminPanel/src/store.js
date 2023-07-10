import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/user/UserSlice";
import GeneralSlice from "./features/user/GeneralSlice";
import ReceiptSlice from "./features/user/ReceiptSlice";
import { RestaurantLayoutApi } from "./features/RestaurantLayoutApi";
import { ItemApi } from "./features/ItemApi";
import { MenuApi } from "./features/MenuApi";
import { FileApi } from "./features/FileApi";
import { ReceiptApi } from "./features/ReceiptApi";
import { UserApi } from "./features/UserApi";
import { OrderApi } from "./features/OrderApi";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    general: GeneralSlice,
    receipt: ReceiptSlice,
    [RestaurantLayoutApi.reducerPath]: RestaurantLayoutApi.reducer,
    [ItemApi.reducerPath]: ItemApi.reducer,
    [MenuApi.reducerPath]: MenuApi.reducer,
    [FileApi.reducerPath]: FileApi.reducer,
    [ReceiptApi.reducerPath]: ReceiptApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(RestaurantLayoutApi.middleware)
      .concat(ItemApi.middleware)
      .concat(MenuApi.middleware)
      .concat(FileApi.middleware)
      .concat(ReceiptApi.middleware)
      .concat(UserApi.middleware)
      .concat(OrderApi.middleware),
});

export default store;
