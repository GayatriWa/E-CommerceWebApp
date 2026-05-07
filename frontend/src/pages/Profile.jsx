import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });

      } catch (error) {

        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Profile Updated Successfully ❤️");
  };

  return (
    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-6 md:px-12 pb-16">

      {/* HEADER */}
      <div className="text-center mb-12">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          My Account
        </p>

        <h1 className="text-5xl font-bold text-[#75232B]">
          Edit Profile
        </h1>

      </div>

      {/* PROFILE CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop"
            alt="profile"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute bottom-10 left-10 text-white">

            <h2 className="text-4xl font-bold mb-2">
              StyleAura
            </h2>

            <p className="text-lg">
              Fashion For Every Style
            </p>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-[#75232B] mb-8">
            Personal Information
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-[#75232B]"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-[#75232B]"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-[#75232B]"
              />

            </div>

            {/* ADDRESS */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-[#75232B]"
              ></textarea>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#75232B] text-white py-4 rounded-xl hover:bg-[#5d1d24] transition duration-300"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Profile;