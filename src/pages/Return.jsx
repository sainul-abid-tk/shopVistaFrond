import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { getProductAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Return() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [open, setOpen] = useState(false);
    const [userDetails,setUserDetails]=useState({
        firstName:'',
        lastName:'',
        address:'',
        pincode:'',
        phoneNumber:'',
        location:'',
        productDetails:''
      })
    const [pDetails,setPdetails]=useState()
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
  useEffect(()=>{
    getProductDetails()
  },[id])
  const handleSend=()=>{
    const {firstName,lastName,address,pincode,phoneNumber,location,productDetails}=userDetails
    if(!firstName || !lastName || !address || !pincode || !phoneNumber || !location ||!productDetails){
      toast.warning('please fill the form completely!!!')
    }else{
      setOpen(true)
      setTimeout(() => {
        navigate(`/`)
        setOpen(false)
      }, 8000);
      setTimeout(() => {
        toast.success('Your returning details was gone to delivered')
      }, 2000);
      setTimeout(() => {
        toast.info('Our team will be pickUp your product from you then you will get return amount')
      }, 5000);
    }
  }
  console.log(pDetails);
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleSend}
      >
        <CircularProgress size={60} color="warning" />
      </Backdrop>
      <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
        />
        <div className='min-h-screen px-20 max-md:px-3'>
        <h1 className='text-center font-bold text-4xl my-6'>Return PickUp Details</h1>
      <div className='p-12 shadow-xl'>
      <div  className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1  space-x-8 max-md:space-x-0'>
      <div className='space-y-10 max-md:mb-10 flex flex-col items-center'>
      <TextField id="filled-basic" onChange={(e)=>{setUserDetails({...userDetails,firstName:e.target.value})}} label="Enter Your First name" style={{width:'300px'}} variant="filled" />
      <TextField id="filled-basic"  onChange={(e)=>{setUserDetails({...userDetails,lastName:e.target.value})}}  label="Enter Your Last name" style={{width:'300px'}} variant="filled" />
      <TextField id="filled-basic" onChange={(e)=>{setUserDetails({...userDetails,address:e.target.value})}}  label="Enter Your Address" multiline
          rows={4} style={{width:'300px'}} variant="filled" />
      </div>
      <div className='space-y-10 flex flex-col items-center'>
      <TextField id="filled-basic" onChange={(e)=>{setUserDetails({...userDetails,pincode:e.target.value})}} type='number' label="Enter Your Pincode" style={{width:'300px'}} variant="filled" />
      <TextField id="filled-basic" type='number' onChange={(e)=>{setUserDetails({...userDetails,phoneNumber:e.target.value})}}  label="Enter Your Phonenumber" style={{width:'300px'}} variant="filled" />
      <TextField id="filled-basic" onChange={(e)=>{setUserDetails({...userDetails,location:e.target.value})}}  label="Enter Your Location" style={{width:'300px'}} variant="filled" />
      </div>
      <div className='flex space-y-2 flex-col items-center'>
      <p className='text-red-500 font-bold text-base w-full'>Why did you return your product explain with detail!! </p>  
      <TextField  id="filled-basic" onChange={(e)=>{setUserDetails({...userDetails,productDetails:e.target.value})}} multiline rows={4} label='reason*' style={{width:'330px'}} variant="filled"/> 
      </div>
      </div>
      <div className='flex justify-between w-full mt-10 '>
        <Button onClick={()=>{
            navigate('/')
        }} variant='contained' color='error'>Cancel</Button>
        <Button onClick={handleSend} variant='contained' color='primary'>Send</Button>
      </div>
      </div>
    </div>
    </>
    
  )
}

export default Return