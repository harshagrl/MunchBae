const CityShopsCard = ({ data }) => {
  return (
    <div className="relative w-60 h-50 md:w-80 md:h-70 shrink-0 overflow-hidden transition-shadow cursor-pointer rounded-2xl">
      <img
        src={data.image}
        alt=""
        className="w-full h-full object-fill transform hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-95 px-3 py-1 text-center shadow text-md font-semibold font-mono text-gray-800 backdrop-blur">
        {data.name}
      </div>
    </div>
  );
};

export default CityShopsCard;
