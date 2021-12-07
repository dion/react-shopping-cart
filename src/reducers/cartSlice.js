import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: 'cartItems',
   initialState: [
      // {
      //    _id: "dress1",
      //    image: "/images/dress1.jpg",
      //    title: "Midi sundress with shirring detail",
      //    description: "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
      //    availableSizes: ["X", "L", "XL", "XXL"],
      //    price: 29.9,
      //    count: 1
      // }
   ],
   reducers: {
      addToCart: (state, action) => {
         const index = state.findIndex(
            (item) => item._id === action.payload._id
         );

         if (index > -1) {
            state[index].count = state[index].count++;
         } else {
            state.push({
               ...action.payload,
               count: 1
            });
            localStorage.setItem('cartItems', JSON.stringify(state));
         }
      },
      removeFromCart: (state, action) => {
         return state.filter((x) => x._id !== action.payload._id);
         // localStorage.setItem("cartItems", JSON.stringify(state));
         // return state;
      }
   },
   extraReducers: {}
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;