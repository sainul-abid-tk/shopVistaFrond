import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { getAllProductsAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reProductId = searchParams.get('RpId');
  console.log(reProductId);
  const [allProducts,setAllProducts]=useState()
  const getAllProducts=async()=>{
    try{
      const result=await getAllProductsAPI()
      if(result.status===200){
        setAllProducts(result.data.products)
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[allProducts])
  // console.log(allProducts);
  return (
    <div className='min-h-screen'>
      <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
        />
      <div className='flex justify-center'>
      <div className='text-center mt-8 w-1/2 max-md:w-3/4 space-y-5'>
        <h1 className='italic text-4xl  text-blue-600'>Where Trends Meet Convenience</h1>
        <h2 className='italic text-2xl font-extralight '>Empowering Your Retail Journey, One Click at a Time. Discover, Delight, and Define Your Shopping Experience with Us.</h2>
      </div>
      </div>
      {reProductId&&<h1 className='text-center font-bold text-red-500 text-2xl'>You can choose a product for replacing your product</h1>}
      <div className='grid mt-12  grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-4'>
        {
          allProducts?.map((product,index)=>(
            <div key={index} className='mb-8'>
           <Product product={product} reProductId={reProductId}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home