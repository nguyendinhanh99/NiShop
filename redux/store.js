// store.js
import { configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user';
import cartReducer from "./slices/cart";


const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
