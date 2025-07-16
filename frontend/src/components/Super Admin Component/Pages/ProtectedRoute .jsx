import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Check if superadmin token (or any auth token) exists in sessionStorage
  const accessToken = sessionStorage.getItem('access_token')
  const role = sessionStorage.getItem('role') // optional if you store role

  // If token doesn’t exist or role is not superadmin, redirect to login
  if (!accessToken || role !== 'superadmin') {
    return <Navigate to="/" replace />
  }

  // Otherwise allow access
  return children
}

export default ProtectedRoute
