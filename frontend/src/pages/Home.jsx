import React from 'react'
import { useNavigate } from 'react-router-dom'
import Category from '../components/Category'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from "../redux/slices/productSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


  //     useEffect(() => {
  //   console.log("DISPATCH RUNNING");   // 👈 MUST PRINT
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <div className='relative w-full h-[300px] md:h-[400px]'>

        {/* Background Image  */}
        <img src="https://images.unsplash.com/photo-1711467714592-56781075e928?q=100&w=2000&auto=format&fit=crop" 
        alt="fashion" 
        className='w-full h-full object-cover object-[50%_30%]' />

        {/* overlay  */}

        <div className='absolute inset-0 bg-black/30'></div>

        {/* content  */}
        <div className='absolute inset-0 flex flex-col justify-center items-start px-12 text-white'> 

            <h1 className='text-4xl font-bold mb-4'>Discover your style</h1>

            <p className='text-lg mb-6 max-w-md'>Explore latest trends in clothing, footware and makeup</p>

            <button className='bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition' onClick={()=>navigate("/products")}>Shop now</button>
        </div>

        <Category />

    </div>
  )
}

export default Home