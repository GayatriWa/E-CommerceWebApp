import React from 'react'
import {Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <nav className='flex justify-between items-center px-6 py-4 text-white bg-gray-800'>

        <h1 className='text-xl font-bold'>E-Commerce</h1>
        <div className='flex gap-6'>
            <Link to="/" className='hover:text-yellow-600'>Login</Link>
            <Link to="/products" className='hover:text-yellow-600'>Products</Link>
            <Link to="/cart" className='hover:text-yellow-600'>Cart</Link>
        </div>
    </nav>
  )
}

export default Navbar