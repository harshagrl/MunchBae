import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { BsShopWindow } from "react-icons/bs";
import { serverUrl } from "../App";
import { setMyShopData } from "../store/owner.slice";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const CreateEditShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = React.useState(myShopData?.name || "");
  const [city, setCity] = React.useState(myShopData?.city || currentCity || "");
  const [state, setState] = React.useState(
    myShopData?.state || currentState || ""
  );
  const [address, setAddress] = React.useState(
    myShopData?.address || currentAddress || ""
  );
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
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
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit-shop`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Error in creating/editing shop:", error);
      setLoading(false);
    }
  };
  return (
    <div className="relative flex justify-center flex-col items-center p-6 min-h-screen bg-linear-to-b from-cyan-700 to-cyan-900">
      <div
        className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={30} />
        <h2 className="text-md sm:text-xl">Back</h2>
      </div>
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-white mt-10 sm:mt-0">
        <div className="flex flex-col items-center justify-center mb-6 gap-4">
          <div className="text-green-700 bg-green-100 p-6 rounded-full">
            <BsShopWindow size={60} />
          </div>
          <div className="text-xl sm:text-2xl text-gray-900 font-extrabold">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Shop Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
              placeholder="Enter your shop name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Shop Image
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
              accept="image/*"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-3 mb-3">
                <img
                  src={frontendImage}
                  alt="image preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-800"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">
                State
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
                placeholder="Enter your shop state"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
            <div>
              <label className="block text-gray-900 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
                placeholder="Enter your shop city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Shop Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
              placeholder="Enter your shop address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition duration-300 mt-3 text-lg"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color="white" />
            ) : (
              <>{myShopData ? "Update Shop" : "Create Shop"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
