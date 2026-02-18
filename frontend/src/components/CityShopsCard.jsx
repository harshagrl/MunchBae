const CityShopsCard = ({ data, onClick }) => {
  return (
    <div
      className="shrink-0 w-56 md:w-72 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className="w-full h-40 md:h-52 overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-bold text-[#2d2d2d] truncate">
          {data.name}
        </h3>
      </div>
    </div>
  );
};

export default CityShopsCard;
