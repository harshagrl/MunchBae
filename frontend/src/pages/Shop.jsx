import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router";
import { FaStore, FaUtensils, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiClock, FiMapPin } from "react-icons/fi";
import FoodCard from "../components/FoodCard";
import NavBar from "../components/NavBar";

function Shop() {
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { shopId } = useParams();
  const navigate = useNavigate();

  const handleShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/get-item-by-shop/${shopId}`,
        { withCredentials: true },
      );
      setShop(result.data.shop);
      setItems(result.data.items);
      setTimeout(() => setIsLoaded(true), 100);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);

  const vegCount = items.filter((i) => i.foodType === "Veg").length;
  const nonVegCount = items.filter((i) => i.foodType !== "Veg").length;

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* NavBar */}
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      {/* Hero Banner */}
      {shop && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <img
            src={shop.image}
            alt={shop.name}
            className={`w-full h-full object-cover transition-transform duration-[1500ms] ${isLoaded ? "scale-100" : "scale-110"}`}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8] via-black/40 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

          {/* Back Button */}
          <button
            className="absolute top-6 left-6 z-10 flex items-center gap-1 cursor-pointer text-white bg-white/15 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white/25 transition-all duration-300 shadow-lg border border-white/20"
            onClick={() => navigate("/home")}
          >
            <IoIosArrowRoundBack size={26} />
            <span className="text-sm font-semibold">Back</span>
          </button>

          {/* Shop Info Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end gap-5">
              {/* Shop Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center border border-white/50 flex-shrink-0">
                <FaStore className="text-[#e84c3d] text-3xl md:text-4xl" />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
                  {shop.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-white/90">
                    <FiMapPin className="text-[#e84c3d]" size={16} />
                    <span className="text-sm font-medium">{shop.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/90">
                    <FiClock className="text-amber-300" size={16} />
                    <span className="text-sm font-medium">Open Now</span>
                  </div>
                </div>
              </div>

              {/* Stats badges */}
              <div className="hidden md:flex items-center gap-3">
                <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                  <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider">Items</p>
                  <p className="text-white text-xl font-extrabold">{items.length}</p>
                </div>
                {vegCount > 0 && (
                  <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                    <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider">Veg</p>
                    <p className="text-emerald-300 text-xl font-extrabold">{vegCount}</p>
                  </div>
                )}
                {nonVegCount > 0 && (
                  <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/20">
                    <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider">Non-Veg</p>
                    <p className="text-red-300 text-xl font-extrabold">{nonVegCount}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Stats Row */}
      {shop && (
        <div className="md:hidden max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 text-center">
              <p className="text-[#6b6b6b] text-[10px] font-semibold uppercase tracking-wider">Items</p>
              <p className="text-[#2d2d2d] text-xl font-extrabold">{items.length}</p>
            </div>
            {vegCount > 0 && (
              <div className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 text-center">
                <p className="text-[#6b6b6b] text-[10px] font-semibold uppercase tracking-wider">Veg</p>
                <p className="text-emerald-600 text-xl font-extrabold">{vegCount}</p>
              </div>
            )}
            {nonVegCount > 0 && (
              <div className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 text-center">
                <p className="text-[#6b6b6b] text-[10px] font-semibold uppercase tracking-wider">Non-Veg</p>
                <p className="text-red-500 text-xl font-extrabold">{nonVegCount}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-16">
        {/* Section Header */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div>
            <span className="inline-block bg-[#e84c3d]/10 text-[#e84c3d] text-xs font-semibold px-3 py-1 rounded-full mb-2">
              Our Menu
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d]">
              Explore <span className="text-[#e84c3d]">Dishes</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[#6b6b6b]">
            <FaUtensils className="text-[#e84c3d]" size={16} />
            <span className="text-sm font-medium">{items.length} items available</span>
          </div>
        </div>

        {/* Food Grid */}
        {items.length > 0 ? (
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {items.map((item, index) => (
              <div
                key={index}
                className="transition-all duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FoodCard data={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-lg flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
            <p className="text-xl font-bold text-[#2d2d2d] mb-2">No items available</p>
            <p className="text-[#6b6b6b] text-sm max-w-sm mx-auto">
              This shop hasn't added any items yet. Check back later for delicious offerings!
            </p>
            <button
              className="mt-6 px-6 py-2.5 bg-[#e84c3d] text-white rounded-full text-sm font-semibold hover:bg-[#d44235] transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-red-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Browse Other Shops
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
