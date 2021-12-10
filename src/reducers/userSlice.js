import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: 'user',
   initialState: {
      loggedInStatus: false,
      userName: '',
      errors: []
   },
   reducers: {
      processLogin: (state, action) => {
         state.errors = [];

         if (action.payload.userName == 'demo' && action.payload.password == 'test') {
            state.loggedInStatus(true);
            state.userName = action.payload.userName;
         } else {
            state.errors.push('Login is incorrect, check your credentials and try again.');
         }

         return state;
      }
   }
});

export const { processLogin } = userSlice.actions;
export default userSlice.reducer;