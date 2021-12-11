import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

import { removeFromCart } from '../reducers/cartSlice';
import { clearOrder, createOrderAsync } from '../reducers/orderSlice';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TextField from '@mui/material/TextField';

import EmptyBag from '../assets/empty-bag.jpg';

const Cart = () => {
   const cartItems = useSelector((state) => state.cartItems);
   const order = useSelector((state) => state.order);
   const dispatch = useDispatch();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const [showCheckout, setShowCheckout] = useState('');
   const [orderModalState, setOrderModalState] = useState(false);

   const createOrderHandler = (e) => {
      e.preventDefault();

      const order = {
         name: name,
         email: email,
         address: address,
         cartItems: cartItems,
         total: cartItems.reduce((a,c) => a + c.price * c.count, 0),
      };
      console.log('createOrderHandler', order);
      dispatch(
         createOrderAsync(order)
      );
      setOrderModalState(true);
   };

   const closeModal = () => {
      setOrderModalState(false);
      clearOrder();
   };

   const removeFromCartHandler = (item) => {
      dispatch(removeFromCart(item));
   };

   return (
      <div>
         {order.length !== 0 && (
            <Modal
               isOpen={orderModalState}
               onRequestClose={closeModal}
               ariaHideApp={false}
            >
               <Zoom>
                  <button className="close-modal" onClick={closeModal}>x</button>
                  <div className="order-details">
                     <h3 className="success-message">Your order has been placed.</h3>
                     <h2>Order {order._id}</h2>
                     <ul>
                        <li>
                           <div>Name:</div>
                           <div>{order.name}</div>
                        </li>
                        <li>
                           <div>Email:</div>
                           <div>{order.email}</div>
                        </li>
                        <li>
                           <div>Address:</div>
                           <div>{order.address}</div>
                        </li>
                        <li>
                           <div>Date:</div>
                           <div>{order.createdAt}</div>
                        </li>
                        <li>
                           <div>Total:</div>
                           <div>{formatCurrency(order.total)}</div>
                        </li>
                        <li>
                           <div>Cart Items:</div>
                           <div>
                              {order.cartItems && order.cartItems.map(x => (
                                 <div key={x._id}>
                                    {x.count} {' x '} {x.title}
                                 </div>
                              ))}
                           </div>
                        </li>
                        
                     </ul>
                  </div>
               </Zoom>
            </Modal>
         )}
         <Grid
            sx={{
               margin: '1rem'      
            }}
         >
            <Typography gutterBottom variant="h4" component="div" sx={{ margin: '5rem 1rem 0' }}>
               <strong>My Cart</strong>
            </Typography>
            
            {cartItems.map(item => (
               <Fade left cascade key={item._id}>
                  <Box sx={{ 
                        display: 'flex', alignItems: 'center',
                        textAlign: 'center', margin: '1rem' 
                     }}
                  >
                     <div>
                        <img 
                           src={item.image} 
                           alt={item.title} 
                           style={{ maxHeight: '102px' }}
                        />
                     </div>
                     <Box sx={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '.5rem', margin: '.5rem', paddingRight: 0, marginRight: 0
                     }}>
                        <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
                           {item.title.substring(0, 28)}
                        </Typography>
                        <Box sx={{
                           display: 'flex', alignItems: 'left', justifyContent: 'space-between', 
                           textAlign: 'left', flexWrap: 'wrap'
                        }}>
                           <div className="cart-remove" onClick={() => removeFromCartHandler(item)}>
                              x
                           </div>
                           <div>
                              <Typography variant="subtitle2">
                                 {item.count} pcs
                              </Typography>
                           </div> 
                           <div>
                              <Typography variant="subtitle2">
                                 {formatCurrency(item.price)}
                              </Typography>
                              {/* <button className="button" onClick={() => removeFromCartHandler(item)}>
                                 Remove
                              </button> */}
                           </div>
                        </Box>
                     </Box>
                  </Box>
               </Fade>
            ))}

            {cartItems <= 0 && (
               <div>
                  <Typography variant="subtitle1" sx={{ margin: '1rem 1rem 0' }}>
                     <img src={EmptyBag} alt="Your bag is empty" style={{ width: '100%' }}/>
                  </Typography>
                  <Button 
                     variant="outlined"
                     size="large" 
                     color="primary"
                     sx={{ width: '100%' }}
                  >
                     START SHOPPING
                  </Button>
               </div>
            )}

            {cartItems.length > 0 && (
               <div>
                  <Fade left cascade>
                  <Box
                     sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        flexDirection: 'column',
                        textAlign: 'center', margin: '1rem',
                        borderTop: '1px solid #c0c0c0', pt: '1rem'
                     }}
                  >
                     <Box
                        sx={{
                           width: '100%',
                           display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                           flexDirection: 'row'
                        }}
                     >
                        <Box>
                           <Typography variant="subtitle1">
                              TOTAL:
                           </Typography>
                        </Box>
                        <Box>
                           <Typography variant="subtitle1">
                              {formatCurrency(
                                 cartItems.reduce((a,c) => a + c.price * c.count, 0)
                              )}
                           </Typography>
                        </Box>
                     </Box>
                     <Box
                        sx={{
                           width: '100%',
                           mt: '3rem'
                        }}
                     >
                        <Button 
                           variant="contained"
                           size="large" 
                           color="primary"
                           onClick={() => setShowCheckout(true)} 
                           sx={{ width: '100%' }}
                           endIcon={<TrendingFlatIcon />}
                        >
                           CHECK OUT
                        </Button>
                     </Box>
                  </Box>
                  </Fade>
                  {showCheckout && (
                     <Fade right cascade>
                        <div className="cart">
                           <form onSubmit={(e) => createOrderHandler(e)}>
                              <ul className="form-container">
                                 <li>
                                    <TextField 
                                       required 
                                       id="outlined-basic" 
                                       label="Email" 
                                       variant="outlined" 
                                       onChange={(e) => setEmail(e.target.value)}
                                    />
                                 </li>
                                 <li>
                                    <TextField 
                                       required 
                                       id="outlined-basic" 
                                       label="Name" 
                                       variant="outlined" 
                                       onChange={(e) => setName(e.target.value)}
                                    />
                                 </li>
                                 <li>
                                    <TextField 
                                       required 
                                       id="outlined-basic" 
                                       label="Address" 
                                       variant="outlined" 
                                       onChange={(e) => setAddress(e.target.value)}
                                    />
                                 </li>
                                 <li>
                                    <Button 
                                       type="submit"
                                       variant="contained"
                                       size="large" 
                                       color="secondary"
                                       onClick={() => setShowCheckout(true)} 
                                       sx={{ width: '100%' }}
                                       endIcon={<TrendingFlatIcon />}
                                    >Submit</Button>
                                 </li>
                              </ul>
                           </form>
                        </div>
                     </Fade>
                  )}
               </div>
            )}
         </Grid>
      </div>
   );
};

export default Cart;
