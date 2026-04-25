import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ProtectedRoute from '../components/authProtected'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><h1 className='text-3xl'>Clothify</h1></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App