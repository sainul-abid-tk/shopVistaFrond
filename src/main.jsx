import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserDataResponse from './ContextAPI/UserDataResponse.jsx'
import DeliveryDetails from './pages/DeliveryDetails.jsx'
import DeliveryProductDetails from './ContextAPI/DeliveryProductDetails.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeliveryProductDetails>
    <UserDataResponse>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserDataResponse>
    </DeliveryProductDetails>
  </React.StrictMode>,
)
