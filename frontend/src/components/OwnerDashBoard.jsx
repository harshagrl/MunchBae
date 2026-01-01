import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";

import NavBar from "./NavBar";
const OwnerDashBoard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  return (
    <div className="w-screen min-h-screen flex flex-col gap-10 bg-linear-to-b from-cyan-700 to-cyan-900">
      <NavBar />
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover-shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-green-700 w-16 h-16 sm:w-20 sm:h-20 mb-4" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Add Your Restaurant
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Join our food delivery platform and reach thousands of hungry
                customers every day.
              </p>
              <button className="bg-green-700 hover:bg-green-800 text-md sm:text-lg rounded-full transition duration-300 px-4 py-2 font-sans font-semibold cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashBoard;
