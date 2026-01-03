import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
import NavBar from "./NavBar";
import { useNavigate } from "react-router";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router";
import OwnerItemCard from "./OwnerItemCard";
const OwnerDashBoard = () => {
  const navigate = useNavigate();
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
              <button
                className="bg-green-700 hover:bg-green-800 text-md sm:text-lg rounded-full transition duration-300 px-4 py-2 font-sans font-semibold cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
      {myShopData && (
        <div className="flex flex-col w-full items-center gap-2 px-4 sm:px-6">
          <h1 className="flex items-center gap-4 text-2xl justify-center font-bold font-mono">
            <MdOutlineFoodBank className="text-green-400 w-14 h-14 sm:w-18 sm:h-18 mb-4" />
            Welcome <span className="underline">{myShopData.name}</span>
          </h1>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative ">
            <div className="absolute top-4 right-4 z-10">
              <Link
                to="/create-edit-shop"
                className="bg-green-700 text-white px-2 py-1.5 rounded-full hover:bg-green-800 transition cursor-pointer flex items-center gap-2"
                title="Edit your shop"
              >
                <FaPenToSquare size={20} />
              </Link>
            </div>
            <img
              src={myShopData.image}
              alt={myShopData.name}
              className="w-full h-48 sm:h-70 object-cover"
            />
            <div className="p-6 text-black">
              <h1 className="font-bold text-xl sm:text-2xl mb-2">
                {myShopData.name}
              </h1>
              <h3 className="text-lg">
                {myShopData.city}, {myShopData.state}
              </h3>
              <p>{myShopData.address}</p>
            </div>
          </div>
          {myShopData.items.length == 0 && (
            <div className="flex justify-center items-center p-4 sm:p-6">
              <div className="max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover-shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <FaUtensils className="text-green-700 w-16 h-16 sm:w-20 sm:h-20 mb-4" />
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Add your first food item
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Share your delicious creations with our customers by adding
                    them to the menu.
                  </p>
                  <button
                    className="bg-green-700 hover:bg-green-800 text-md sm:text-lg rounded-full transition duration-300 px-4 py-2 font-sans font-semibold cursor-pointer"
                    onClick={() => navigate("/add-item")}
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </div>
          )}
          {myShopData.items.length > 0 && (
            <div className="flex flex-col w-full items-center gap-3 max-w-3xl mt-5">
              {myShopData.items.map((item, index) => (
                <>
                  <OwnerItemCard data={item} key={index} />
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashBoard;
