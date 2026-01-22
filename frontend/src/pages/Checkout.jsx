import React from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";

const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 flex justify-center items-center p-6">
      <div
        className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <IoIosArrowRoundBack size={30} />
        <h2 className="text-md sm:text-xl">Back</h2>
      </div>
      <div className="w-full max-w-225 bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-black font-bold text-2xl">Checkout</h1>
        <section>
          <h1 className="flex text-gray-800 text-xl font-sans font-semibold items-center gap-2 mb-3">
            <FaLocationDot size={16} className="text-green-600" />
            Delivery Location
          </h1>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter your delivery address..."
              className="flex-1 border border-gray-400 rounded-lg focus:outline:none focus:ring-green-600 focus:ring-2 p-2 text-black font-serif"
            />
            <button className="py-2 px-3.5 bg-green-500 hover:bg-green-600 rounded-lg text-white flex items-center justify-center cursor-pointer">
              <FaSearch size={16} />
            </button>
            <button className="py-2 px-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white flex items-center justify-center cursor-pointer">
              <BiCurrentLocation size={21} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
