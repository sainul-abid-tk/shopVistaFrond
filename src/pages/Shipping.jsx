import { Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { userDataResponseContext } from '../ContextAPI/UserDataResponse'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Shipping() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reProductId = searchParams.get('RpId');
  const {userDataRes,setUserDataRes}=useContext(userDataResponseContext)
  const navigate=useNavigate()
  const {id}=useParams()
  const [userDetails,setUserDetails]=useState({
    firstName:'',
    lastName:'',
    address:'',
    pincode:'',
    phoneNumber:'',
    location:'',
    replaceProductId:reProductId
  })
  const handleProceed=()=>{
    const {firstName,lastName,address,pincode,phoneNumber,location,replaceProductId}=userDetails
    if(!replaceProductId){
      if(!firstName || !lastName || !address || !pincode || !phoneNumber || !location){
        toast.warning('please fill the form completely!!!')
      }else{
        setUserDataRes(userDetails)
        setOpen(true)
        setTimeout(() => {
          navigate(`/payment/${id}`)
        }, 2000);
      }
    }else{
      if(!firstName || !lastName || !address || !pincode || !phoneNumber || !location ||!replaceProductId){
        toast.warning('please fill the form completely!!!')
      }else{
        setUserDataRes(userDetails)
        setOpen(true)
        setTimeout(() => {
          navigate(`/payment/${id}?RpId=${reProductId}`)
        }, 2000);
      }
    }
  }
  console.log(userDetails);
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleProceed}
      >
        <CircularProgress size={60} color="warning" />
      </Backdrop>
      <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
        />
         <div className='min-h-screen flex justify-center items-center flex-col '> 
      <h1 className='text-4xl font-bold mb-4 text-center mt-12'>Shipping Details,Please fill this form</h1>
      <div className='p-12 shadow-xl'>
      <div  className='max-w-[850px]   grid grid-cols-2 max-md:grid-cols-1  space-x-8 max-md:space-x-0'>
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
      </div>
      <div className='flex justify-between w-full mt-10 '>
        <Button onClick={()=>{
          navigate(`/pdetails/${id}`)
        }} variant='contained' color='error'>Cancel</Button>
        <Button onClick={handleProceed} variant='contained' color='primary'>Proceed</Button>
      </div>
      </div>
      
      
    </div>
    </>
   
  )
}

export default Shipping