import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCartAsync = createAsyncThunk(
   'cart/addToCartAsync', 
   async (payload) => {
      const cartItems = payload;
      let alreadyExists = false;

      cartItems.forEach(x => {
         if (x._id === payload.product._id) {
            alreadyExists = true;
            x.count++;
         }
      });

      if (!alreadyExists) {
         cartItems.push({
            ...payload.product,
            count: 1
         });
         // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
   }
);

// export const removeFromCart = (product) => (dispatch, getState) => {
//    const cartItems = getState()
//      .cart.cartItems.slice()
//      .filter((x) => x._id !== product._id);
//    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
//    localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };

const cartSlice = createSlice({
   name: 'cart',
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
         const cartItems = state.slice(); //getState().cart.cartItems.slice();
         let alreadyExists = false;
   
         cartItems.forEach(x => {
            if (x._id === action.payload.product._id) {
               alreadyExists = true;
               x.count++;
            }
         });
   
         if (!alreadyExists) {
            cartItems.push({
               ...action.payload.product,
               count: 1
            });
            // localStorage.setItem('cartItems', JSON.stringify(cartItems));
         }
      },
      removeFromCart: (state, action) => {
         // const cartItems = getState()
         //    .cart.cartItems.slice()
         //    .filter((x) => x._id !== product._id);

         // localStorage.setItem("cartItems", JSON.stringify(cartItems));
         return state;
      }
   },
   extraReducers: {
      [addToCartAsync.fulfilled]: (state, action) => {
         // do something
         //return 
      }
   }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;