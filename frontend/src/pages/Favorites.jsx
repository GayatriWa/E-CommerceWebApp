import { useSelector } from "react-redux";

const Favorites = () => {

  const favoriteItems = useSelector(
    (state) => state.favorite.items
  );

  return (
    <div className="pt-28 px-10 bg-[#F5F4F2] min-h-screen">

      <h2 className="text-4xl font-bold text-center text-[#75232B] mb-10 tracking-wide">
        My Favorites
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {favoriteItems.map((item) => (

          <div key={item._id}>

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[320px] object-cover rounded-3xl"
            />

            <h3 className="mt-4 font-semibold">
              {item.name}
            </h3>

            <p>₹{item.price}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;