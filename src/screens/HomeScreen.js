import React from 'react';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import Products from '../components/Products';

import PromoBanner from '../assets/promo-banner.jpg';

// mui imports
import Grid from '@mui/material/Grid';

const Homescreen = () => {
   return (
      <Grid container spacing={1}>
         <Grid item xs={12} sm={12} sx={{ marginTop: '1rem', padding: '0 5px' }}>
            <Grid item sx={{ padding: '1rem' }}>
            <img src={PromoBanner} alt="save on delivery today!" style={{ width: '100%' }} />
            </Grid>
         </Grid>
         <Grid item xs={12} sm={9}>
            <Filter />
            <Products />
         </Grid>
         <Grid item xs={12} sm={3}>
            <Cart />
         </Grid>
      </Grid>
   );
}

export default Homescreen;
