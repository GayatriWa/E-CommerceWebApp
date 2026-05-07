import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5F4F2] text-[#75232B]  border-t">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* ONLINE SHOPPING */}
        <div>

          <h2 className="font-bold uppercase text-sm mb-5">
            Online Shopping
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">

            <li className="hover:text-[#75232B] cursor-pointer">
              Men
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Women
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Kids
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Home
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Beauty
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Genz
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Gift Cards
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Myntra Insider
            </li>

          </ul>
        </div>

        {/* USEFUL LINKS */}
        <div>

          <h2 className="font-bold uppercase text-sm mb-5">
            Useful Links
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">

            <li className="hover:text-[#75232B] cursor-pointer">
              Blog
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Careers
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Site Map
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Corporate Information
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Whitehat
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Cleartrip
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Myntra Global
            </li>

          </ul>
        </div>

        {/* CUSTOMER POLICIES */}
        <div>

          <h2 className="font-bold uppercase text-sm mb-5">
            Customer Policies
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">

            <li className="hover:text-[#75232B] cursor-pointer">
              Contact Us
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              FAQ
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              T&C
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Terms Of Use
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Track Orders
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Shipping
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Cancellation
            </li>

            <li className="hover:text-[#75232B] cursor-pointer">
              Privacy Policy
            </li>

          </ul>
        </div>

        {/* APP + SOCIAL */}
        <div>

          <h2 className="font-bold uppercase text-sm mb-5">
            Experience App
          </h2>

          <div className="flex gap-3 mb-6">

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="playstore"
              className="w-32 cursor-pointer"
            />

          </div>

          <h2 className="font-bold uppercase text-sm mb-4">
            Keep In Touch
          </h2>

          <div className="flex gap-4 text-xl">

            <FaFacebookF className="cursor-pointer hover:text-black transition" />

            <FaTwitter className="cursor-pointer hover:text-black transition" />

            <FaInstagram className="cursor-pointer hover:text-black transition" />

            <FaYoutube className="cursor-pointer hover:text-black transition" />

          </div>
        </div>

        {/* GUARANTEE */}
        <div className="space-y-6">

          <div className="flex gap-3">

            <div className="text-2xl">
              ✔
            </div>

            <p className="text-sm text-gray-600 leading-6">

              <span className="font-bold text-[#75232B]">
                100% ORIGINAL
              </span>{" "}

              guarantee for all products at StyleAura.com

            </p>

          </div>

          <div className="flex gap-3">

            <div className="text-2xl">
              ↺
            </div>

            <p className="text-sm text-gray-600 leading-6">

              <span className="font-bold text-[#75232B]">
                Return within 14 days
              </span>{" "}

              of receiving your order

            </p>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t py-5 text-center text-sm text-gray-500">

        © 2026 StyleAura. All Rights Reserved.

      </div>
    </footer>
  );
};

export default Footer;