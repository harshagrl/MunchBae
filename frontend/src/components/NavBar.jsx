import { useEffect, useState } from "react";
import logo from "../assets/munch-bae-logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setSearchItems, setUserData } from "../store/user.slice";
import { IoIosAdd } from "react-icons/io";
import { TbReceiptRupee } from "react-icons/tb";
import { Link, useNavigate } from "react-router";

const NavBar = () => {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user,
  );
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      localStorage.removeItem("userData");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
        { withCredentials: true },
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearchItems();
    } else {
      dispatch(setSearchItems(null));
    }
  }, [query]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block bg-[#ebe5d9]/90 backdrop-blur-md border-b border-[#d4cec2] shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="MunchBae" className="w-12 h-12 drop-shadow-md" />
            <span className="text-xl font-extrabold text-[#2d2d2d] tracking-tight">
              MunchBae
            </span>
          </div>

          {/* Center Nav */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[#2d2d2d] text-sm font-medium">
              <FaLocationDot className="text-[#e84c3d]" />
              <span>{currentCity || "Location"}</span>
            </div>

            {userData.role === "user" && (
              <div className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-200 w-80">
                <FaSearch className="text-gray-400 mr-2" size={14} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-[#2d2d2d] placeholder:text-gray-400"
                  placeholder="Search for foods..."
                />
              </div>
            )}

            {userData.role === "owner" && (
              <>
                {myShopData && (
                  <button
                    className="bg-[#2d2d2d] text-white px-4 py-2 rounded-full hover:bg-black transition cursor-pointer flex items-center gap-1.5 text-sm font-medium"
                    onClick={() => navigate("/add-item")}
                  >
                    <IoIosAdd size={18} />
                    Add Item
                  </button>
                )}
                <button
                  className="relative bg-[#2d2d2d] text-white px-4 py-2 rounded-full hover:bg-black transition cursor-pointer flex items-center gap-1.5 text-sm font-medium"
                  onClick={() => navigate("/my-orders")}
                >
                  <TbReceiptRupee size={16} />
                  Orders
                  <span className="absolute -top-1.5 -right-1.5 bg-[#e84c3d] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                </button>
              </>
            )}

            {userData.role === "deliveryBoy" && (
              <button
                className="bg-[#2d2d2d] text-white px-4 py-2 rounded-full hover:bg-black transition cursor-pointer text-sm font-medium"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </button>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {userData.role === "user" && (
              <Link to="/cart" className="relative">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition">
                  <IoIosCart size={20} className="text-[#2d2d2d]" />
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e84c3d] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {userData.role === "user" && (
              <button
                className="px-4 py-2 rounded-full border border-[#2d2d2d] text-[#2d2d2d] text-sm font-medium hover:bg-[#2d2d2d] hover:text-white transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </button>
            )}

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowInfo((s) => !s)}
                className="w-10 h-10 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center text-sm font-bold shadow-md cursor-pointer hover:bg-black transition"
              >
                {userData?.fullName?.slice(0, 1).toUpperCase()}
              </button>
              {showInfo && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowInfo(false)}
                  />
                  <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl z-50 min-w-52 border border-gray-100 py-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-[#2d2d2d] text-sm">
                        {userData?.fullName}
                      </p>
                      <p className="text-xs text-gray-400">{userData?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 text-sm font-medium cursor-pointer transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#ebe5d9]/90 backdrop-blur-md border-b border-[#d4cec2] shadow-sm px-4 py-2 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <div className="flex gap-1 items-center">
              <FaLocationDot className="text-[#e84c3d] text-sm" />
              <span className="text-sm font-medium text-[#2d2d2d] truncate max-w-[120px]">
                {currentCity || "Location"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {userData.role === "user" && (
              <div>
                {!mobileSearchOpen ? (
                  <button
                    onClick={() => setMobileSearchOpen(true)}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    <FaSearch className="text-[#2d2d2d]" size={12} />
                  </button>
                ) : (
                  <div className="absolute left-3 right-3 top-14 bg-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-gray-200">
                    <FaSearch className="text-gray-400" size={12} />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onBlur={() =>
                        setTimeout(() => setMobileSearchOpen(false), 150)
                      }
                      className="w-full outline-none text-sm text-[#2d2d2d]"
                      placeholder="Search for foods..."
                    />
                  </div>
                )}
              </div>
            )}

            {userData.role === "owner" && (
              <>
                {myShopData && (
                  <Link
                    to="/add-item"
                    className="w-8 h-8 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center shadow cursor-pointer"
                  >
                    <IoIosAdd size={18} />
                  </Link>
                )}
                <button
                  className="relative w-8 h-8 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center shadow cursor-pointer"
                  onClick={() => navigate("/my-orders")}
                >
                  <TbReceiptRupee size={16} />
                  <span className="absolute -top-1 -right-1 bg-[#e84c3d] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                </button>
              </>
            )}

            {userData.role === "deliveryBoy" && (
              <button
                className="px-3 py-1.5 rounded-full bg-[#2d2d2d] text-white text-xs font-medium cursor-pointer"
                onClick={() => navigate("/my-orders")}
              >
                Orders
              </button>
            )}

            {userData.role === "user" && (
              <Link to="/cart" className="relative">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <IoIosCart size={16} className="text-[#2d2d2d]" />
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e84c3d] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            <div className="relative">
              <button
                onClick={() => setShowInfo((s) => !s)}
                className="w-8 h-8 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center text-xs font-bold shadow cursor-pointer"
              >
                {userData?.fullName?.slice(0, 1).toUpperCase()}
              </button>
              {showInfo && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowInfo(false)}
                  />
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 min-w-48 border border-gray-100 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold text-[#2d2d2d] text-sm">
                        {userData?.fullName}
                      </p>
                      <p className="text-xs text-gray-400">{userData?.email}</p>
                    </div>
                    {userData.role === "user" && (
                      <button
                        className="w-full text-left px-4 py-2.5 text-[#2d2d2d] hover:bg-gray-50 text-sm cursor-pointer"
                        onClick={() => navigate("/my-orders")}
                      >
                        My Orders
                      </button>
                    )}
                    {userData.role === "deliveryBoy" && (
                      <button
                        className="w-full text-left px-4 py-2.5 text-[#2d2d2d] hover:bg-gray-50 text-sm cursor-pointer"
                        onClick={() => navigate("/my-orders")}
                      >
                        My Orders
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 text-sm cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden h-14" />
    </>
  );
};

export default NavBar;
