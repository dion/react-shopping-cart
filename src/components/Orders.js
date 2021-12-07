import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersAsync } from '../reducers/orderSlice';
import formatCurrency from '../util';

const Orders = () => {
   const orders = useSelector((state) => state.orders);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(
         fetchOrdersAsync()
      );
   }, [dispatch])
   
   //const { orders } = this.props;
   return !orders ? <div>Orders</div> : (
      <div className="orders">
         <h2>Orders</h2>
         <table>
            <thead>
               <tr>
                  <th>
                     ID
                  </th>
                  <th>
                     DATE
                  </th>
                  <th>
                     TOTAL
                  </th>
                  <th>
                     NAME
                  </th>
                  <th>
                     ADDRESS
                  </th>
                  <th>
                     ITEMS
                  </th>
               </tr>
            </thead>
            <tbody>
               {orders.map(order => (
                  <tr>
                     <td>{order._id}</td>
                     <td>{order.createdAt}</td>
                     <td>{formatCurrency(order.total)}</td>
                     <td>{order.name}</td>
                     <td>{order.email}</td>
                     <td>{order.address}</td>
                     <td>
                        {order.cartItems.map(item => (
                           <div>
                              {item.count} {' x '} {item.title}
                           </div>
                        ))}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Orders;