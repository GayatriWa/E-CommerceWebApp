import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../redux/slices/orderSlice";

const Orders = () => {

  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {

    dispatch(fetchOrders());

  }, [dispatch]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-[#F5F4F2] pt-32 flex justify-center">

        <h2 className="text-2xl font-semibold text-[#75232B] animate-pulse">
          Loading Orders...
        </h2>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-10 pb-16">

      {/* HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Order History
        </p>

        <h2 className="text-4xl font-bold text-[#75232B]">
          My Orders
        </h2>

      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty"
            className="w-40 opacity-70 mb-6"
          />

          <h2 className="text-2xl font-bold text-[#75232B] mb-2">
            No Orders Yet
          </h2>

          <p className="text-gray-500">
            Your orders will appear here
          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {items.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              {/* TOP */}
              <div className="border-b px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500 mb-1">
                    Order ID
                  </p>

                  <h2 className="font-bold text-[#75232B]">
                    #{order._id.slice(-6)}
                  </h2>

                </div>

                <div>

                  <p className="text-sm text-gray-500 mb-1">
                    Date
                  </p>

                  <h2 className="font-medium">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </h2>

                </div>

                <div>

                  <p className="text-sm text-gray-500 mb-1">
                    Status
                  </p>

                  <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
                    Delivered
                  </span>

                </div>

              </div>

              {/* PRODUCTS */}
              <div className="p-6 space-y-5">

                {order.items.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border-b pb-5"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/100"
                        }
                        alt={item.name}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100";
                        }}
                        className="w-24 h-24 object-cover rounded-2xl"
                      />

                      <div>

                        <h3 className="text-lg font-semibold text-[#75232B]">
                          {item.name || "No Name"}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          ₹{item.price || 0}
                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="text-right">

                      <p className="text-sm text-gray-500 mb-1">
                        Quantity
                      </p>

                      <h2 className="font-semibold text-lg">
                        x {item.quantity}
                      </h2>

                    </div>

                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="border-t px-6 py-5 flex justify-between items-center bg-[#faf7f2]">

                <h2 className="text-xl font-bold text-[#75232B]">
                  Total Amount
                </h2>

                <h2 className="text-2xl font-bold text-[#75232B]">
                  ₹{order.totalAmount}
                </h2>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;