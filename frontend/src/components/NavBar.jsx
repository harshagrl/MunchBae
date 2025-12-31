import { useState } from "react";
import logo from "../assets/munch-bae-logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../store/user.slice";
import { IoIosAdd } from "react-icons/io";
import { TbReceiptRupee } from "react-icons/tb";

const NavBar = () => {
  const { userData, city } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleLogout = async () => {
    try {
      await axios.get(
        `${serverUrl}/api/auth/signout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="mt-10">
      <div className="relative px-0 md:max-w-5xl md:mx-auto md:px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center bg-white rounded-xl shadow-2xl px-10 py-5 pl-44 gap-6 relative overflow-visible">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-green-700 text-xl" />
            <div className="text-gray-700 font-medium truncate">
              {city || "Enable your location"}{" "}
            </div>
          </div>

          {userData.role == "user" && (
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm w-96">
              <FaSearch className="text-green-700 mr-3" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
                placeholder="Search for foods..."
              />
            </div>
          )}
          {userData.role == "owner" && (
            <>
              {myShopData && (
                <button className="bg-green-700 text-white px-2 py-1.5 rounded-lg hover:bg-green-800 transition cursor-pointer flex items-center gap-1">
                  <IoIosAdd size={22} />
                  <span className="text-md">Add Food Item</span>
                </button>
              )}
              <button className="relative bg-green-700 text-white px-2 py-1.5 rounded-lg hover:bg-green-800 transition cursor-pointer flex items-center gap-1">
                <TbReceiptRupee size={20} />
                <span className="text-md">Pending Orders</span>
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shadow">
                  1
                </span>
              </button>
            </>
          )}

          <div className="flex-1" />

          <div className="flex items-center gap-6 cursor-pointer">
            {userData.role == "user" && (
              <div className="relative">
                <IoIosCart size={30} className="text-green-700" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shadow">
                  1
                </span>
              </div>
            )}

            {userData.role == "user" && (
              <button className="bg-green-700 text-white px-2 py-1.5 rounded-lg text-sm hover:bg-green-800 transition cursor-pointer">
                My Orders
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowInfo((s) => !s)}
                className="rounded-full bg-green-700 text-white w-9 h-9 flex items-center justify-center text-lg shadow cursor-pointer"
              >
                {userData?.fullName?.slice(0, 1).toUpperCase()}
              </button>
              {showInfo && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowInfo(false)}
                  />
                  <div className="absolute right-0 mt-3 bg-white rounded-lg shadow-2xl z-50 min-w-[200px] border border-gray-100 py-3">
                    <div className="px-4 pb-3 border-b border-gray-100 cursor-pointer">
                      <p className="font-semibold text-gray-900">
                        {userData?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{userData?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop overlapped logo */}
          <img
            src={logo}
            alt="MunchBae"
            className="absolute -left-10 -top-8 w-36 h-36 rounded-full bg-white p-1 shadow-2xl"
          />
        </div>

        {/* Mobile */}
        <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white shadow-md px-4 py-3 w-full rounded-none z-50">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 rounded-full p-1 bg-white shadow"
            />
            <div className="flex gap-1 items-center">
              <FaLocationDot className="text-green-700 text-md" />

              <div className="text-md font-sans text-gray-700 truncate">
                {city || "Enable your location"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* mobile search toggle */}
            {userData.role == "user" && (
              <div>
                {!mobileSearchOpen ? (
                  <button
                    onClick={() => setMobileSearchOpen(true)}
                    className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    aria-label="Open search"
                  >
                    <FaSearch className="text-green-700" />
                  </button>
                ) : (
                  <div className="absolute left-4 right-4 top-16 bg-white px-3 py-2 rounded-xl shadow-xl flex items-center gap-2">
                    <FaSearch className="text-green-700" />
                    <input
                      autoFocus
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onBlur={() =>
                        setTimeout(() => setMobileSearchOpen(false), 150)
                      }
                      className="w-full outline-none text-sm text-gray-700"
                      placeholder="Search for foods..."
                    />
                  </div>
                )}
              </div>
            )}

            {userData.role == "owner" && (
              <>
                {myShopData && (
                  <button className="rounded-full bg-green-700 text-white w-7 h-7 flex items-center justify-center text-sm shadow cursor-pointer ml-2">
                    <IoIosAdd size={20} />
                  </button>
                )}
              </>
            )}

            {userData.role == "owner" && (
              <button className="relative rounded-full bg-green-700 text-white w-7 h-7 flex items-center justify-center text-sm shadow cursor-pointer ml-2">
                <TbReceiptRupee size={20} />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-xs font-semibold shadow">
                  1
                </span>
              </button>
            )}

            {userData.role == "user" && (
              <div className="relative cursor-pointer">
                <IoIosCart size={24} className="text-green-700" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold shadow cursor-pointer">
                  1
                </span>
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setShowInfo((s) => !s)}
                className="rounded-full bg-green-700 text-white w-7 h-7 flex items-center justify-center text-sm shadow cursor-pointer ml-2"
              >
                {userData?.fullName?.slice(0, 1).toUpperCase()}
              </button>
              {showInfo && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowInfo(false)}
                  />
                  <div className="absolute right-0 mt-3 bg-white rounded-lg shadow-2xl z-50 min-w-[180px] border border-gray-100 py-3">
                    <div className="px-4 pb-3 border-b border-gray-100 cursor-pointer">
                      <p className="font-semibold text-gray-900">
                        {userData?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{userData?.email}</p>
                    </div>
                    {userData.role == "user" && (
                      <button className="w-full text-left px-4 py-3 text-green-700 hover:bg-gray-50 cursor-pointer">
                        My Orders
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* spacer for fixed mobile navbar */}
        <div className="md:hidden h-16" />
      </div>
    </header>
  );
};

export default NavBar;
