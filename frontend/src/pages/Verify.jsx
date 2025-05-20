import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error('Verification failed, redirecting to cart.');
        navigate('/cart');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="flex justify-center items-center h-[70vh]">
      {loading ? (
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">Verifying payment...</p>
        </div>
      ) : null}
    </div>
  );
};

export default Verify;





// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import {useSearchParams} from 'react-router-dom'
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Verify = () => {

//     const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext)
//     const [searchParams,setSearchParams]=useSearchParams()

//     const success=searchParams.get('success')
//     const orderId=searchParams.get('orderId')

//     const verifyPayment = async()=>{
//         try {
//             if(!token){
//                 return null;
//             }

//             const response= await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})

//             if(response.data.success){
//                 setCartItems({});
//                 navigate('/orders')
//             } else{
//                 navigate('/cart')
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
            
//         }

//     }

//     useEffect(()=>{
//         verifyPayment();

//     },[token])


//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Verify
