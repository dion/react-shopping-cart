import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrderAsync = createAsyncThunk(
   'order/createOrderAsync',
   async (payload) => {
      const response = await fetch('/api/orders', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload)
      });
      
      if (response.ok) {
         const order = await response.json();
         localStorage.clear('cartItems');
         return { order };
      }
   }
);

export const fetchOrdersAsync = createAsyncThunk(
   'order/fetchOrdersAsync',
   async () => {
      const response = await fetch('/api/orders');

      if (response.ok) {
         const orders = await response.json();
         
         return { orders };
      }
   }
); 

// export const clearOrder = () => (dispatch) => {
//    return { order: null};
//    dispatch({
//       type: CLEAR_ORDER
//    });
// };

const orderSlice = createSlice({
   name: 'order',
   initialState: [
      // {
      //    name: name,
      //    email: email,
      //    address: address,
      //    cartItems: cartItems,
      //    total: cartItems.reduce((a,c) => a + c.price * c.count, 0),
      // }
   ],
   reducers: {
      clearOrder: (state, action) => {
         return { order: null };
      }
   },
   extraReducers: {
      [fetchOrdersAsync.fulfilled]: (state, action) => {
         //return action.payload;
         return { orders: action.payload };
         // console.log('action.payload', action.payload);
         // return action.payload;
      },
      [createOrderAsync.fulfilled]: (state, action) => {
         return action.payload;
      },
   }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;