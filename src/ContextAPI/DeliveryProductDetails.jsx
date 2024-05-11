import React, { createContext, useState } from 'react'
export const deliveryProductDetailsContext=createContext()
function DeliveryProductDetails({children}) {
    const [deliverProDetails,setDeliveryProDetails]=useState("")
  return (
    <deliveryProductDetailsContext.Provider value={{deliverProDetails,setDeliveryProDetails}}>
        {children}
    </deliveryProductDetailsContext.Provider>
  )
}

export default DeliveryProductDetails