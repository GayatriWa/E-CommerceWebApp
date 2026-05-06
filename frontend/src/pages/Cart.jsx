import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../redux/slices/cartSlice'
import axios from "axios"

const Cart = () => {
    const dispatch = useDispatch()
    const {items, loading} = useSelector((state)=>state.cart)

    useEffect(()=>{
        dispatch(fetchCart())
    },[dispatch])

    if(loading) return <h2>Loading ...</h2>


    const handleRemove = async (id)=>{
        try {
            const token = localStorage.getItem("token")

            await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${id}`,{
                
            headers:{
            Authorization: `Bearer ${token}`
            }

            })

            alert("cart Remove");

            dispatch(fetchCart())

        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateQty = async (id, newQty)=>{

        try {
            const token = localStorage.getItem("token")

        await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/${id}`,
            {
                quantity:newQty,
            },
            {
                 headers:{
                    Authorization: `Bearer ${token}`
            }
            }
        )

            dispatch(fetchCart())
        } catch (error) {
            console.log(error)
        }    
    
    }

    const handleOrder = async () =>{
        try {
            const token = localStorage.getItem("token")
            console.log("🔥 PLACE ORDER CLICKED");
            console.log(import.meta.env.VITE_API_URL)

            const res = await axios.post( `${import.meta.env.VITE_API_URL}/api/orders/create`,
                {},
    
                {
                 headers:{
                    Authorization: `Bearer ${token}`
                    }
                }
                
                
            )

            alert("Order place succesfully")

            dispatch(fetchCart())
        } catch (error) {
            console.log(error)
            alert("Error placing order")
        }
    }

  return (
    <div className='p-6'>
        <h2 className='text-2xl mb-6 font-bold'>Cart</h2>

        {items.length === 0?(
            <p>no item in the cart</p>
        ):(
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {items.map((item)=>(
                    <div
                                key={item._id}
                                className="border p-4 rounded-lg flex flex-col gap-3 shadow bg-white"
                                >
                                {/* 🔥 IMAGE + NAME */}
                                <div className="flex items-center gap-4">

                                    <img
                                    src={item.product?.image || "https://via.placeholder.com/100"}
                                    alt={item.product?.name}
                                    className="w-20 h-20 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/100";
                                    }}
                                    />

                                    <div>
                                    <h3 className="font-semibold text-lg">
                                        {item.product?.name || "No name"}
                                    </h3>

                                    <p className="text-gray-600">
                                        ₹{item.product?.price || "0"}
                                    </p>
                                    </div>
                                </div>

                                {/* 🔥 QTY */}
                                <p>QTY: {item.quantity}</p>

                                {/* 🔥 BUTTONS */}
                                <div className="flex items-center gap-3">
                                    <button
                                    onClick={() =>
                                        handleUpdateQty(item._id, Math.max(1, item.quantity - 1))
                                    }
                                    className="bg-gray-300 px-2 rounded"
                                    >
                                    -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                    onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                                    className="bg-gray-300 px-2 rounded"
                                    >
                                    +
                                    </button>
                                </div>

                                {/* 🔥 REMOVE */}
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="mt-4 text-white w-fit px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>


                             {items.length > 0 && (
                                 <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={handleOrder}
                                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                                        >
                                        Place Order
                                    </button>
                                </div>
                             )}
                    </div>
                  
                ))}
            </div>
        )}
    </div>
  )
}

export default Cart