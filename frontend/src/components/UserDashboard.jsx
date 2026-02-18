import { useSelector } from "react-redux";
import { categories } from "../categories";
import CategoryCard from "./CategoryCard";
import NavBar from "./NavBar";
import CityShopsCard from "./CityShopsCard";
import FoodCard from "./FoodCard";
import useGetShopByCity from "../hooks/useGetShopByCity";
import useGetItemsByCity from "../hooks/useGetItemsByCity";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OrbitImages from "./OrbitImages/OrbitImages";
import burger3d from "../assets/icon_3d_burger.png";
import pizza3d from "../assets/icon_3d_pizza.png";
import donut3d from "../assets/icon_3d_donut.png";
import fries3d from "../assets/icon_3d_fries.png";
import hotdog3d from "../assets/icon_3d_hotdog.png";
import cake3d from "../assets/icon_3d_cake.png";
import munchBaeLogo from "../assets/munch-bae-logo.png";

const UserDashboard = () => {
  const [updatedItemsList, setUpdatedItemsList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { currentCity, shopsInMyCity, itemsInMyCity, searchItems } =
    useSelector((state) => state.user);
  const navigate = useNavigate();
  useGetShopByCity();
  useGetItemsByCity();

  const handleFilterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setUpdatedItemsList(itemsInMyCity);
      return;
    }
    const filteredList = itemsInMyCity.filter((i) => i.category === category);
    setUpdatedItemsList(filteredList);
  };

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity);
  }, [itemsInMyCity]);

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* NavBar */}
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      {/* Search Results */}
      {searchItems && searchItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] mb-6">
            Search Results
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {searchItems.map((item, index) => (
              <div key={index}>
                <FoodCard data={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Doodle Pill - Sad/Neutral */}
          <div className="hidden md:flex shrink-0 w-24 h-48 md:w-32 md:h-64 border-2 border-black rounded-[50px] items-center justify-center relative bg-white rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
            {/* Sad Face Doodle */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              stroke="black"
              strokeWidth="3"
            >
              {/* Eyes */}
              <circle cx="30" cy="40" r="4" fill="black" />
              <circle cx="70" cy="40" r="4" fill="black" />
              {/* Mouth (Sad/Neutral) */}
              <path d="M30 70 Q50 60 70 70" strokeLinecap="round" />
            </svg>
          </div>

          {/* Center - MunchBae Logo with 3D Effect */}
          <div className="text-center flex-1 flex flex-col items-center">
            <div
              className="relative group cursor-pointer transition-transform duration-500 ease-out hover:scale-105"
              style={{
                perspective: '1000px',
              }}
            >
              <img
                src={munchBaeLogo}
                alt="MunchBae"
                className="w-[280px] md:w-[420px] lg:w-[520px] select-none"
                draggable={false}
                style={{
                  filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.25)) drop-shadow(0 8px 0 rgba(0,0,0,0.15)) drop-shadow(0 16px 30px rgba(0,0,0,0.12))',
                  transform: 'perspective(800px) rotateX(5deg)',
                  transition: 'transform 0.5s ease, filter 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) translateY(-8px)';
                  e.currentTarget.style.filter = 'drop-shadow(0 8px 0 rgba(0,0,0,0.2)) drop-shadow(0 16px 0 rgba(0,0,0,0.1)) drop-shadow(0 24px 40px rgba(0,0,0,0.15))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(800px) rotateX(5deg)';
                  e.currentTarget.style.filter = 'drop-shadow(0 4px 0 rgba(0,0,0,0.25)) drop-shadow(0 8px 0 rgba(0,0,0,0.15)) drop-shadow(0 16px 30px rgba(0,0,0,0.12))';
                }}
              />
            </div>

            <p className="text-gray-500 mt-6 text-sm md:text-lg font-medium max-w-md mx-auto">
              Discover delicious food <br/> from the best restaurants
            </p>
          </div>

          {/* Right Doodle Pill - Happy */}
          <div className="hidden md:flex shrink-0 w-24 h-48 md:w-32 md:h-64 border-2 border-black rounded-[50px] items-center justify-center relative bg-white rotate-[5deg] hover:rotate-0 transition-transform duration-300">
             {/* Happy Face Doodle */}
             <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              stroke="black"
              strokeWidth="3"
            >
              {/* Eyes */}
              <circle cx="30" cy="40" r="4" fill="black" />
              <circle cx="70" cy="40" r="4" fill="black" />
              {/* Mouth (Smile) */}
              <path d="M30 65 Q50 85 70 65" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Orbiting Food Icons */}
        <div className="w-full hidden lg:flex justify-center">
          <OrbitImages
            images={[burger3d, pizza3d, donut3d, fries3d, hotdog3d, cake3d]}
            shape="ellipse"
            baseWidth={900}
            baseHeight={250}
            radiusX={380}
            radiusY={80}
            rotation={-6}
            duration={25}
            itemSize={80}
            width={900}
            height={250}
            fill
            showPath
            pathColor="black"
            pathWidth={2}
          />
        </div>
      </div>

      {/* Categories - Scrollable Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d] mb-5">
          What's on your mind?
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              data={category}
              isActive={activeCategory === category.category}
              onClick={() => handleFilterByCategory(category.category)}
            />
          ))}
        </div>
      </div>



      {/* Shops Section */}
      {shopsInMyCity && shopsInMyCity.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d] mb-5">
            Best Shops in {currentCity || "your city"}
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {(shopsInMyCity || []).map((shop, index) => (
              <CityShopsCard
                key={index}
                data={shop}
                onClick={() => navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Food Items Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d] mb-5">
          Explore Food Items
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {(updatedItemsList || []).map((item, index) => (
            <div key={index}>
              <FoodCard data={item} />
            </div>
          ))}
        </div>
        {(!updatedItemsList || updatedItemsList.length === 0) && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🍽️</p>
            <p className="text-xl font-bold text-[#2d2d2d]">No items found</p>
            <p className="text-gray-500 mt-2">
              Try a different category or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
