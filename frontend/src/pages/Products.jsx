import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  // 🔥 Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔥 Loading & Error handling
  if (loading) return <h2 className="p-6">Loading...</h2>;
  if (error) return <h2 className="p-6">Error: {error}</h2>;

  // 🔥 Filter products based on category
  const filteredProducts = items.filter((item) => {
    if (!category) return true;

    return (
      item.category &&
      item.category.toLowerCase().trim() ===
        category.toLowerCase().trim()
    );
  });

  // 🔥 Add to cart
  const handleAddToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
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

    alert("Added to cart ✅");
  } catch (error) {
    console.log("CART ERROR:", error.response?.data || error);
    alert("Error adding to cart");
  }
};



  return (
    <div className="p-6">
      {/* 🔥 Title */}
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {category ? `${category} Products` : "All Products"}
      </h2>

      {/* 🔥 No data */}
      {filteredProducts.length === 0 && (
        <p>No products found</p>
      )}

      {/* 🔥 Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            {/* ✅ IMAGE */}
            <img
              src={item.image || "https://via.placeholder.com/300"}
              alt={item.name}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300")
              }
              className="h-[200px] w-full object-cover rounded"
              onClick={() => navigate(`/product/${item._id}`)}
            />

            {/* ✅ DETAILS */}
            <h3 className="text-lg font-semibold mt-2">
              {item.name}
            </h3>

            <p className="text-gray-600">₹{item.price}</p>

            <p className="text-sm text-gray-500">
              {item.category}
            </p>

            {/* ✅ BUTTON */}
            <button
              onClick={() => handleAddToCart(item._id)}
              className="mt-4 text-white w-full py-2 bg-green-500 rounded hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;