import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [isFavorite, setIsFavorite] =
    useState(false);

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        setProduct(res.data.product);

      } catch (error) {

        console.log(error);
      }
    };

    fetchProduct();

  }, [id]);

  // FAVORITE
  const toggleFavorite = () => {

    setIsFavorite(!isFavorite);

    if (!isFavorite) {

      toast.success("Added to favorites ❤️");

    } else {

      toast("Removed from favorites");
    }
  };

  // ADD TO CART
  const handleAddToCart = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        toast.error("Please login first");

        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          product: product._id,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart ❤️");

    } catch (error) {

      console.log(error);

      toast.error("Failed to add cart");
    }
  };

  // LOADING
  if (!product) {

    return (

      <div className="min-h-screen bg-[#F5F4F2] pt-32 flex justify-center">

        <h2 className="text-2xl font-semibold text-[#75232B] animate-pulse">
          Loading Product...
        </h2>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-10 pb-16">

      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT IMAGE */}
        <div className="relative overflow-hidden rounded-3xl shadow-lg group">

          {/* MAIN IMAGE */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[650px] object-cover transition duration-700 group-hover:opacity-0"
          />

          {/* HOVER IMAGE */}
          <img
            src={product.hoverImage || product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-700"
          />

          {/* FAVORITE */}
          <button
            onClick={toggleFavorite}
            className="absolute top-6 right-6 bg-white p-4 rounded-full shadow-lg"
          >

            {isFavorite ? (

              <FaHeart className="text-red-500 text-xl" />

            ) : (

              <FaRegHeart className="text-xl" />

            )}

          </button>

        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center">

          {/* CATEGORY */}
          <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-3">

            {product.category}

          </p>

          {/* NAME */}
          <h2 className="text-4xl font-bold text-[#75232B] mb-4">

            {product.name}

          </h2>

          {/* PRICE */}
          <p className="text-3xl font-semibold text-[#75232B] mb-6">

            ₹{product.price}

          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-8 mb-8">

            {product.description}

          </p>

          {/* SIZE */}
          <div className="mb-8">

            <h3 className="font-semibold mb-4">
              Select Size
            </h3>

            <div className="flex gap-4">

              {["S", "M", "L", "XL"].map((size) => (

                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`w-12 h-12 rounded-full border transition
                    ${
                      selectedSize === size
                        ? "bg-[#75232B] text-white"
                        : "bg-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-5 mb-8">

            <button
              onClick={() =>
                setQty(qty > 1 ? qty - 1 : 1)
              }
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              -
            </button>

            <span className="text-2xl font-semibold">
              {qty}
            </span>

            <button
              onClick={() =>
                setQty(qty + 1)
              }
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              +
            </button>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="bg-[#75232B] hover:bg-[#5d1d24] text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
          >
            Add To Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;