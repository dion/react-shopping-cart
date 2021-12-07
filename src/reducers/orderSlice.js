import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = (order) => (dispatch) => {
   fetch('/api/orders', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
   }).then(res => res.json())
   .then(data => {
      dispatch({
         type: CREATE_ORDER,
         payload: data
      });
      localStorage.clear('cartItems');
      // dispatch({
      //    type: CLEAR_CART
      // });
   });
};

export const fetchOrders = () => (dispatch) => {
   fetch('/api/orders').then((res) => res.json())
      .then(data => {
         // dispatch({ 
         //    type: FETCH_ORDERS, 
         //    payload: data
         // });
      })
};

// export const clearOrder = () => (dispatch) => {
//    return { order: null};
//    dispatch({
//       type: CLEAR_ORDER
//    });
// };

const orderSlice = createSlice({
   name: 'order',
   initialState: [

   ],
   reducers: {
      clearOrder: (state, action) => {
         return { order: null };
      }
   },
   extraReducers: {

   }
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;