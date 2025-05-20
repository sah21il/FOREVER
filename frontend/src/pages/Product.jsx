import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/product/${productId}`);
        const data = await response.json();

        if (data.success) {
          const foundProduct = data.product;
          setProductData(foundProduct);
          setImage(foundProduct.image[0]);
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSize(foundProduct.sizes[0]);
          }
        } else {
          console.error("Product not found:", productId);
        }

      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading product...</div>;
  }

  if (!productData) {
    return <div className="flex justify-center items-center h-64">Product not found</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image && productData.image.map((item, index) => (
              <img 
                onClick={() => setImage(item)} 
                src={item} 
                key={index} 
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                alt={`${productData.name} view ${index + 1}`} 
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p> (122)</p>
          </div>
          <p className="mt-5 font-medium text-3xl">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button 
                    onClick={() => setSize(item)} 
                    className={`py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border border-black' : ''}`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={() => addToCart(productData.id, size)} 
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-800'
          >
            ADD TO CART
          </button>
          
          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original</p>
            <p>7 days refundable</p>
            <p>Cash on Delivery Available</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border border-r-0 px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description || "No description available for this product."}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit blanditiis aperiam non, nisi quam laboriosam...</p>
        </div>
      </div>

      {productData.category && (
        <RelatedProducts 
          category={productData.category} 
          subCategory={productData.subCategory}
        />
      )}
    </div>
  );
}

export default Product;
