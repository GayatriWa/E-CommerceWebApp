import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { fetchBlogs } from "../redux/slices/blogSlice";

const Blogs = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.blogs
  );

  // FETCH BLOGS
  useEffect(() => {

    dispatch(fetchBlogs());

  }, [dispatch]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-[#F5F4F2] flex justify-center items-center">

        <h2 className="text-2xl font-semibold text-[#75232B] animate-pulse">
          Loading Blogs...
        </h2>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-12 pb-16">

      {/* HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Fashion Stories
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-[#75232B]">
          Latest Blogs
        </h1>

      </div>

      {/* EMPTY */}
      {items.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="empty"
            className="w-32 opacity-70 mb-6"
          />

          <h2 className="text-2xl font-bold text-[#75232B] mb-2">
            No Blogs Available
          </h2>

          <p className="text-gray-500">
            Blogs will appear here
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {items.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl transition duration-300"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500";
                  }}
                  className="w-full h-[280px] object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h2 className="text-2xl font-bold text-[#75232B] mb-4 leading-tight">

                  {item.title}

                </h2>

                <p className="text-gray-600 leading-7 line-clamp-3">

                  {item.description}

                </p>

                <button
                  onClick={() =>
                    navigate(`/blogs/${item._id}`)
                  }
                  className="mt-6 text-[#75232B] font-semibold hover:underline"
                >
                  Read More →
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;