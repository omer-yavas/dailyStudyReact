import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/UserSlice';
import SectionTableSlice from './features/SectionTable/SectionTableSlice';
import PersonelSlice from './features/personel/PersonelSlice';
import MenuSlice from './features/menu/MenuSlice';
import OrdersSlice from './features/orders/OrdersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { menuApi } from './features/BaseURL';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    sectionTable: SectionTableSlice,
    personel: PersonelSlice,
    menu: MenuSlice,
    orders: OrdersSlice,
    // Add the generated reducer as a specific top-level slice
    [menuApi.reducerPath]: menuApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
