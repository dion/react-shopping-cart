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
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
//import Modal from '@mui/material/Modal';

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
      <Grid container xdirection="column">
         <Fade bottom cascade>
            {!products ? (<div>Loading...</div>) :
               (<Grid container>
                  {products.map(product => (
                     <Box
                        sx={{ maxWidth: '28%', margin: '0 1.5rem 2.5rem' }}
                        key={product._id}
                     >
                        <Card>
                           <CardActionArea>
                              <CardMedia
                                 component="img"
                                 image={product.image}
                                 alt={product.title}
                                 href={"#" + product._id} 
                                 onClick={() => openModal(product._id)}
                              />
                           </CardActionArea>
                        </Card>
                        
                        <Typography gutterBottom variant="subtitle1" component="div" mt={2}>
                           {product.title}
                        </Typography>

                        <Grid container>
                           <Grid item sx={{ width: '100%' }}>
                              <Grid container justifyContent="space-between" align-items="center">
                                 <Grid item>
                                    <Typography gutterBottom variant="subtitle1">
                                       {formatCurrency(product.price)}
                                    </Typography>      
                                 </Grid>
                                 <Grid item justifyContent="flex-end">
                                    <Button 
                                       variant="contained"
                                       size="small" 
                                       color="primary"
                                       onClick={() => addToCartHandler(product)}
                                       style={{ textTransform: 'none' }}
                                    >
                                       Add To Cart
                                    </Button>
                                 </Grid>
                              </Grid>
                           </Grid>
                        </Grid>
                     </Box>
                  ))}
               </Grid>)}
         </Fade>
         {product && (
            <Modal 
               isOpen={true}
               onRequestClose={closeModal}
               ariaHideApp={false}
            >
               <Zoom>
                  
                  <div className="product-details">
                     <Button 
                        variant="contained"
                        size="small" 
                        color="secondary"
                        onClick={closeModal}
                        sx={{ 
                           position: 'absolute',
                           right: 0,
                           top: 0,
                           zIndex: 100000
                        }}
                     >
                        x
                     </Button>
                     <img src={product.image} alt={product.title} style={{ height: '80vh' }} />
                     <div className="product-details-description">
                        <Typography gutterBottom variant="h4" component="p">
                           <strong>{product.title}</strong>
                        </Typography>
                        <Typography gutterBottom variant="h2" component="div">
                           <strong>{formatCurrency(product.price)}</strong>
                        </Typography>
                        <Typography gutterBottom variant="body" component="p">
                           {product.description}
                        </Typography>
                        
                        <Typography gutterBottom variant="subtitle1" component="p">
                           <strong>SELECT SIZE:</strong>
                        </Typography>
                        
                        <Grid container justifyContent="space-between" align-items="center" sm={4}>
                           {product.availableSizes.map(x => (                              
                              <Button 
                                 variant="contained"
                                 size="small" 
                                 xclassName="button"
                              >{x}</Button>
                           ))}
                        </Grid>

                        <div className="product-price" style={{ marginTop: '1rem' }}>
                           <Button 
                              variant="contained"
                              size="large" 
                              xclassName="button primary" 
                              onClick={() => {
                                 addToCartHandler(product);
                                 closeModal();
                              }}
                           >
                              Add To Cart
                           </Button>
                        </div>
                     </div>
                  </div>
               </Zoom>
            </Modal>
         )}
      </Grid>
   );
}

export default Products;
