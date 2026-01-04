import React from "react";

const CategoryCard = ({ data }) => {
  return (
    <div className="relative w-40 h-40 md:w-45 md:h-45 shrink-0 overflow-hidden transition-shadow cursor-pointer rounded-2xl">
      <img
        src={data.image}
        alt=""
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-95 px-3 py-1 text-center shadow text-md font-semibold font-mono text-gray-800 backdrop-blur">
        {data.category}
      </div>
    </div>
  );
};

export default CategoryCard;
