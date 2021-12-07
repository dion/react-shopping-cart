import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

import { fetchProductsAsync } from '../reducers/productSlice';
import { addToCart } from '../reducers/cartSlice';

const Products = () => {
   const products = useSelector((state) => state.products.filteredItems);
   const dispatch = useDispatch();
   const [product, setProduct] = useState(null);
   
   useEffect(() => {
      dispatch(
         fetchProductsAsync()
      );
   }, [dispatch]);

   const openModal = (id) => {
      const result = products.find((product) => product._id === id);
      
      if (result) {
         setProduct(result);
      } else {
         setProduct(null);
      }
   };

   const closeModal = () => {
      setProduct(null);
   };

   const addToCartHandler = (product) => {
      dispatch(
         addToCart(product)
      );
   };

   return (
      <div>
         <Fade bottom cascade>
            {
               !products ? (<div>Loading...</div>) :
               (<ul className="products">
                  {products.map(product => (
                     <li key={product._id}>
                        <div className="product">
                           <a href={"#" + product._id} onClick={() => openModal(product._id)}>
                              <img src={product.image} alt={product.title} />
                              <p>
                                 {product.title}
                              </p>
                           </a>
                           <div className="product-price">
                              <div>
                                 {formatCurrency(product.price)}
                              </div>
                              <button onClick={() => addToCartHandler(product)} className="button primary">
                                 Add To Cart
                              </button>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>)
            }
         </Fade>
         {/* change product to useSelector */}
         {
            product && (
               <Modal 
                  isOpen={true}
                  onRequestClose={closeModal}
                  ariaHideApp={false}
               >
                  <Zoom>
                     <button className="close-modal" onClick={closeModal}>
                        x
                     </button>
                     <div className="product-details">
                        <img src={product.image} alt={product.title} />
                        <div className="product-details-description">
                           <p>
                              <strong>{product.title}</strong>
                           </p>
                           <p>
                              {product.description}
                           </p>
                           <p>
                              Available Sizes: {' '}
                              {/* {product.availableSizes.map(x => (
                                 <span> 
                                    {' '}
                                    <button className="button">{x}</button>
                                 </span>
                              ))} */}
                           </p>
                           <div className="product-price">
                              <div>{formatCurrency(product.price)}</div>
                              <button className="button primary" onClick={() => {
                                 addToCartHandler(product);
                                 closeModal();
                              }}>
                                 Add To Cart
                              </button>
                           </div>
                        </div>
                     </div>
                  </Zoom>
               </Modal>
            )
         }
      </div>
   );
}

export default Products;
