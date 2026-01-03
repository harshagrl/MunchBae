import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router";
const OwnerItemCard = ({ data }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 w-full max-w-2xl">
      <div className="w-40 flex shrink-0 bg-gray-50">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between px-2 py-1 flex-1">
        <div>
          <h1
            className={`font-bold text-lg ${
              data.foodType == "Veg" ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.name}
          </h1>
          <p className="font-semibold text-gray-800 font-mono">
            Category:{" "}
            <span className="font-normal font-serif">{data.category}</span>
          </p>
          <p className="text-gray-800 font-mono font-semibold">
            Type:{" "}
            <span className="font-normal font-serif">{data.foodType}</span>
          </p>
        </div>
        <div className="flex items-center justify-between text-lg text-gray-800">
          <div className="flex items-center">
            <MdCurrencyRupee size={18} />
            {data.price}
          </div>
          <div className="flex items-center rounded-lg">
            <Link
              to={`/edit-item/${data._id}`}
              className="hover:bg-gray-200 p-2 cursor-pointer"
              title="Edit Item"
            >
              <FaPenToSquare />
            </Link>
            <span
              className="hover:bg-gray-200 p-2 cursor-pointer"
              title="Remove Item"
            >
              <FaTrashAlt />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
