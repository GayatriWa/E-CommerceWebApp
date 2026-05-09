import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  removeFromFavorite,
} from "../redux/slices/favoriteSlice";

import { FaHeart } from "react-icons/fa";

const Favorites = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-10 pb-16">

      {/* TITLE */}
      <div className="text-center mb-12">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Saved Collection
        </p>

        <h2 className="text-4xl font-bold text-[#75232B]">
          My Favorites
        </h2>

      </div>

      {/* EMPTY STATE */}
      {favoriteItems.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <FaHeart className="text-6xl text-[#75232B]/30 mb-6" />

          <h2 className="text-2xl font-bold text-[#75232B] mb-2">
            No Favorites Yet
          </h2>

          <p className="text-gray-500">
            Save your favorite products here ❤️
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {favoriteItems.map((item) => (

            <div
              key={item._id}
              className="group cursor-pointer"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-3xl shadow-lg">

                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() =>
                    navigate(`/product/${item._id}`)
                  }
                  className="w-full h-[350px] object-cover transition duration-500 group-hover:scale-105"
                />

                {/* REMOVE BUTTON */}
                <button
                  onClick={() =>
                    dispatch(removeFromFavorite(item._id))
                  }
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md"
                >
                  <FaHeart className="text-red-500 text-lg" />
                </button>

              </div>

              {/* DETAILS */}
              <div className="mt-4">

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
      )}
    </div>
  );
};

export default Favorites;