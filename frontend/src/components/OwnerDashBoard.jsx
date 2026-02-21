import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { MdOutlineFoodBank, MdStorefront, MdLocationOn } from "react-icons/md";
import NavBar from "./NavBar";
import { useNavigate, Link } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import OwnerItemCard from "./OwnerItemCard";
import { IoIosAdd } from "react-icons/io";

const OwnerDashBoard = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <NavBar />

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

      {/* No Shop State */}
      {!myShopData && (
        <div className="relative z-10 flex justify-center items-center min-h-[70vh] px-4">
          <div className="max-w-lg w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-white/50 text-center transform hover:scale-[1.02] transition-all duration-500">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#e84c3d] to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <MdStorefront className="text-white w-12 h-12" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#2d2d2d] mb-3">
              Open Your Restaurant
            </h1>
            <p className="text-gray-500 text-base mb-8 leading-relaxed">
              Join MunchBae's platform and reach thousands of hungry customers every day. Start your food business journey today.
            </p>
            <button
              className="bg-gradient-to-r from-[#e84c3d] to-orange-500 hover:from-[#d63a2c] hover:to-orange-600 text-white text-lg rounded-full transition-all duration-300 px-8 py-3.5 font-bold cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => navigate("/create-edit-shop")}
            >
              Get Started →
            </button>
          </div>
        </div>
      )}

      {/* Shop Exists */}
      {myShopData && (
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">

          {/* Welcome Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-white/50 mb-4">
              <MdOutlineFoodBank className="text-[#e84c3d] w-8 h-8" />
              <span className="text-lg font-bold text-[#2d2d2d]">
                Welcome back, <span className="text-[#e84c3d]">{myShopData.name}</span>
              </span>
            </div>
          </div>

          {/* Shop Banner Card */}
          <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 group">
            <div className="relative">
              <img
                src={myShopData.image}
                alt={myShopData.name}
                className="w-full h-56 sm:h-72 object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Edit Button */}
              <div className="absolute top-4 right-4 z-10">
                <Link
                  to="/create-edit-shop"
                  className="bg-white/90 backdrop-blur-sm text-[#2d2d2d] px-4 py-2 rounded-full hover:bg-white transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg font-medium text-sm"
                  title="Edit your shop"
                >
                  <FaPenToSquare size={14} />
                  Edit Shop
                </Link>
              </div>

              {/* Shop Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="font-extrabold text-3xl sm:text-4xl text-white mb-1 drop-shadow-lg">
                  {myShopData.name}
                </h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MdLocationOn size={18} />
                  <span className="text-sm font-medium">
                    {myShopData.city}, {myShopData.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Shop Info Bar */}
            <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#e84c3d]/10 flex items-center justify-center">
                    <MdLocationOn className="text-[#e84c3d]" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Address</p>
                    <p className="text-sm text-[#2d2d2d] font-semibold">{myShopData.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <FaUtensils className="text-amber-500" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Menu Items</p>
                    <p className="text-sm text-[#2d2d2d] font-semibold">{myShopData.items.length}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl font-extrabold text-[#e84c3d]">{myShopData.items.length}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">Total Items</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl font-extrabold text-orange-500">
                {myShopData.items.filter(i => i.foodType === "Veg").length}
              </p>
              <p className="text-sm text-gray-500 font-medium mt-1">Veg Items</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 col-span-2 md:col-span-1">
              <p className="text-3xl font-extrabold text-[#2d2d2d]">
                {myShopData.items.filter(i => i.foodType === "Non-Veg").length}
              </p>
              <p className="text-sm text-gray-500 font-medium mt-1">Non-Veg Items</p>
            </div>
          </div>

          {/* No Items Yet */}
          {myShopData.items.length === 0 && (
            <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 border border-white/50 text-center">
              <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <FaUtensils className="text-white w-9 h-9" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#2d2d2d] mb-3">
                Add Your First Dish
              </h2>
              <p className="text-gray-500 text-base mb-6 max-w-sm mx-auto leading-relaxed">
                Share your delicious creations with hungry customers by adding items to your menu.
              </p>
              <button
                className="bg-gradient-to-r from-[#e84c3d] to-orange-500 hover:from-[#d63a2c] hover:to-orange-600 text-white text-base rounded-full transition-all duration-300 px-8 py-3 font-bold cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => navigate("/add-item")}
              >
                <span className="flex items-center gap-2">
                  <IoIosAdd size={22} />
                  Add Food Item
                </span>
              </button>
            </div>
          )}

          {/* Menu Items */}
          {myShopData.items.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d]">
                  Your Menu
                </h2>
                <button
                  className="flex items-center gap-1.5 bg-[#2d2d2d] text-white px-5 py-2.5 rounded-full hover:bg-black transition-all duration-300 cursor-pointer text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => navigate("/add-item")}
                >
                  <IoIosAdd size={20} />
                  Add Item
                </button>
              </div>
              <div className="flex flex-col w-full items-center gap-4">
                {myShopData.items.map((item) => (
                  <OwnerItemCard data={item} key={item._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashBoard;
