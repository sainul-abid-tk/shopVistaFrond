import React, { useContext } from 'react'
import { deliveryProductDetailsContext } from '../ContextAPI/DeliveryProductDetails'
import { Button } from '@mui/material'
import { useNavigate} from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ReplayIcon from '@mui/icons-material/Replay';
function DeliveryDetails() {
  const navigate=useNavigate()
  const {deliverProDetails,setDeliveryProDetails}=useContext(deliveryProductDetailsContext)
  const product={
    id: 2,
    title: "iPhone X",
    description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    images: [
    "https://cdn.dummyjson.com/product-images/2/1.jpg",
    "https://cdn.dummyjson.com/product-images/2/2.jpg",
    "https://cdn.dummyjson.com/product-images/2/3.jpg",
    "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
    ]
  }
  return (
    <div className='h-screen px-6 mt-5'>
      <h1 className='text-center font-bold text-3xl mb-3'>Delivered Product Details</h1>
      <div className='h-72 max-md:h-auto w-full shadow-lg grid grid-cols-2 max-md:grid-cols-1 mt-6'>
        <div className='flex justify-center items-center py-5 '>
          <img className='max-h-64' src={deliverProDetails?deliverProDetails.thumbnail:product?.thumbnail} alt="" />
        </div>
        <div className='flex flex-col justify-between py-6 px-3'>
        <div>
            <p className='font-bold  text-xl'>{deliverProDetails?deliverProDetails.title:product?.title}</p>
            <p className='font-bold text-xl text-green-500'> ${deliverProDetails?Math.floor(deliverProDetails?.price-deliverProDetails?.price*deliverProDetails?.discountPercentage/100):Math.floor(product?.price-product?.price*product?.discountPercentage/100)} <span className='line-through text-yellow-300'>${deliverProDetails?deliverProDetails.price:product?.price}</span></p>
            <p className='font-bold text-lg text-blue-500'>{deliverProDetails?deliverProDetails.brand:product?.brand}</p>
            <p>{deliverProDetails?deliverProDetails.description:product?.description}</p>
        </div>
        <div className='flex justify-end'>
          <div className='space-x-5'>
            <Button onClick={()=>{
              navigate(`/return/${deliverProDetails?deliverProDetails.id:product?.id}`)
            }} variant='contained' startIcon={<ReplayIcon/>} color='warning'>Return</Button>
            <Button onClick={()=>{
              navigate(`/?RpId=${deliverProDetails?deliverProDetails?.id:product?.id}`)
            }} variant='contained' startIcon={<AutorenewIcon/>} color='primary'>Replace</Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDetails