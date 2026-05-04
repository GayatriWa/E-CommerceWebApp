import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/slices/authSlice'

const Login = () => {

    const {register, handleSubmit}= useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,data)

            const token  = res.data.token
            dispatch(setToken(token))
            localStorage.setItem("token", token)
            navigate("/products")

        } catch (error) {
            console.log(error.response?.data || error.message)
        } 
    }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <form onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-8 rounded-2xl shadow-lg w-80'>
            <input type="email"
            placeholder='Enter a Email'
            {...register("email")} 

            className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input type="password"
            placeholder='********'
            {...register("password")} 

            className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>

            <p className='text-sm text-center mt-4'>dont have an account ?{""}
                <span className='text-blue-500 cursor-pointer' onClick={()=> navigate("/register")}>Register</span>
            </p>
        </form>

    </div>
  )
}

export default Login