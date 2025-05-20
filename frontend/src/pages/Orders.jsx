import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              date: order.date,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        setError(response.data.message || 'Failed to load orders');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {orderData.length === 0 && !loading && <p>No orders found.</p>}

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image && item.image.length > 0 ? item.image[0] : ''}
                alt={item.name || 'Product Image'}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date:{' '}
                  <span className="text-gray-400">
                    {item.date ? new Date(item.date).toDateString() : 'N/A'}
                  </span>{' '}
                </p>
                <p className="mt-2">
                  Payment Method:{' '}
                  <span className="text-gray-400">{item.paymentMethod || 'N/A'}</span>{' '}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="min-w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                disabled={loading}
                className="border px-4 py-2 text-sm font-medium rounded-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
