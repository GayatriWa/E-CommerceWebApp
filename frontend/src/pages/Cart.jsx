import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../redux/slices/cartSlice";

import axios from "axios";

import toast from "react-hot-toast";

const Cart = () => {

  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.cart
  );

  const [ordering, setOrdering] = useState(false);

  useEffect(() => {

    dispatch(fetchCart());

  }, [dispatch]);

  // TOTAL PRICE
  const totalPrice = items.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity,
    0
  );

  // REMOVE ITEM
  const handleRemove = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Item removed from cart"
      );

      dispatch(fetchCart());

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to remove item"
      );
    }
  };

  // UPDATE QUANTITY
  const handleUpdateQty = async (
    id,
    newQty
  ) => {

    if (newQty < 1) return;

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cart/${id}`,
        {
          quantity: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchCart());

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update quantity"
      );
    }
  };

  // PLACE ORDER
  const handleOrder = async () => {

    try {

      setOrdering(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/create`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Order placed successfully ❤️"
      );

      dispatch(fetchCart());

    } catch (error) {

      console.log(error);

      toast.error(
        "Error placing order"
      );

    } finally {

      setOrdering(false);
    }
  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-[#F5F4F2] pt-32 flex justify-center">

        <h2 className="text-2xl font-semibold text-[#75232B] animate-pulse">
          Loading Cart...
        </h2>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-8 pb-16">

      {/* TITLE */}
      <div className="text-center mb-12">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Shopping Bag
        </p>

        <h2 className="text-4xl font-bold text-[#75232B]">
          My Cart
        </h2>

      </div>

      {/* EMPTY CART */}
      {items.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty cart"
            className="w-40 mb-6 opacity-70"
          />

          <h2 className="text-2xl font-bold text-[#75232B] mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500">
            Add your favorite products to cart
          </p>

        </div>

      ) : (

        <>
          {/* CART GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {items.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={
                      item.product?.image ||
                      "https://via.placeholder.com/300"
                    }
                    alt={item.product?.name}
                    className="w-full h-[260px] object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300";
                    }}
                  />

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h3 className="text-xl font-bold text-[#75232B] mb-2">

                    {item.product?.name ||
                      "No Product"}

                  </h3>

                  <p className="text-gray-600 mb-4">

                    ₹{item.product?.price || 0}

                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          handleUpdateQty(
                            item._id,
                            item.quantity - 1
                          )
                        }
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        -
                      </button>

                      <span className="font-semibold text-lg">

                        {item.quantity}

                      </span>

                      <button
                        onClick={() =>
                          handleUpdateQty(
                            item._id,
                            item.quantity + 1
                          )
                        }
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        handleRemove(item._id)
                      }
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-12 bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-6">

            <div>

              <p className="text-gray-500 mb-2">
                Total Amount
              </p>

              <h2 className="text-4xl font-bold text-[#75232B]">

                ₹{totalPrice}

              </h2>

            </div>

            {/* ORDER BUTTON */}
            <button
              onClick={handleOrder}
              disabled={ordering}
              className="bg-[#75232B] hover:bg-[#5d1d24] text-white px-10 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg disabled:opacity-60"
            >

              {ordering
                ? "Processing..."
                : "Place Order"}

            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;