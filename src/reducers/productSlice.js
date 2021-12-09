import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
   initialState: {
      items: [
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
      filteredItems: [],
      sort: '',
      size: '',
   },
   reducers: {
      filterProducts: (state, action) => {
         state.size = action.payload;

         if (action.payload === '') {
            state.filteredItems = state.items;
         } else {
            const result = state.items.filter(
               x => x.availableSizes.indexOf(action.payload) >= 0
            );

            state.filteredItems = result;
         }
         
         return state;
      },
      sortProducts: (state, action) => {
         state.sort = action.payload;
         const sortedProducts = state.filteredItems;

         if (action.payload === 'latest') {
            sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
         } else {
            sortedProducts.sort((a, b) => (
               action.payload === 'lowest' ? 
               a.price > b.price ? 1 : -1
               :
               a.price > b.price ? -1 : 1
            ));
         }
         
         return state;
      }
   },
   extraReducers: {
      [fetchProductsAsync.fulfilled]: (state, action) => {
         state.items = action.payload.products;
         state.filteredItems = action.payload.products;
      }
   }
});

export const { filterProducts, sortProducts } = productSlice.actions;

export default productSlice.reducer;
