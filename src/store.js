import { configureStore } from '@reduxjs/toolkit';

import productsReducer from "./reducers/productSlice";
// import { cartReducer } from "./__reducers/cartReducers";
// import { orderReducer } from "./__reducers/orderReducers";

export const store = configureStore({
   reducer: {
      products: productsReducer,
      // cart: cartReducer,
      // order: orderReducer
   },
});