import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // UNIQUE CATEGORY DATA
  const categoryMap = {};

  items.forEach((item) => {
    const categoryKey = item.category?.toLowerCase();

    if (
      categoryKey &&
      !categoryMap[categoryKey]
    ) {
      categoryMap[categoryKey] = item;
    }
  });

  const categories = Object.values(categoryMap);

  

  return (
    // bg-[#F5F4F2]
    <div className="px-6 md:px-10 py-14 bg-[#F5F4F2]">

      {/* TITLE */}
      <h2 className="text-4xl font-bold text-center text-[#75232B] mb-10 tracking-wide">
        Shop By Category
      </h2>
      

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
    
        {categories.map((item, index) => (
        
          <div
            key={index}
            onClick={() =>
              navigate(
                `/products/${item.category.toLowerCase()}`
              )
            }
            className="relative h-[340px] overflow-hidden rounded-3xl cursor-pointer group shadow-lg"
          >

            {/* MAIN IMAGE */}
            <img
              src={
                item.image ||
                "https://via.placeholder.com/500"
              }
              alt={item.category}
              className="
              absolute inset-0
              w-full h-full
              object-cover
              transition-all duration-700
              group-hover:opacity-0
              group-hover:scale-110
              "
            />

            {/* HOVER IMAGE */}
            <img
              src={
                item.hoverImage ||
                item.image ||
                "https://via.placeholder.com/500"
              }
              alt={item.category}
              className="
              absolute inset-0
              w-full h-full
              object-cover
              opacity-0
              transition-all duration-700
              group-hover:opacity-100
              group-hover:scale-110
              "
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* TEXT */}
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/90 to-transparent">

              <h3 className="text-white text-2xl font-semibold text-center uppercase tracking-wider">
                {item.category}
              </h3>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;