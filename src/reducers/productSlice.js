import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProductsAsync = createAsyncThunk(
   'products/fetchProductsAsync',
   async () => {
      const response = await fetch('/api/products');

      if (response.ok) {
         const products = await response.json();

         return { products };
      }
   }
);

const productSlice = createSlice({
   name: 'products',
   initialState: [
      // {
      //    _id: "dress1",
      //    image: "/images/dress1.jpg",
      //    title: "Midi sundress with shirring detail",
      //    description: "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
      //    availableSizes: ["X", "L", "XL", "XXL"],
      //    price: 29.9
      // }
   ],
   reducers: {
      filterProducts: (state, action) => {
         // payload: {
         //    size: size,
         //    items: size === '' ? products : products.filter(x => x.availableSizes.indexOf(size) >= 0),
         // }
         if (action.payload.size === '') {
            return state;
         } else {
            return state.filter(
               x => x.availableSizes.indexOf(action.payload.size) >= 0
            );
         }
      },
      sortProducts: (state, action) => {
         // const sortedProducts = filteredProducts.slice();

         // if (sort === 'latest') {
         //    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
         // } else {
         //    sortedProducts.sort((a, b) => (
         //       sort === 'lowest' ? 
         //       a.price > b.price ? 1 : -1
         //       :
         //       a.price > b.price ? -1 : 1
         //    ));
         // }
         // dispatch({
         //    type: ORDER_PRODUCTS_BY_PRICE,
         //    payload: {
         //       sort: sort,
         //       items: sortedProducts
         //    }
         // });
         
         return state;
      }
   },
   extraReducers: {
      [fetchProductsAsync.fulfilled]: (state, action) => {
         console.log('action.payload', action);
         return action.payload.products;
      }
   }
});

export const { filterProducts, sortProducts } = productSlice.actions;

export default productSlice.reducer;

// export const filterProducts = (products, size) => (dispatch) => {
//    dispatch({
//       type: FILTER_PRODUCTS_BY_SIZE,
//       payload: {
//          size: size,
//          items: size === '' ? products : products.filter(x => x.availableSizes.indexOf(size) >= 0),
//       }
//    });
// };

// export const sortProducts = (filteredProducts, sort) => (dispatch) => {
//    const sortedProducts = filteredProducts.slice();

//    if (sort === 'latest') {
//       sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
//    } else {
//       sortedProducts.sort((a, b) => (
//          sort === 'lowest' ? 
//          a.price > b.price ? 1 : -1
//          :
//          a.price > b.price ? -1 : 1
//       ));
//    }
//    dispatch({
//       type: ORDER_PRODUCTS_BY_PRICE,
//       payload: {
//          sort: sort,
//          items: sortedProducts
//       }
//    });
// };

