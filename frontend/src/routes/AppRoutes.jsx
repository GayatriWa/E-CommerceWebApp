import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import Register from '../pages/Register'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={<Register /> } />
    </Routes>
  )
}

export default AppRoutes