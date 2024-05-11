import React, { useContext, useEffect, useState } from 'react'
import { userDataResponseContext } from '../ContextAPI/UserDataResponse'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProductAPI } from '../Services/allAPI'
import { Button } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { deliveryProductDetailsContext } from '../ContextAPI/DeliveryProductDetails'
function Payment() {
  const {userDataRes,setUserDataRes}=useContext(userDataResponseContext)
  const {deliverProDetails,setDeliveryProDetails}=useContext(deliveryProductDetailsContext)
  const navigate=useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reProductId = searchParams.get('RpId');
  const {id}=useParams()
  const [pDetails,setPdetails]=useState()
  const[reProductAmt,setReProductAmt]=useState()
  const [open, setOpen] = React.useState(false);
  const getProductDetails=async()=>{
    try{
      const result=await getProductAPI(id)
      if(result.status==200){
        setPdetails(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }
  const getReproductDetails=async()=>{
    try{
      const result=await getProductAPI(reProductId)
      if(result.status==200){
        const pDetails=result.data
       setReProductAmt(Math.floor(pDetails?.price-pDetails?.price*pDetails?.discountPercentage/100))
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getProductDetails()
    getReproductDetails()
  },[id,reProductId])
  const handlePay=()=>{
    // i didn't choose payment options(beacause its a dummy test for a successfull delivery) here we can use paypal,paytm,gpay etc... if you want i will use furture
    setOpen(true)
    setTimeout(() => {
      setDeliveryProDetails(pDetails)
      navigate('/delivery')
    }, 12000);
    setTimeout(() => {
      toast.success("Your payment process is successfull and your product is going to out of delivery")
    }, 2000);
    setTimeout(() => {
      toast.info(reProductAmt?"Your product will be get after three days then you can send your replacement product":"Your product will be get after three days")
    }, 6000);
    setTimeout(() => {
      toast.success('Thank you for purchasing with us 🙏🏻')
    }, 10000);
  }
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handlePay}
      >
        <CircularProgress size={60} color="warning" />
      </Backdrop>
       <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="colored"
        />
        <div className='min-h-screen mt-6 px-12 max-md:px-4 max-sm:px-2'>
      
      <h1 className='text-4xl font-bold  text-center '>Paymet Details</h1>
      <div className='grid grid-cols-2 max-md:grid-cols-1 mt-12 '>
        <div className='text-white bg-black p-12 max-md:p-6'>
          <h1 className='text-center text-2xl font-bold'>Product Details</h1>
          <div className='grid grid-cols-2 mt-6 space-x-3'>
          <div className='flex justify-center items-center'>
            <img width={200} src={pDetails?.thumbnail} alt="" />
          </div>
          <div>
            <p className='font-bold  text-xl'>{pDetails?.title}</p>
            {reProductAmt?
            <p className='font-bold text-xl text-green-500'> ${Math.floor(pDetails?.price-pDetails?.price*pDetails?.discountPercentage/100-reProductAmt)}</p>
            :<p className='font-bold text-xl text-green-500'> ${Math.floor(pDetails?.price-pDetails?.price*pDetails?.discountPercentage/100)} <span className='line-through text-yellow-300'>${pDetails?.price}</span></p>}
            <p className='font-bold text-lg text-blue-500'>{pDetails?.brand}</p>
            <p>{pDetails?.description}</p>
          </div>
        </div>
        </div>
        <div className='p-12 shadow-lg max-md:p-6'>
          <h1 className='text-center text-2xl font-bold mb-6'>Shipping Details</h1>
          <h4 className='text-xl font-bold'>{userDataRes?.firstName} {userDataRes?.lastName}</h4>
          <h4 className='text-xl font-bold'>{userDataRes?.address}</h4>
          <h4 className='text-xl font-bold'>{userDataRes?.pincode}</h4>
          <h4 className='text-xl font-bold'>{userDataRes?.phoneNumber}</h4>
          <h4 className='text-xl font-bold'>{userDataRes?.location}</h4>
        </div>
      </div>
      <hr className=' border-black mt-10'/>
      <div className='flex justify-between w-full mt-10 '>
        <Button onClick={()=>{
          navigate(`/pdetails/${id}`)
        }} variant='contained' color='error'>Cancel</Button>
        <div className='flex space-x-3'>
        <p className='text-lg font-bold text-green-500'>After replacement <DoubleArrowIcon/></p>  
        <Button onClick={handlePay} style={{fontWeight:'bolder'}} variant='contained' color='warning'>{reProductAmt===Math.floor(pDetails?.price-pDetails?.price*pDetails?.discountPercentage/100)?'purchase':Math.floor(pDetails?.price-pDetails?.price*pDetails?.discountPercentage/100-reProductAmt)}</Button>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Payment