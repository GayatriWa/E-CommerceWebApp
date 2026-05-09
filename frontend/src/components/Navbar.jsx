import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaSearch,
  FaRegHeart,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F4F2] border-b backdrop-blur-md">

      <div className="flex justify-between items-center px-5 md:px-10 py-4 text-[#75232B]">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-bold cursor-pointer tracking-wide"
        >
          StyleAura
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 font-medium text-[15px] group">

          <p
            onClick={() => navigate("/")}
            className="cursor-pointer transition duration-300 group-hover:text-[#b38a8f] hover:!text-[#75232B]"
          >
            Home
          </p>

          <p
            onClick={() => navigate("/products")}
            className="cursor-pointer transition duration-300 group-hover:text-[#b38a8f] hover:!text-[#75232B]"
          >
            Shop
          </p>

          <p
            onClick={() => navigate("/blogs")}
            className="cursor-pointer transition duration-300 group-hover:text-[#b38a8f] hover:!text-[#75232B]"
          >
            Blogs
          </p>

          <p
            onClick={() => navigate("/contact")}
            className="cursor-pointer transition duration-300 group-hover:text-[#b38a8f] hover:!text-[#75232B]"
          >
            Contact
          </p>

        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 md:gap-7 text-lg relative">

          <FaSearch className="cursor-pointer hover:scale-110 transition hidden md:block" />

          <FaRegHeart
            onClick={() => navigate("/favorites")}
            className="cursor-pointer hover:scale-110 transition"
          />

          <FaUser
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="cursor-pointer hover:scale-110 transition"
          />

          <FaShoppingBag
            onClick={() => navigate("/cart")}
            className="cursor-pointer hover:scale-110 transition"
          />

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">

            {mobileMenu ? (

              <FaTimes
                onClick={() => setMobileMenu(false)}
                className="text-xl cursor-pointer"
              />

            ) : (

              <FaBars
                onClick={() => setMobileMenu(true)}
                className="text-xl cursor-pointer"
              />

            )}
          </div>

          {/* PROFILE DROPDOWN */}
          {open && (

            <div className="absolute right-0 top-14 w-48">

              <div className="bg-white rounded-xl shadow-xl border overflow-hidden">

                {!token ? (
                  <>
                    <p
                      onClick={() => navigate("/login")}
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Login
                    </p>

                    <p
                      onClick={() => navigate("/register")}
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Sign Up
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      onClick={() => navigate("/orders")}
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Orders
                    </p>

                    <p
                      onClick={() => navigate("/profile")}
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit Profile
                    </p>

                    <p
                      onClick={handleLogout}
                      className="px-5 py-3 hover:bg-red-50 text-red-500 cursor-pointer"
                    >
                      Logout
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (

        <div className="md:hidden bg-[#F5F4F2] border-t px-6 py-5 flex flex-col gap-5 text-[#75232B] font-medium">

          <p
            onClick={() => {
              navigate("/");
              setMobileMenu(false);
            }}
            className="cursor-pointer"
          >
            Home
          </p>

          <p
            onClick={() => {
              navigate("/products");
              setMobileMenu(false);
            }}
            className="cursor-pointer"
          >
            Shop
          </p>

          <p
            onClick={() => {
              navigate("/blogs");
              setMobileMenu(false);
            }}
            className="cursor-pointer"
          >
            Blogs
          </p>

          <p
            onClick={() => {
              navigate("/contact");
              setMobileMenu(false);
            }}
            className="cursor-pointer"
          >
            Contact
          </p>

        </div>
      )}
    </nav>
  );
};

export default Navbar;