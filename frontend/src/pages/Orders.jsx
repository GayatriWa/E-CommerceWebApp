import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "../redux/slices/orderSlice"


const Orders = () => {
 const dispatch = useDispatch()
 const {items, loading} = useSelector((state)=>state.orders)

 useEffect(()=>{
  dispatch(fetchOrders())
 },[dispatch])
 
 if(loading) return <h2>Loading ...</h2>
 console.log(items);
 console.log(items[0]?.items);

  return (
    <div className="p-6 bg-[#F5F4F2]">
  <h2 className="text-4xl font-bold text-center text-[#75232B] mb-10 tracking-wide">My Orders</h2>

  {items.length === 0 ? (
    <p>No orders found</p>
  ) : (
    <div className="space-y-6">
      {items.map((order) => (
        <div
          key={order._id}
          className="border p-5 rounded-xl shadow bg-white"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold">
              Order ID: {order._id.slice(-6)}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Items */}
          <div className="border-t pt-3 space-y-3">
  {order.items.map((item, index) => (
  <div
    key={index}
    className="flex items-center justify-between"
  >
    {/* LEFT: Image + Details */}
    <div className="flex items-center gap-4">
      
      <img
        src={item.image || "https://via.placeholder.com/80"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/80")
        }
      />

      <div>
        <p className="font-medium">
          {item.name || "No name"}
        </p>

        <p className="text-sm text-gray-500">
          ₹{item.price || 0}
        </p>
      </div>
    </div>

    {/* RIGHT: Quantity */}
    <p className="font-semibold">
      x {item.quantity}
    </p>
  </div>
  ))}
</div>

          {/* Total */}
          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <p>Total</p>
            <p>₹{order.totalAmount}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )
}

export default Orders