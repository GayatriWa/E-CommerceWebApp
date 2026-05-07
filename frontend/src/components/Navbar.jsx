import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaSearch,
  FaRegHeart,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ORDERS
  const handleOrders = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/orders");
    }
  };

  // CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

  return (
    // bg-[#F5F4F2]/90
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-5 backdrop-blur-md bg-[#F5F4F2] text-[#75232B] border-b">

      {/* LOGO */}
      <h1
        className="text-3xl font-bold cursor-pointer tracking-wide"
        onClick={() => navigate("/")}
      >
        StyleAura
      </h1>

      {/* CENTER MENU */}
      <div className="flex gap-10 font-medium text-[15px] group">

        <p
          onClick={() => navigate("/")}
          className={`cursor-pointer transition duration-300
          ${
            location.pathname === "/"
              ? "text-[#75232B]"
              : "text-[#75232B]"
          }
          group-hover:text-[#b38a8f] hover:!text-[#75232B]
          `}
        >
          Home
        </p>

        <p
          onClick={() => navigate("/products")}
          className={`cursor-pointer transition duration-300
          ${
            location.pathname.includes("/products")
              ? "text-[#75232B]"
              : "text-[#75232B]"
          }
          group-hover:text-[#b38a8f] hover:!text-[#75232B]
          `}
        >
          Shop
        </p>

        <p
              onClick={() => navigate("/blogs")}
              className="cursor-pointer text-[#75232B]
              transition duration-300
              group-hover:text-[#b38a8f]
              hover:!text-[#75232B]"
            >
              Blogs
            </p>

        <p
          onClick={() => navigate("/contact")}
          className="cursor-pointer text-[#75232B]
          transition duration-300
          group-hover:text-[#b38a8f]
          hover:!text-[#75232B]"
        >
          Contact Us
        </p>

      </div>
      {/* RIGHT ICONS */}
      <div className="relative flex items-center gap-7 text-lg">

        {/* SEARCH */}
        <FaSearch className="cursor-pointer hover:scale-110 transition duration-200" />

        {/* HEART */}
        <FaRegHeart
          onClick={() => navigate("/favorites")}
          className="cursor-pointer hover:scale-110 transition"/>
              {/* USER */}
        <FaUser
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="cursor-pointer hover:scale-110 transition duration-200"
        />

        {/* CART */}
        <FaShoppingBag
          onClick={() => navigate("/cart")}
          className="cursor-pointer hover:scale-110 transition duration-200"
        />

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-full pt-4 w-48">

            <div className="bg-white text-black rounded-xl shadow-xl overflow-hidden border">

              {!token ? (
                <>
                  <p
                    onClick={() => navigate("/login")}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Login
                  </p>

                  <p
                    onClick={() => navigate("/register")}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Sign Up
                  </p>

                  <p
                    onClick={handleOrders}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Orders
                  </p>
                </>
              ) : (
                <>
                  <p
                    onClick={() => navigate("/orders")}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Orders
                  </p>

                  <p
                    onClick={() => navigate("/profile")}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Edit Profile
                  </p>

                  <p
                    onClick={handleLogout}
                    className="px-5 py-3 hover:bg-red-50 cursor-pointer text-red-500 transition"
                  >
                    Logout
                  </p>
                </>
              )}

              <p
                onClick={() => navigate("/contact")}
                className="px-5 py-3  cursor-pointer transition"
              >
                Contact Us
              </p>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;