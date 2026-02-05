import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router";
import { FaStore } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import FoodCard from "../components/FoodCard";
import { IoIosArrowRoundBack } from "react-icons/io";

function Shop() {
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState([]);
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleShop();
  }, [shopId]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-700">
      <div
        className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer text-white bg-black/60 rounded-full px-3 py-1 hover:bg-black/80 transition duration-300 shadow-lg font-sans"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={30} />
        <h2 className="text-md sm:text-xl">Back</h2>
      </div>
      {shop && (
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent bg-opacity-30 flex items-center justify-center flex-col">
            <FaStore
              className="text-white text-4xl mb-3 drop-shadow-2xl px-4"
              size={100}
            />
            <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-2xl ">
              {shop.name}
            </h1>
            <div className="mt-5 flex items-center gap-2">
              <FaLocationDot className=" text-lg text-green-600" />
              <div className=" text-gray-100 text-lg">{shop.address}</div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="flex items-center justify-center text-3xl text-white font-bold mb-10 mt-8">
          <FaUtensils className="mr-2 text-red-400" />
          Our Menu
        </h2>
        {items.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {items.map((item, index) => (
              <FoodCard data={item} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No items available</p>
        )}
      </div>
    </div>
  );
}

export default Shop;
