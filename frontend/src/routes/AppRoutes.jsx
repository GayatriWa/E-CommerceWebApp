import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import Register from '../pages/Register'
import Orders from '../pages/Orders'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:category' element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/login' element={<Login />}/>
        
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={<Register /> } />
        <Route path='/orders' element={<Orders/>} />
        
    </Routes>
  )
}

export default AppRoutes