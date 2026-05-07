import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToFavorite,
  removeFromFavorite,
} from "../redux/slices/favoriteSlice";

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

const isFavorite = (id) => {
  return favoriteItems.some(
    (item) => item._id === id
  );
};

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
    <div className="p-6 bg-[#F5F4F2]">
      {/* 🔥 Title */}
      <h2 className="text-4xl font-bold text-center text-[#75232B] mb-10 tracking-wide">
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
    className="relative border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer bg-white"
  >

    {/* ❤️ FAVORITE BUTTON */}
    <button
      onClick={(e) => {
        e.stopPropagation();

        if (isFavorite(item._id)) {
          dispatch(removeFromFavorite(item._id));
        } else {
          dispatch(addToFavorite(item));
        }
      }}
      className="absolute top-6 right-6 z-10 bg-white p-2 rounded-full shadow-md"
    >
      {isFavorite(item._id) ? (
        <FaHeart className="text-red-500 text-lg" />
      ) : (
        <FaRegHeart className="text-lg" />
      )}
    </button>

    {/* IMAGE */}
    <img
      src={item.image || "https://via.placeholder.com/300"}
      alt={item.name}
      onError={(e) =>
        (e.target.src = "https://via.placeholder.com/300")
      }
      className="h-[260px] w-full object-cover rounded"
      onClick={() => navigate(`/product/${item._id}`)}
    />

    {/* DETAILS */}
    <h3 className="text-lg font-semibold mt-3">
      {item.name}
    </h3>

    <p className="text-gray-600">
      ₹{item.price}
    </p>

    <p className="text-sm text-gray-500">
      {item.category}
    </p>

    {/* ADD TO CART */}
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