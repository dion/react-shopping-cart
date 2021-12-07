import { configureStore } from '@reduxjs/toolkit';

import productsReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";
import orderReducer from "./reducers/orderSlice";

export const store = configureStore({
   reducer: {
      products: productsReducer,
      cartItems: cartReducer,
      //order: orderReducer,
   },
});