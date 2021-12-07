import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterProducts, sortProducts } from '../reducers/productSlice';

const Filter = () => {
   const filteredItems = useSelector((state) => state.products.filteredItems);
   const products = useSelector((state) => state.products.items);
   const sort = useSelector((state) => state.products.sort);
   const size = useSelector((state) => state.products.size);
   const dispatch = useDispatch();

   console.log('filteredItems', filteredItems);
   
   const sortProductsHandler = (value) => {
      // dispatch sortProducts
      dispatch(
         sortProducts(value)
      );
   };

   const filterProductsHandler = (value) => {
      // dispatch filterProducts
      dispatch(
         filterProducts(value)
      );
   };

   return !filteredItems ? (
      <div>Loading...</div>
   ) : (
      <div className="filter">
         <div className="filter-result">
            {filteredItems.length} Products
         </div>
         <div className="filter-sort">
            Order{' '}
            <select 
               value={sort} 
               onChange={(e) => sortProductsHandler(e.target.value)}
            >
               <option value="latest">Latest</option>
               <option value="lowest">Lowest</option>
               <option value="highest">Highest</option>
            </select>
         </div>
         <div className="filter-size">
            Filter{' '} 
            <select 
               value={size} 
               onChange={(e) => filterProductsHandler(e.target.value)}
            >
               <option value="">ALL</option>
               <option value="XS">XS</option>
               <option value="S">S</option>
               <option value="M">M</option>
               <option value="L">L</option>
               <option value="XL">XL</option>
               <option value="XXL">XXL</option>
            </select>
         </div>
      </div>
   );
};

export default Filter;
