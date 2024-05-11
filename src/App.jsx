import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import PDetails from './pages/PDetails'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import DeliveryDetails from './pages/DeliveryDetails'
import Return from './pages/Return'
function App() {
  return (
    
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pdetails/:id' element={<PDetails/>}/>
      <Route path='/shipping/:id' element={<Shipping/>}/>
      <Route path='/payment/:id' element={<Payment/>}/>
      <Route path='/delivery' element={<DeliveryDetails/>}/>
      <Route path='/return/:id' element={<Return/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App