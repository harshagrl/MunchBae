import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineFastfood, MdCategory } from "react-icons/md";
import { FaRupeeSign, FaImage, FaUtensils } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { serverUrl } from "../App";
import { setMyShopData } from "../store/owner.slice";

import axios from "axios";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const AddFoodItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("Veg");
  const [loading, setLoading] = useState(false);
  const categories = [
    "Snacks",
    "Fast Food",
    "Desert",
    "Pizza",
    "Burger",
    "Sandwich",
    "South Indian",
    "Meals",
    "Noodles",
    "Chinese",
    "Drinks",
  ];

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !price || !category || !backendImage) {
      toast.error("Please fill all required fields and select an image");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("foodType", foodType);
      formData.append("category", category);
      formData.append("image", backendImage);

      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        { withCredentials: true },
      );
      dispatch(setMyShopData(result.data));
      toast.success("Food item added to menu!");
      setLoading(false);
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding food item");
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      {/* ===== Full-Page Decorative Background ===== */}
      <div className="fixed inset-0 top-16 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#e84c3d]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] -right-24 w-[450px] h-[450px] bg-orange-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-[55%] -left-20 w-[400px] h-[400px] bg-amber-300/18 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-rose-300/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-[#e84c3d]/10 rounded-full blur-[100px]"></div>

        <span className="absolute top-[8%] left-[6%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>🍕</span>
        <span className="absolute top-[15%] right-[8%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🍔</span>
        <span className="absolute top-[35%] left-[3%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍩</span>
        <span className="absolute top-[50%] right-[5%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🌮</span>
        <span className="absolute top-[65%] left-[8%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🍟</span>
        <span className="absolute top-[25%] right-[3%] text-3xl opacity-25 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>🧁</span>
        <span className="absolute top-[75%] right-[7%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '2s' }}>🍰</span>
        <span className="absolute top-[80%] left-[5%] text-5xl opacity-25 animate-bounce" style={{ animationDuration: '3.6s', animationDelay: '1.2s' }}>🥤</span>

        <div className="absolute top-[10%] right-[18%] w-36 h-36 rounded-full border-[3px] border-dashed border-[#e84c3d]/20"></div>
        <div className="absolute top-[45%] left-[12%] w-28 h-28 rounded-full border-[3px] border-dashed border-orange-400/20"></div>
        <div className="absolute top-[70%] right-[20%] w-24 h-24 rounded-full border-2 border-dashed border-amber-400/25"></div>
        <div className="absolute top-[30%] left-[50%] w-20 h-20 rounded-full border-2 border-dashed border-rose-300/20 -translate-x-1/2"></div>

        <div className="absolute top-[12%] left-[25%] w-3 h-3 bg-[#e84c3d]/30 rounded-full"></div>
        <div className="absolute top-[22%] right-[25%] w-2.5 h-2.5 bg-orange-400/35 rounded-full"></div>
        <div className="absolute top-[55%] left-[35%] w-3.5 h-3.5 bg-amber-400/30 rounded-full"></div>
        <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-rose-400/25 rounded-full"></div>
        <div className="absolute top-[68%] right-[30%] w-2.5 h-2.5 bg-[#e84c3d]/25 rounded-full"></div>
        <div className="absolute top-[85%] left-[45%] w-3 h-3 bg-orange-300/30 rounded-full"></div>
        <div className="absolute top-[5%] left-[60%] w-2 h-2 bg-amber-500/35 rounded-full"></div>
        <div className="absolute top-[48%] right-[12%] w-2.5 h-2.5 bg-rose-500/20 rounded-full"></div>

        <svg className="absolute top-[6%] left-[45%] w-8 h-8 text-amber-400/40 animate-pulse" style={{ animationDuration: '2s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[38%] right-[15%] w-7 h-7 text-[#e84c3d]/30 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[72%] left-[20%] w-6 h-6 text-orange-400/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>

        <svg className="absolute top-[28%] left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30" stroke="#e84c3d" strokeWidth="3" />
        </svg>
        <svg className="absolute top-[60%] left-0 w-full h-16 opacity-[0.05]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 60 300 30 T600 30 T900 30 T1200 30" stroke="#f97316" strokeWidth="2" />
        </svg>
      </div>
      {/* ===== End Decorative Background ===== */}

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md border border-white/50 text-[#2d2d2d] font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-fit"
        >
          <IoArrowBack size={18} />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-white/50 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e84c3d] to-orange-400 flex items-center justify-center shadow-md">
              <IoIosAdd className="text-white w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-[#2d2d2d]">
              Add New <span className="text-[#e84c3d]">Food Item</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Fill in the details below to add a delicious new item to your restaurant menu.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500">
          {/* Card Header Gradient */}
          <div className="bg-gradient-to-r from-[#e84c3d] to-orange-500 px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FaUtensils className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-white text-xl font-extrabold">Food Details</h2>
                <p className="text-white/80 text-sm">Enter your menu item information</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
            {/* Food Name */}
            <div>
              <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                <MdOutlineFastfood className="text-[#e84c3d]" size={18} />
                Food Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#f5f0e8]/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/40 focus:border-[#e84c3d] text-[#2d2d2d] font-medium placeholder:text-gray-400 transition-all duration-300"
                placeholder="e.g., Butter Chicken, Paneer Tikka..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                <FaImage className="text-orange-500" size={16} />
                Food Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="w-full px-4 py-3 bg-[#f5f0e8]/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/40 focus:border-[#e84c3d] text-[#2d2d2d] font-medium transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e84c3d]/10 file:text-[#e84c3d] hover:file:bg-[#e84c3d]/20 cursor-pointer"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
              {frontendImage && (
                <div className="mt-4 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={frontendImage}
                    alt="image preview"
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                <FaRupeeSign className="text-amber-500" size={15} />
                Price (₹)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-[#f5f0e8]/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/40 focus:border-[#e84c3d] text-[#2d2d2d] font-medium placeholder:text-gray-400 transition-all duration-300"
                placeholder="Enter price in rupees"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            {/* Two Column Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                  <MdCategory className="text-[#e84c3d]" size={18} />
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 bg-[#f5f0e8]/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/40 focus:border-[#e84c3d] text-[#2d2d2d] font-medium cursor-pointer transition-all duration-300 appearance-none"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value="">Select category</option>
                  {categories.map((cat, index) => (
                    <option value={cat} key={index}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Food Type */}
              <div>
                <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                  <FaUtensils className="text-orange-500" size={14} />
                  Food Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-[#f5f0e8]/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/40 focus:border-[#e84c3d] text-[#2d2d2d] font-medium cursor-pointer transition-all duration-300 appearance-none"
                  onChange={(e) => setFoodType(e.target.value)}
                  value={foodType}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value="Veg">🟢 Veg</option>
                  <option value="Non-Veg">🔴 Non Veg</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#e84c3d] to-orange-500 hover:from-[#d63a2c] hover:to-orange-600 text-white text-lg rounded-2xl transition-all duration-300 px-8 py-4 font-bold cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={22} color="white" />
              ) : (
                <>
                  <IoIosAdd size={24} />
                  Add to Menu
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
