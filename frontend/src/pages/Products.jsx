import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import axios from "axios"

const Products = () => {

   const dispatch = useDispatch()
   const {items, loading , error} = useSelector((state) => state.products)

   useEffect(()=>{
    dispatch(fetchProducts())
   },[dispatch])

   if(loading) return <h2>Loading ...</h2>
   if(error) return <h2>Error: {error}</h2>


   const handleAddToCart = async (productId)=>{
    try {
        const token = localStorage.getItem("token")
        console.log(token)

        const res = await axios.post("http://localhost:5000/api/cart/add", {
            product: productId ,
            quantity:1,
        },{
            headers:{
            Authorization: `Bearer ${token}`
        }
        }
    )

        
        alert("Added to cart ✅");
    } catch (error) {
        console.log(error)
    }
   }

   

  return (
    <div className='p-6'>
        <h2 className='text-2xl font-bold mb-6'>Products</h2>

        <div className='grid grid-cols-5 gap-6'>
            {items.map((item)=>(
                <div key={item._id} className='border p-4 rounded-lg shadow'>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    <p>₹{item.price}</p>
                    <p className='text-sm text-gray-500'>{item.category}</p>
                    <button onClick={()=>handleAddToCart(item._id)} className='mt-4 text-white w-full py-2 bg-green-500 rounded hover:bg-green-600'>Add to Cart</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products