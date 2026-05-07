import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewCollection = () => {
  const navigate = useNavigate();

  const { items } = useSelector(
    (state) => state.products
  );

  // latest 4 products
  const latestProducts = items.slice(-4).reverse();

  return (
    <div className="bg-[#F5F4F2] px-6 md:px-10 py-16">

      {/* TITLE */}
      <div className="text-center mb-12">

        <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-3">
          Latest Products
        </p>

        <h2 className="text-4xl font-bold text-[#75232B]">
          New Collection
        </h2>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {latestProducts.map((item) => (

          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="group cursor-pointer"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-3xl">

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[350px] object-cover transition duration-500 group-hover:scale-105"
              />

              {/* HOVER IMAGE */}
              <img
                src={item.hoverImage || item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
              />

            </div>

            {/* DETAILS */}
            <div className="mt-4 text-center">

              <h3 className="text-lg font-semibold text-[#75232B]">
                {item.name}
              </h3>

              <p className="text-gray-500 mt-1">
                ₹{item.price}
              </p>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollection;