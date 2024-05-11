import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { getProductAPI } from '../Services/allAPI';
import { toast } from 'react-toastify';
function Product({product,reProductId}) {
  const navigate=useNavigate()
  const[reProductAmt,setReProductAmt]=useState()
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
    getReproductDetails()
  },[reProductId])
  console.log(reProductAmt);
  const handleMore=()=>{
    // reProductId? navigate(`/pdetails/${product.id}?RpId=${reProductId}`):
    if(!reProductAmt){
      navigate(`/pdetails/${product.id}`)
    }else{
      if(reProductAmt>=Math.floor(product.price-product?.price*product?.discountPercentage/100)){
       navigate(`/pdetails/${product.id}?RpId=${reProductId}`)
      }else{
        toast.warning('You cannot replace this product beacause the product amount is less to your replacing product amount')
      }
    }
  }
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className='shadow-lg'>
      <img
        className='w-100 h-64'

        src={product?.thumbnail}
      />
      <CardContent className='flex justify-between px-2'>
        <h4 className='font-bold text-xl'>
          {product?.title.slice(0,15)}
        </h4>
        <Typography>
        <Rating name="read-only" precision={0.5} size='medium' value={product?.rating} readOnly />
        </Typography>
      </CardContent>
      <CardContent className='text-center '>
        <p className='font-bold text-xl text-green-500'> ${Math.floor(product.price-product?.price*product?.discountPercentage/100)} <span className='line-through text-yellow-300'>${product?.price}</span></p>
      </CardContent>
      <CardActions className='flex justify-center'>
        <Button onClick={handleMore} className='w-[320px] font-bold' variant='contained' size="medium">View More</Button>
      </CardActions>
    </Card>
    </>
  )
}

export default Product