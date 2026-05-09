import { useState, useEffect } from "react";

import axios from "axios";

import toast from "react-hot-toast";

const Profile = () => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // FETCH PROFILE
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

        toast.error("Failed to load profile");
      }
    };

    fetchProfile();

  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // fake delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      toast.success(
        "Profile updated successfully ❤️"
      );

    } catch (error) {

      toast.error("Update failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-4 md:px-10 pb-16">

      {/* HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          My Account
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-[#75232B]">
          Edit Profile
        </h1>

      </div>

      {/* PROFILE CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">

          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop"
            alt="profile"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-12 left-10 text-white">

            <h2 className="text-5xl font-bold mb-4">
              StyleAura
            </h2>

            <p className="text-lg max-w-sm leading-8">
              Your fashion profile and personal
              information.
            </p>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12">

          <h2 className="text-3xl font-bold text-[#75232B] mb-10">
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
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#75232B]"
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
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-xl px-5 py-4 outline-none"
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
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#75232B]"
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
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#75232B]"
              ></textarea>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#75232B] text-white py-4 rounded-xl hover:bg-[#5d1d24] transition duration-300 disabled:opacity-60"
            >

              {loading
                ? "Saving..."
                : "Save Changes"}

            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Profile;