import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const token = localStorage.getItem("token")
    const email_verified = localStorage.getItem("email_verified")
    const mobile_verified = localStorage.getItem("mobile_verified")
    console.log(token && mobile_verified && email_verified, "authsiujni")
    console.log(token)
  return (
    (token && (mobile_verified === true) && (email_verified === true)) ? <Navigate  to="/"/> : <Outlet/>
  )
}

export default PublicRoute