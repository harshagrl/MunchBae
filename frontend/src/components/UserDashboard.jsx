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
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* NavBar */}
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      {/* ===== Full-Page Decorative Background ===== */}
      <div className="fixed inset-0 top-16 pointer-events-none z-0" aria-hidden="true">
        {/* Large Gradient Blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#e84c3d]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] -right-24 w-[450px] h-[450px] bg-orange-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-[55%] -left-20 w-[400px] h-[400px] bg-amber-300/18 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-rose-300/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-[#e84c3d]/10 rounded-full blur-[100px]"></div>

        {/* Floating Food Emojis - Visible */}
        <span className="absolute top-[8%] left-[6%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>🍕</span>
        <span className="absolute top-[15%] right-[8%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🍔</span>
        <span className="absolute top-[35%] left-[3%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍩</span>
        <span className="absolute top-[50%] right-[5%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🌮</span>
        <span className="absolute top-[65%] left-[8%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🍟</span>
        <span className="absolute top-[25%] right-[3%] text-3xl opacity-25 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>🧁</span>
        <span className="absolute top-[75%] right-[7%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '2s' }}>🍰</span>
        <span className="absolute top-[80%] left-[5%] text-5xl opacity-25 animate-bounce" style={{ animationDuration: '3.6s', animationDelay: '1.2s' }}>🥤</span>

        {/* Dashed Decorative Rings */}
        <div className="absolute top-[10%] right-[18%] w-36 h-36 rounded-full border-[3px] border-dashed border-[#e84c3d]/20"></div>
        <div className="absolute top-[45%] left-[12%] w-28 h-28 rounded-full border-[3px] border-dashed border-orange-400/20"></div>
        <div className="absolute top-[70%] right-[20%] w-24 h-24 rounded-full border-2 border-dashed border-amber-400/25"></div>
        <div className="absolute top-[30%] left-[50%] w-20 h-20 rounded-full border-2 border-dashed border-rose-300/20 -translate-x-1/2"></div>

        {/* Scattered Dots */}
        <div className="absolute top-[12%] left-[25%] w-3 h-3 bg-[#e84c3d]/30 rounded-full"></div>
        <div className="absolute top-[22%] right-[25%] w-2.5 h-2.5 bg-orange-400/35 rounded-full"></div>
        <div className="absolute top-[55%] left-[35%] w-3.5 h-3.5 bg-amber-400/30 rounded-full"></div>
        <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-rose-400/25 rounded-full"></div>
        <div className="absolute top-[68%] right-[30%] w-2.5 h-2.5 bg-[#e84c3d]/25 rounded-full"></div>
        <div className="absolute top-[85%] left-[45%] w-3 h-3 bg-orange-300/30 rounded-full"></div>
        <div className="absolute top-[5%] left-[60%] w-2 h-2 bg-amber-500/35 rounded-full"></div>
        <div className="absolute top-[48%] right-[12%] w-2.5 h-2.5 bg-rose-500/20 rounded-full"></div>

        {/* Star Sparkles */}
        <svg className="absolute top-[6%] left-[45%] w-8 h-8 text-amber-400/40 animate-pulse" style={{ animationDuration: '2s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[38%] right-[15%] w-7 h-7 text-[#e84c3d]/30 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[72%] left-[20%] w-6 h-6 text-orange-400/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>

        {/* Wavy Decorative Lines */}
        <svg className="absolute top-[28%] left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30" stroke="#e84c3d" strokeWidth="3" />
        </svg>
        <svg className="absolute top-[60%] left-0 w-full h-16 opacity-[0.05]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 60 300 30 T600 30 T900 30 T1200 30" stroke="#f97316" strokeWidth="2" />
        </svg>
      </div>
      {/* ===== End Decorative Background ===== */}

      {/* Search Results */}
      {searchItems && searchItems.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6 pb-16">
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
