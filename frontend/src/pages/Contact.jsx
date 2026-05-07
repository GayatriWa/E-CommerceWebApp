import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully ❤️");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F4F2] pt-28 px-6 md:px-16 pb-16">

      {/* HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Get In Touch
        </p>

        <h1 className="text-5xl font-bold text-[#75232B]">
          Contact Us
        </h1>

      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="overflow-hidden rounded-3xl shadow-lg">

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
            alt="contact"
            className="w-full h-[650px] object-cover"
          />

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-10 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold text-[#75232B] mb-8">
            Send Message
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
                required
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
                required
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-[#75232B]"
              />

            </div>

            {/* MESSAGE */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Message
              </label>

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-[#75232B]"
              ></textarea>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#75232B] text-white py-4 rounded-xl hover:bg-[#5d1b22] transition duration-300"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Contact;