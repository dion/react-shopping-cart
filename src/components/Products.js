import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

import { fetchProductsAsync } from '../reducers/productSlice';
import { addToCart } from '../reducers/cartSlice';

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';

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
                        <Card 
                           variant="outlined"
                           sx={{ xmaxWidth: 345 }}
                        >
                           <CardActionArea>
                           <CardMedia
                              component="img"
                              image={product.image}
                              alt={product.title}
                              href={"#" + product._id} 
                              onClick={() => openModal(product._id)}
                           />
                           <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                 {product.title}
                              </Typography>
                           </CardContent>
                           </CardActionArea>
                           <CardActions>
                              <Grid container>
                                 <Grid item sx={{ width: '100%' }}>
                                    <Grid container justifyContent="space-between" align-items="center">
                                       <Grid item>
                                          <Typography gutterBottom variant="h5" component="div" ml={1} mr={2}>
                                             {formatCurrency(product.price)}
                                          </Typography>      
                                       </Grid>
                                       <Grid item justifyContent="flex-end">
                                          <Button 
                                             variant="contained"
                                             size="large" 
                                             color="primary"
                                             onClick={() => addToCartHandler(product)}
                                             xclassName="button primary"
                                          >
                                             Add To Cart
                                          </Button>
                                       </Grid>
                                    </Grid>
                                 </Grid>
                              </Grid>
                           </CardActions>
                        </Card>
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
                              {product.availableSizes.map(x => (
                                 <span> 
                                    {' '}
                                    <button className="button">{x}</button>
                                 </span>
                              ))}
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
