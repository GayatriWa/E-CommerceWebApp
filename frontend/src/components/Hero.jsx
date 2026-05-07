import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from "../redux/slices/productSlice";

const Hero = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

  return (
    <div className='relative w-full h-[300px] md:h-[500px] bg-[#F7F2EB]'>

        {/* Background Image  */}
        <img
  src="https://plus.unsplash.com/premium_photo-1681830739666-0593043b51e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="fashion"
  className="w-full h-full object-cover"
/>

        {/* overlay  */}

        <div className='absolute inset-0 bg-black/30'></div>

        {/* content  */}
        <div className='absolute inset-0 flex flex-col justify-center items-start px-12 text-white'> 

            <h1 className='text-4xl font-bold mb-4'>Discover your style</h1>

            <p className='text-lg mb-6 max-w-md'>Explore latest trends in clothing, footware and makeup</p>

            <button className='bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition' onClick={()=>navigate("/products")}>Shop now</button>
        </div>

        

    </div>

  )
}

export default Hero