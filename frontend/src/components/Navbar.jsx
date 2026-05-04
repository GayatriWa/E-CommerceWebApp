import React, { useState, useEffect } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {FaSearch, FaHeart, FaUser, FaShoppingBag} from "react-icons/fa"


const Navbar = () => {

  const [open, setOpen ] = useState(false)
 const navigate =  useNavigate()

 const token = localStorage.getItem("token")

 const handleLogout = () =>{
  localStorage.removeItem("token")
  navigate("/")
 }

 const handleOrders = () => {
    if (!token) {
      navigate("/"); // go to login
    } else {
      navigate("/orders");
    }
  };

  useEffect(() => {
  const handleClickOutside = () => {
    setOpen(false);
  };

  window.addEventListener("click", handleClickOutside);

  return () => window.removeEventListener("click", handleClickOutside);
}, []);

  return (

    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-4 bg-gray-800/60 backdrop-blur-md text-gray-200">

      {/* Left side */}
        <h1 className='text-2xl font-bold cursor-pointer tracking-wide' onClick={()=>navigate("/")}>WOMEN's</h1>

        {/* Center Menu  */}

        <div className='flex gap-8 font-medium'>
          <p onClick={()=>navigate("/")} className="cursor-pointer text-white/80 hover:text-white transition duration-100"> Home </p>
          <p className="cursor-pointer text-white/80 hover:text-white transition duration-100"> Clothing </p>
          <p className="cursor-pointer text-white/80 hover:text-white transition duration-100">Footware</p>
          <p className="cursor-pointer text-white/80 hover:text-white transition duration-100"> MakeUp</p>
        </div>

         
        <div className='relative flex items-center gap-6 text-lg'>
            {/* Right side icons */}
           <FaSearch className="cursor-pointer  text-white/80 hover:text-white transition duration-100" />
          <FaHeart className="cursor-pointer  text-white/80 hover:text-white transition duration-100"/>

          {/* Profile Icon */}
           <FaUser
        onClick={(e) =>{e.stopPropagation(); setOpen(!open)}}
        className="cursor-pointer text-lg  text-white/80 hover:text-white transition duration-100"/>

       <FaShoppingBag onClick={()=>navigate("/cart")} className="cursor-pointer  text-white/80 hover:text-white transition duration-100" />


            {/* Dropdown */}
            {open && (
                 <div className="absolute right-0 top-full pt-2 w-40">
                  <div className="bg-white text-black rounded shadow-lg">

              {!token ?(
                <>
                  <p onClick={()=>navigate("/")}
                  className ="px-4 py-2 hover:bg-gray-200 cursor-pointer">Login</p>

                  <p onClick={()=>navigate("/register")}
                    className ="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >Sign Up</p>

                  <p onClick={handleOrders} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                Orders
              </p>
                </>

              ):(
                <>
                  <p onClick={()=>navigate("/orders")}
                  className ="px-4 py-2 hover:bg-gray-200 cursor-pointer">Orders</p>

                <p onClick={()=>navigate("/profile")}
                  className ="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >Edit Profile</p>

                <p onClick={handleLogout}
                  className ="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500"
                >Logout</p>
                </>
              )}
              <p
                onClick={() => navigate("/contact")}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Contact Us
              </p>

              </div>
            </div>
            )}
        </div>
        
        </nav>




        
  )
}

export default Navbar