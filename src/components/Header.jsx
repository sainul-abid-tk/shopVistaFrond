
import React from 'react'
import { Link } from 'react-router-dom';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Button } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
function Header() {
  return (
    <div>
       <div className='py-3 min-h-16 px-3 shadow-xl relative flex justify-between '>
       <Link className='flex  items-center ' to={'/'}>
        <CardGiftcardIcon fontSize='large'/>
        <h4 className='text-2xl italic no-underline text-blue-600 font-extrabold'>Shop<span className='text-black'>Vista</span></h4>
        </Link>
        <div className='flex max-sm:flex-col'>
        <div className='flex justify-end'>
        <Link to={'/delivery'}>
        <LocalShippingIcon fontSize='large' className='me-6 max-[390px]:me-0  max-[390px]:float-right'/>
        </Link>
        </div>
        <Button variant='contained' >Login / SignUp</Button>
        </div>
       </div>
    </div>
  )
}

export default Header