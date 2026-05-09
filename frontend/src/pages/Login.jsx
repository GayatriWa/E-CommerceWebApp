import React, { useState } from "react";

import { useForm } from "react-hook-form";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setToken } from "../redux/slices/authSlice";

import toast from "react-hot-toast";

const Login = () => {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );

      const token = res.data.token;

      dispatch(setToken(token));

      localStorage.setItem("token", token);

      toast.success("Login successful ❤️");

      navigate("/products");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#F5F4F2] flex items-center justify-center px-4 md:px-10 pt-24 pb-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:block relative">

          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop"
            alt="fashion"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-12 left-10 text-white">

            <h1 className="text-5xl font-bold mb-4">
              Welcome Back
            </h1>

            <p className="text-lg max-w-sm leading-8">
              Discover premium fashion trends and
              luxury collections.
            </p>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col justify-center px-6 sm:px-8 md:px-14 py-10 md:py-14">

          {/* TITLE */}
          <div className="mb-10">

            <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
              StyleAura
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#75232B]">
              Login Account
            </h2>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 md:px-5 md:py-4 outline-none focus:border-[#75232B]"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                {...register("password")}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 md:px-5 md:py-4 outline-none focus:border-[#75232B]"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#75232B] text-white py-4 rounded-xl hover:bg-[#5d1d24] transition duration-300 disabled:opacity-60"
            >

              {loading ? "Logging in..." : "Login"}

            </button>

          </form>

          {/* REGISTER */}
          <p className="text-sm text-center mt-8 text-gray-600">

            Don’t have an account?{" "}

            <span
              onClick={() => navigate("/register")}
              className="text-[#75232B] font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>

          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;