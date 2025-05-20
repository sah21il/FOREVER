import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmAndDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">All Products</h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b text-gray-600 font-medium text-sm">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500 text-center">Loading products...</div>
        ) : list.length === 0 ? (
          <div className="p-6 text-gray-400 text-center">No products found.</div>
        ) : (
          list.map((item) => (
            <div
              key={item.id}
              className="md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 border-b hover:bg-gray-50 transition"
            >
              <div className="flex justify-center md:justify-start">
                <img
                  src={item.image?.[0] || '/fallback.png'}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />
              </div>

              <div className="mt-2 md:mt-0 text-gray-800 font-medium">{item.name}</div>
              <div className="text-gray-500">{item.category}</div>
              <div className="text-gray-800">
                {currency}
                {item.price}
              </div>
              <div className="text-center">
                <button
                  onClick={() => confirmAndDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50 transition"
                >
                  {deletingId === item.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;







// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchList = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`);
//       if (response.data.success) {
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmAndDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//     if (!confirmDelete) return;

//     setDeletingId(id);
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 font-[Inter]">
//       <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
//         🛍️ All Products
//       </h1>

//       <div className="rounded-3xl p-6 bg-[#f0f0f3] shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff]">
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-6 text-[#555] text-sm font-semibold mb-4 px-2">
//           <span>Image</span>
//           <span>Name</span>
//           <span>Category</span>
//           <span>Price</span>
//           <span className="text-center">Action</span>
//         </div>

//         {loading ? (
//           <div className="text-center py-12 text-gray-500 text-lg">Loading products...</div>
//         ) : list.length === 0 ? (
//           <div className="text-center py-12 text-gray-400">No products found.</div>
//         ) : (
//           list.map((item) => (
//             <div
//               key={item._id}
//               className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-6 items-center bg-white p-4 mb-4 rounded-2xl shadow-[4px_4px_12px_#d1d9e6,_-4px_-4px_12px_#ffffff] transition-transform hover:scale-[1.01]"
//             >
//               <img
//                 src={item.image?.[0] || '/fallback.png'}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow"
//               />
//               <p className="font-semibold text-gray-800">{item.name}</p>
//               <p className="text-gray-600">{item.category}</p>
//               <p className="text-indigo-600 font-semibold">
//                 {currency}
//                 {item.price}
//               </p>
//               <div className="text-center">
//                 <button
//                   onClick={() => confirmAndDelete(item._id)}
//                   disabled={deletingId === item._id}
//                   className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-tr from-pink-500 to-indigo-500 shadow-lg hover:brightness-110 active:scale-95 transition-all ${
//                     deletingId === item._id ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {deletingId === item._id ? 'Deleting...' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default List;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';

// const List = ({token}) => {

//     const [list,setList]=useState([]);

//     const fetchList=async()=>{
//         try {
//             const response=await axios.get(backendUrl+'/api/product/list');

//             if(response.data.success){
//                 setList(response.data.products);
//             } else{
//                 toast.error(response.data.message)
//             }
//             console.log(response.data);
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
            
            
//         }

//     }


//     const removeProduct=async(id)=>{
//         try {
//             const response=await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 await fetchList();
//             }
//             else{
//                 toast.error(response.data.message)
//             }


//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)

//         }

//     }

//     useEffect(()=>{
//         fetchList()
//     },[])


//   return (
//     <>

//     <p>All Products</p>

//     <div>
//         <div className='md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]'>
//             <b>Image</b>
//             <b>Name</b>
//             <b>Category</b>
//             <b>Price</b>
//             <b className='text-center'>Action</b>
//         </div>


//         {
//             list.map((item,index)=>(
//                 <div key={index}>
//                     <img src={item.image[0]} alt="" />
//                     <p>{item.name}</p>
//                     <p>{item.category}</p>
//                     <p>{currency}{item.price}</p>
//                     <p onClick={()=>removeProduct(item._id)} className='cursor-pointer'>x</p>

//                 </div>
//             ))
//         }



//     </div>
        
      
//     </>
//   )
// }

// export default List
