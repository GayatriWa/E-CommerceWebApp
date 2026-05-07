const PromoBanner = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">

      {/* IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
        alt="fashion"
        className="w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* TEXT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">

        <p className="uppercase tracking-[6px] mb-4 text-sm">
          New Collection
        </p>

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Fashion Sale
        </h2>

        <p className="max-w-xl text-lg mb-8">
          Discover luxury fashion trends and premium styles
          crafted for modern lifestyle.
        </p>

        <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition">
          Explore Now
        </button>

      </div>
    </div>
  )
}

export default PromoBanner