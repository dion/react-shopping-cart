import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

import { fetchProductsAsync } from '../reducers/productSlice';
import { addToCart } from '../reducers/cartActions';

const Products = () => {
   const products = useSelector((state) => state.products);
   const dispatch = useDispatch();

   const [product, setProduct] = useState(null);
   
   useEffect(() => {
      dispatch(
         fetchProductsAsync()
      );
   }, [dispatch]);

   const openModal = (product) => {
      setProduct({ product });
      //this.setState({ product });
   };

   const closeModal = () => {
      setProduct({ product: null });
      //this.setState({ product: null });
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
                           <a href={"#" + product._id} onClick={() => openModal(product)}>
                              <img src={product.image} alt={product.title} />
                              <p>
                                 {product.title}
                              </p>
                           </a>
                           <div className="product-price">
                              <div>
                                 {formatCurrency(product.price)}
                              </div>
                              <button onClick={() => this.props.addToCart(product)} className="button primary">
                                 Add To Cart
                              </button>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>)
            }
         </Fade>
         {
            product && (
               <Modal 
                  isOpen={true}
                  onRequestClose={closeModal}
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
                                 this.props.addToCart(product);
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
// export default connect((state) => ({ products: state.products.filteredItems }), {
//    fetchProducts,
//    addToCart
// })(Products);
