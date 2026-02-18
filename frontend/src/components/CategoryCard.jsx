import React from "react";

const CategoryCard = ({ data, onClick, isActive }) => {
  return (
    <div
      className={`shrink-0 flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300`}
      onClick={() => onClick()}
    >
      <div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
          isActive
            ? "border-[#2d2d2d] shadow-lg scale-105"
            : "border-transparent"
        }`}
      >
        <img
          src={data.image}
          alt={data.category}
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${
          isActive ? "text-[#2d2d2d]" : "text-gray-500 group-hover:text-[#2d2d2d]"
        }`}
      >
        {data.category}
      </span>
    </div>
  );
};

export default CategoryCard;
