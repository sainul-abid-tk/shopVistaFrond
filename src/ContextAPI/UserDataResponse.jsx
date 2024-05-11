import React, { createContext, useState } from 'react'
export const userDataResponseContext=createContext()
function UserDataResponse({children}) {
  const [userDataRes,setUserDataRes]=useState()
  return (
    <userDataResponseContext.Provider value={{userDataRes,setUserDataRes}}>
      {children}
    </userDataResponseContext.Provider>
  )
}

export default UserDataResponse