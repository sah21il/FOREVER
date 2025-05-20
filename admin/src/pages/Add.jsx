import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Product</h2>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">
          Upload Images
        </label>
        <div className="flex gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, index) => {
            const setImage = [setImage1, setImage2, setImage3, setImage4][index];
            const id = `image${index + 1}`;
            return (
              <label key={id} htmlFor={id} className="cursor-pointer">
                <img
                  className="w-24 h-24 object-cover border border-gray-300 rounded-lg bg-gray-50 hover:brightness-95 transition"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input
                  type="file"
                  id={id}
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          placeholder="Product name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          placeholder="Enter product description"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Subcategory
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          min="0"
          required
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 text-gray-700 font-medium">Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer select-none transition ${
                sizes.includes(size)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="w-4 h-4"
        />
        <label htmlFor="bestseller" className="text-gray-700 font-medium">
          Add to Bestsellers
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-2 py-3 rounded-xl font-semibold text-white text-lg tracking-wide transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-900'
        }`}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default Add;



// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';
// import { data } from 'react-router-dom';

// const Add = ({token}) => {

//     const [image1,setImage1]=useState(false);
//     const [image2,setImage2]=useState(false)
//     const [image3,setImage3]=useState(false)
//     const [image4,setImage4]=useState(false)


//     const [name,setName]=useState("");
//     const [description,setDescription]=useState("");
//     const [price,setPrice]=useState("");
//     const [category,setCategory]=useState("Men");
//     const [subCategory,setSubCategory ]=useState("Topwear");
//     const [bestseller,setBestseller]=useState(false);
//     const [sizes,setSizes]=useState([]);
    

//     const onSubmitHandler=async()=>{
//         e.preventDefault();

//         try {
//             const formData=new FormData()

//             formData.append("name",name)
//             formData.append("description",description)
//             formData.append("price",price)
//             formData.append("category",category)
//             formData.append("subCategory",subCategory)
//             formData.append("bestseller",bestseller)
//             formData.append("sizes",JSON.stringify(sizes))


//             image1 && formData.append("image1",image1)
//             image2 && formData.append("image2",image2)
//             image3 && formData.append("image3",image3)
//             image4 && formData.append("image4",image4)


//             const response=await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}})

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 setName('')
//                 setDescription('')
//                 setImage1(false)
//                 setImage2(false)
//                 setImage3(false)
//                 setImage4(false)
//                 setPrice('')
//             }
//             else{
//                 toast.error(response.data.message)
//             }

//             console.log(response.data);



//         } catch (error) {
//             console.log(data)
//             toast.error(error.message)
            
//         }

//     }




//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-start w-full gap-3'>
//         <div>
//             <p className='mb-2'>Upload Image</p>

//             <div className='flex gap-2'>
//                 <label htmlFor="image1">
//                     <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
//                     <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
//                 </label>
//                 <label htmlFor="image2">
//                     <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
//                     <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
//                 </label>
//                 <label htmlFor="image3">
//                     <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
//                     <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
//                 </label>
//                 <label htmlFor="image4">
//                     <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
//                     <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
//                 </label>    
//             </div>

//         </div>

//         <div className='w-full'>
//             <p className='mb-2'>Product Name</p>
//             <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2'  type="text" placeholder='Type here' name="" id="" required />
//         </div>
//         <div className='w-full'>
//             <p className='mb-2'>Product Description</p>
//             <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px]'  type="text" placeholder='Type Content here' name="" id="" required />
//         </div>

//         <div>
//             <p>Product Category</p>
//             <select onChange={(e)=>setCategory(e.target.value)} name="" id="">
//                 <option value="Men">Men</option>
//                 <option value="Women">Women</option>
//                 <option value="Kids">Kids</option>
//             </select>
//         </div>

//         <div>
//             <p>Product SubCategory</p>
//             <select onChange={(e)=>setSubCategory(e.target.value)} name="" id="">
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//             </select>
//         </div>

//         <div>
//             <p>Product Price</p>
//             <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" name="" id="" />
//         </div>

//         <div>
//             <p>Product Sizes</p>
//             <div>
//                 <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"])} className='cursor-pointer'>
//                     <p>S</p>
//                 </div>

//                 <div onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"])} className='cursor-pointer'>
//                     <p>M</p>
//                 </div>

//                 <div onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"])} className='cursor-pointer'>
//                     <p>L</p>
//                 </div>

//                 <div onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"):[...prev,"XL"])} className='cursor-pointer'>
//                     <p>XL</p>
//                 </div>

//                 <div onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"])} className='cursor-pointer'>
//                     <p>XXL</p>
//                 </div>
//             </div>
//         </div>

//         <div>
//             <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
//             <label htmlFor="bestseller">Add to Bestsellers</label>
//         </div>

//         <button type='submit'>ADD PRODUCT</button>
    
//     </form>
//   )
// }

// export default Add
