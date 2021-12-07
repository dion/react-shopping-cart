import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createOrderAsync = createAsyncThunk(
   'order/createOrderAsync',
   async (payload) => {
      fetch('/api/orders', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload.order)
      }).then(res => res.json())
      .then(data => {
         const order = data.json();
         // dispatch({
         //    type: CREATE_ORDER,
         //    payload: data
         // });
         localStorage.clear('cartItems');
         return { order };
         // dispatch({
         //    type: CLEAR_CART
         // });
      });
   }
);

export const fetchOrdersAsync = createAsyncThunk(
   'order/fetchOrdersAsync',
   async () => {
      fetch('/api/orders').then((res) => res.json())
      .then(data => {
         const orders = data.json();
         console.log("orders", orders);
         return { orders };
         // dispatch({ 
         //    type: FETCH_ORDERS, 
         //    payload: data
         // });
      })
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
         return action.payload.orders;
      }
   }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;