import { useNavigate } from "react-router-dom";

const Blogs = () => {

  const navigate = useNavigate();

  const blogData = [
    {
      id: 1,
      title: "Top Fashion Trends In 2026",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop",
      description:
        "Discover the latest fashion trends and styles dominating 2026.",
    },

    {
      id: 2,
      title: "Luxury Watches Collection",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1600&auto=format&fit=crop",
      description:
        "Explore premium luxury watches and timeless accessories.",
    },

    {
      id: 3,
      title: "Best Makeup Products For Women",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
      description:
        "Top beauty and makeup products every woman should own.",
    },

    {
      id: 4,
      title: "Modern Streetwear Fashion",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
      description:
        "Streetwear trends redefining modern fashion culture.",
    },

    {
      id: 5,
      title: "Perfect Shoes For Every Outfit",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
      description:
        "Find the perfect shoes matching every style and occasion.",
    },

    {
      id: 6,
      title: "Elegant Jewelry Styling Guide",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1600&auto=format&fit=crop",
      description:
        "How to style elegant jewelry with modern fashion outfits.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-6 md:px-12 pb-16">

      {/* HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Fashion Stories
        </p>

        <h1 className="text-5xl font-bold text-[#75232B]">
          Latest Blogs
        </h1>

      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogData.map((blog) => (

          <div
            key={blog.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[280px] object-cover transition duration-500 group-hover:scale-110"
              />

            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h2 className="text-2xl font-bold text-[#75232B] mb-4">
                {blog.title}
              </h2>

              <p className="text-gray-600 leading-7">
                {blog.description}
              </p>

              <button
                className="mt-6 text-[#75232B] font-semibold hover:underline"
              >
                Read More →
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;