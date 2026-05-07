import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import Register from '../pages/Register'
import Orders from '../pages/Orders'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Favorites from '../pages/Favorites'
import Contact from '../pages/Contact'
import Blogs from '../pages/Blogs'
import Profile from '../pages/Profile'

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
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/profile" element={<Profile />} />
        
    </Routes>
  )
}

export default AppRoutes