import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

import { removeFromCart } from '../reducers/cartSlice';
import { clearOrder, createOrderAsync } from '../reducers/orderSlice';

const Cart = () => {
   const cartItems = useSelector((state) => state.cartItems);
   const order = useSelector((state) => state.order);

   console.log('order', order);
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
         {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is empty</div>
            ) : ( 
            <div className="cart cart-header">
               You have {cartItems.length} in the cart
            </div>
         )}

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
                                 <div>
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
         <div>
            <div className="cart">
               <Fade left cascade>
                  <ul className="cart-items">
                     {cartItems.map(item => (
                        <li key={item._id}>
                           <div>
                              <img src={item.image} alt={item.title} />
                           </div>
                           <div>
                              <div>{item.title}</div>
                              <div className="right">
                                 {formatCurrency(item.price)} x {item.count}{' '}
                                 <button className="button" onClick={() => removeFromCartHandler(item)}>
                                    Remove
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </Fade>
            </div>
            {cartItems.length > 0 && (
               <div>
                  <div className="cart">
                     <div className="total">
                        Total:{' '}
                        {formatCurrency(
                           cartItems.reduce((a,c) => a + c.price * c.count, 0)
                        )}
                     </div>
                     <button 
                        onClick={() => setShowCheckout(true)} 
                        className="button primary"
                     >
                        Proceed
                     </button>
                  </div>
                  {showCheckout && (
                     <Fade right cascade>
                        <div className="cart">
                           <form onSubmit={(e) => createOrderHandler(e)}>
                              <ul className="form-container">
                                 <li>
                                    <label>Email</label>
                                    <input 
                                       name="email"
                                       type="email" 
                                       required 
                                       onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                 </li>
                                 <li>
                                    <label>Name</label>
                                    <input 
                                       name="name"
                                       type="text" 
                                       required 
                                       onChange={(e) => setName(e.target.value)}
                                    ></input>
                                 </li>
                                 <li>
                                    <label>Address</label>
                                    <input 
                                       name="address"
                                       type="text" 
                                       required 
                                       onChange={(e) => setAddress(e.target.value)}
                                    ></input>
                                 </li>
                                 <li>
                                    <button className="button primary" type="submit">Checkout</button>
                                 </li>
                              </ul>
                           </form>
                        </div>
                     </Fade>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Cart;
