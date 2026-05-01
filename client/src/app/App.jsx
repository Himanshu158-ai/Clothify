import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ProtectedRoute from '../components/authProtected'
import { useDispatch } from 'react-redux'
import { setUser } from './features/auth/state/auth.slice'
import ProductCreate from './features/product/pages/ProductCreate'
import AllProduct from './features/product/pages/AllProduct'
import ViewProduct from './features/product/pages/ViewProduct'
import CartProduct from './features/product/pages/CartPoduct'

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
        else {
          dispatch(setUser(null));
        }
      } catch (error) {
        dispatch(setUser(null));
      }
    };
    getme();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AllProduct />} />
      <Route path="/product-create" element={<ProtectedRoute><ProductCreate /></ProtectedRoute>} />
      <Route path="/view-product/:id" element={<ViewProduct />} />
      <Route path="/cart" element={<ProtectedRoute><CartProduct /></ProtectedRoute>} />
    </Routes>
  )
}

export default App