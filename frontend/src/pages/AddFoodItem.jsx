import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { BsShopWindow } from "react-icons/bs";
import { serverUrl } from "../App";
import { setMyShopData } from "../store/owner.slice";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const AddFoodItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("Veg");
  const [loading, setLoading] = useState(false);
  const categories = [
    "Beverages",
    "Snacks",
    "Meals",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sushi",
    "Salads",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
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
      alert("Please fill all required fields and select an image");
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
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Error in adding food item:", error);
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
            Add Food
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
              placeholder="Enter food name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Image
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
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif"
              placeholder="Enter food price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Select Category
            </label>
            <select
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">--Select--</option>
              {categories.map((cat, index) => (
                <option value={cat} key={index}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
              Select Type
            </label>
            <select
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 font-serif cursor-pointer"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non Veg</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition duration-300 mt-3 text-lg"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
