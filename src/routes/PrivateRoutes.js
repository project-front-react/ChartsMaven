import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    // let auth ={token:false}
    const token = localStorage.getItem("token")
    // const email_verified = localStorage.getItem("email_verified")
    // const mobile_verified = localStorage.getItem("mobile_verified")
  return (
    token  ? <Outlet/> : <Navigate  to="/login"/>
  )
}

export default PrivateRoutes