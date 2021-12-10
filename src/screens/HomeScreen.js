import React from 'react';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import Products from '../components/Products';

// mui imports
import Grid from '@mui/material/Grid';

const Homescreen = () => {
   return (
      <Grid container spacing={1}>
         <Grid item xs={12} sm={8}>
            <Filter />
            <Products />
         </Grid>
         <Grid item xs={12} sm={4}>
            <Cart />
         </Grid>
      </Grid>
   );
}

export default Homescreen;
