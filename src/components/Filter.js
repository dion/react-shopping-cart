import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterProducts, sortProducts } from '../reducers/productSlice';

// MUI imports
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const Filter = () => {
   const filteredItems = useSelector((state) => state.products.filteredItems);
   const sort = useSelector((state) => state.products.sort);
   const size = useSelector((state) => state.products.size);
   const dispatch = useDispatch();
   
   const sortProductsHandler = (event) => {
      // dispatch sortProducts
      dispatch(
         sortProducts(event.target.value)
      );
   };

   const filterProductsHandler = (event) => {
      // dispatch filterProducts
      dispatch(
         filterProducts(event.target.value)
      );
   };

   return !filteredItems ? (
      <div>Loading...</div>
   ) : (
      <Grid container sx={{ 
         display: 'flex', 
         alignItems: 'center',
         padding: '1rem', 
         xmargin: '1rem',
         paddingRight: '5.5rem'
      }}>
         <Grid item xs={8}>
            <Typography sx={{ minWidth: 100 }} variant="subtitle1">{filteredItems.length} Products</Typography>
         </Grid>

         <Grid 
            item 
            xs={4}
            container
            xdirection="row"
            justifyContent="space-between"
         >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
               <InputLabel id="demo-simple-select-label">Order</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort} 
                  onChange={sortProductsHandler}
                  label="Order"
               >
                  <MenuItem value={'latest'}>Latest</MenuItem>
                  <MenuItem value={'lowest'}>Lowest</MenuItem>
                  <MenuItem value={'highest'}>Highest</MenuItem>
               </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
               <InputLabel id="demo-simple-select-label">Filter</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size} 
                  onChange={filterProductsHandler}
                  label="Filter"
               >
                  <MenuItem value={''}>ALL</MenuItem>
                  <MenuItem value={'XS'}>XS</MenuItem>
                  <MenuItem value={'S'}>S</MenuItem>
                  <MenuItem value={'M'}>M</MenuItem>
                  <MenuItem value={'L'}>L</MenuItem>
                  <MenuItem value={'XL'}>XL</MenuItem>
                  <MenuItem value={'XXL'}>XXL</MenuItem>
               </Select>
            </FormControl>
         </Grid>
      </Grid>
   );
};

export default Filter;
