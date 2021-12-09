import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterProducts, sortProducts } from '../reducers/productSlice';

// MUI imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
      <div>
         <Box sx={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            textAlign: 'center', padding: '1rem', margin: '1rem' }}>
            <Typography sx={{ minWidth: 100 }} variant="h5">{filteredItems.length} Products</Typography>
            <FormControl xfullWidth sx={{ m: 1, minWidth: 80 }}>
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

            <FormControl sx={{ m: 1, minWidth: 80 }}>
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
         </Box>
      </div>
   );
};

export default Filter;
