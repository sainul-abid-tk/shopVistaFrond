import React from 'react'
import { Link } from 'react-router-dom'
import CallIcon from '@mui/icons-material/Call';
import { Button } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmailIcon from '@mui/icons-material/Email';
function Footer() {
  return (
    <div >
    <div className='w-full grid grid-cols-4 px-8 py-5 max-lg:grid-cols-2 max-[500px]:grid-cols-1 mt-10'>
      <div>
      <Link className='flex  items-center ' to={'/'}>
        <CardGiftcardIcon fontSize='large'/>
        <h4 className='text-2xl italic no-underline text-blue-600 font-extrabold'>Shop<span className='text-black'>Vista</span></h4>
        </Link>
      <p className='text-md italic font-bold'>"Where Trends Meet Convenience"</p>
      </div>
      <div>
        <h6 className='font-bold text-xl'>Pages</h6>
        <ul className='mt-3'>
          <Link to={'/'}><li className='mb-2 text-lg'>Home</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>Products</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>About</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>Dashboard</li></Link>
        </ul>
      </div>
      <div>
      <h6 className='font-bold text-xl'>Customer Services</h6>
        <ul className='mt-3'>
          <Link to={'/'}><li className='mb-2 text-lg'>Help</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>Terms</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>Privacy Policy</li></Link>
          <Link to={'/'}><li className='mb-2 text-lg'>FAQ</li></Link>
        </ul>
      </div>
      <div className='space-y-5'>
        <h4 className='text-xl font-bold '>Contact Us</h4>
        <Button variant='contained' className='w-full mb-5' startIcon={<CallIcon/>} color='success'>Call</Button>
        <Button variant="contained" className='w-full' startIcon={<EmailIcon/>} color='error'>E-mail</Button>
      </div>
    </div>
    <h6 className='text-md text-center '>Copyright © All Rights Reserved.2024</h6>
    </div>
  )
}

export default Footer