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

  return (
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-6">My Orders</h2>

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
          <div className="border-t pt-3 space-y-2">
            {order.items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between"
              >
                <p>{item.product.name}</p>
                <p>x {item.quantity}</p>
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