import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { token },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, {
        orderId,
        status: event.target.value,
      }, {
        headers: { token },
      });

      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="w-12 h-12"
                />
                <div className="text-sm text-gray-800">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                      {i < order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country},{' '}
                  {order.address.zipcode}
                </p>
                <p className="text-gray-600 mt-1">📞 {order.address.phone}</p>
              </div>

              <div className="flex flex-col justify-between gap-2 text-sm">
                <div>
                  <p><span className="font-medium">Items:</span> {order.items.length}</p>
                  <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                  <p><span className="font-medium">Payment:</span> {order.payment ? 'Done' : 'Pending'}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Amount:</span> {currency}{order.amount}</p>
                </div>
                <div>
                  <label className="block font-medium mb-1">Status:</label>
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 w-full text-sm"
                    onChange={(e) => statusHandler(e, order.id)}
                    value={order.status}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;



// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import {backendUrl, currency} from '../App'
// import {toast} from 'react-toastify'
// import { assets } from '../assets/assets';

// const Orders = ({token}) => {


//   const [orders,setOrders]=useState([]);

//   const fetchAllOrders=async()=>{

//     if(!token){
//       return null
//     }

//     try {
//       const response=await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
//       if(response.data.success){
//         setOrders(response.data.orders)
//       }else{
//         toast.error(response.data.message)
//       }
      

//     } catch (error) {
//       toast.error(error.message )
      
//     }

//   }

//   const statusHandler=async(event,orderId)=>{
//     try {
//       const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
//       if(response.data.success){
//         await fetchAllOrders()
//       }
      
//     } catch (error) {
//       console.log(error.message)
//       toast.error(response.data.message)
      
//     }

//   }




//   useEffect(()=>{
//     fetchAllOrders();
//   },[token])

//   return (
//     <div>
//       <h3>Orders Page</h3>
//       <div>
//         {
//           orders.map((order,index)=>(
//             <div key={index}>
//               <img src={assets.parcel_icon} alt="" />
//               <div>
//               <div>
//                 {order.items.map((item,index)=>{
//                   if(index===order.items.length-1){
//                     return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>
//                   } else{
//                     return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>

//                   }
//                 })}
//               </div>
//               <p>{order.address.firstName+" "+order.address.lastName}</p>
//               <div>
//                 <p>{order.address.street+","}</p>
//                 <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
//               </div>
//               <div><p>{order.address.phone}</p></div>
//             </div>
//             <div> 
//             <p>Items: {order.items.length}</p>
//             <p>Method: {order.paymentMethod} </p>
//             <p>Payment: {order.payment ? 'Done' : 'Pending'} </p>
//             <p>Date: {new Date(order.date).toLocaleDateString()} </p>
//             </div>
//             <p>{currency}{order.amount}</p>
//             <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//             </div>
            
//           ))
//         }
//       </div>
      
//     </div>
//   )
// }

// export default Orders
