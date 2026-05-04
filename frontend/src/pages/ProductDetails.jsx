import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // 🔥 FETCH PRODUCT BY ID
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

  if (!product) return <h2 className="p-6">Loading...</h2>;

  const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/cart/add",
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

    alert("Added to cart ✅");
  } catch (error) {
    console.log("CART ERROR:", error.response?.data || error);
    alert("Error adding to cart");
  }
};

  return (
    <div className="pt-20 p-8">
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* LEFT */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded"
        />

        {/* RIGHT */}
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-2xl text-green-600 mt-2">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 py-1 bg-gray-300"
            >
              -
            </button>

            <span>{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;