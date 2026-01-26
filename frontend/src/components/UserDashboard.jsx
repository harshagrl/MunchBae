import { useSelector } from "react-redux";
import { categories } from "../categories";
import CategoryCard from "./CategoryCard";
import NavBar from "./NavBar";
import CityShopsCard from "./CityShopsCard";
import FoodCard from "./FoodCard";
import useGetShopByCity from "../hooks/useGetShopByCity";
import useGetItemsByCity from "../hooks/useGetItemsByCity";

const UserDashboard = () => {
  const { currentCity, shopsInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user,
  );
  useGetShopByCity();
  useGetItemsByCity();
  return (
    <div className="w-screen min-h-screen flex flex-col bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 py-4 px-2">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      <div className="flex flex-col items-center text-white w-full space-y-6 mt-0 md:mt-10 p-3">
        <h1 className="text-2xl md:text-3xl font-bold font-sans">
          What's on your mind?
        </h1>
        <div className="w-full md:w-[90%]">
          <div className="carousel carousel-end space-x-4 py-4 flex overflow-x-auto ">
            {categories.map((category, index) => (
              <div key={index} className="carousel-item mr-4">
                <CategoryCard data={category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-white w-full space-y-6 mt-0 p-3">
        <h1 className="text-2xl md:text-3xl font-bold font-sans">
          Discover best shops in {currentCity || "your city"}
        </h1>
        <div className="w-full md:w-[80%]">
          <div className="carousel carousel-end space-x-4 py-4 flex overflow-x-auto flex-nowrap justify-center">
            {(shopsInMyCity || []).map((category, index) => (
              <div key={index} className="carousel-item mr-4">
                <CityShopsCard data={category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-white w-full space-y-6 mt-0 p-3">
        <h1 className="text-2xl md:text-3xl font-bold font-sans">
          Explore food items
        </h1>
        <div className="w-full h-auto flex flex-wrap gap-5 justify-center">
          {(itemsInMyCity || []).map((item, index) => {
            return (
              <div key={index}>
                <FoodCard data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
