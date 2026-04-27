import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ProtectedRoute from '../components/authProtected'
import { useDispatch } from 'react-redux'
import { setUser } from './features/auth/state/auth.slice'
import ProductCreate from './features/product/pages/ProductCreate'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getme = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profile", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data.user));
        }
        else{
          dispatch(setUser(null));
        }
      } catch (error) {
        console.log(error.message);
        // dispatch(setLoading(true));
        dispatch(setUser(null));
      }
    };
    getme();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<h1 className='text-3xl'>Clothify</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/create" element={<ProtectedRoute><ProductCreate /></ProtectedRoute>} />
    </Routes>
  )
}

export default App