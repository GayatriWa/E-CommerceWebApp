import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/slices/productSlice";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import {
  addToFavorite,
  removeFromFavorite,
} from "../redux/slices/favoriteSlice";

import toast from "react-hot-toast";

const Products = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { category } = useParams();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  // FETCH PRODUCTS
  useEffect(() => {

    dispatch(fetchProducts());

  }, [dispatch]);

  // FAVORITE CHECK
  const isFavorite = (id) => {

    return favoriteItems.some(
      (item) => item._id === id
    );
  };

  // FILTER PRODUCTS
  const filteredProducts = items.filter((item) => {

    if (!category) return true;

    return (
      item.category &&
      item.category.toLowerCase().trim() ===
        category.toLowerCase().trim()
    );
  });

  // ADD TO CART
  const handleAddToCart = async (productId) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        toast.error("Please login first");

        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart ❤️");

    } catch (error) {

      console.log(
        "CART ERROR:",
        error.response?.data || error
      );

      toast.error("Failed to add cart");
    }
  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-[#F5F4F2] pt-32 flex justify-center">

        <h2 className="text-2xl font-semibold text-[#75232B] animate-pulse">
          Loading Products...
        </h2>

      </div>
    );
  }

  // ERROR
  if (error) {

    return (

      <div className="min-h-screen bg-[#F5F4F2] pt-32 flex justify-center">

        <h2 className="text-xl text-red-500">
          {error}
        </h2>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-10 pb-16">

      {/* TITLE */}
      <div className="text-center mb-12">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          StyleAura Collection
        </p>

        <h2 className="text-4xl font-bold text-[#75232B] tracking-wide capitalize">
          {category
            ? `${category} Products`
            : "All Products"}
        </h2>

      </div>

      {/* EMPTY */}
      {filteredProducts.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-20">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="empty"
            className="w-32 opacity-70 mb-5"
          />

          <h2 className="text-2xl font-bold text-[#75232B] mb-2">
            No Products Found
          </h2>

          <p className="text-gray-500">
            Try another category
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredProducts.map((item) => (

            <div
              key={item._id}
              className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group cursor-pointer"
            >

              {/* FAVORITE */}
              <button
                onClick={(e) => {

                  e.stopPropagation();

                  if (isFavorite(item._id)) {

                    dispatch(
                      removeFromFavorite(item._id)
                    );

                    toast("Removed from favorites");

                  } else {

                    dispatch(
                      addToFavorite(item)
                    );

                    toast.success(
                      "Added to favorites ❤️"
                    );
                  }
                }}
                className="absolute top-5 right-5 z-20 bg-white p-3 rounded-full shadow-md"
              >

                {isFavorite(item._id) ? (

                  <FaHeart className="text-red-500 text-lg" />

                ) : (

                  <FaRegHeart className="text-lg" />

                )}

              </button>

              {/* IMAGE */}
              <div
                onClick={() =>
                  navigate(`/product/${item._id}`)
                }
                className="relative overflow-hidden"
              >

                {/* MAIN IMAGE */}
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={item.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300")
                  }
                  className="w-full h-[350px] object-cover transition duration-700 group-hover:opacity-0"
                />

                {/* HOVER IMAGE */}
                <img
                  src={
                    item.hoverImage ||
                    item.image
                  }
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
                />

              </div>

              {/* DETAILS */}
              <div className="p-5">

                <h3 className="text-lg font-semibold text-[#75232B]">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  ₹{item.price}
                </p>

                <p className="text-sm text-gray-400 mt-1 uppercase">
                  {item.category}
                </p>

                {/* ADD TO CART */}
                <button
                  onClick={() =>
                    handleAddToCart(item._id)
                  }
                  className="mt-5 w-full bg-[#75232B] hover:bg-[#5d1d24] text-white py-3 rounded-2xl transition duration-300"
                >
                  Add To Cart
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;