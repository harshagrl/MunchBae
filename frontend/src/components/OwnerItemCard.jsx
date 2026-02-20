import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../store/owner.slice";

const OwnerItemCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete-item/${data._id}`,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.error("Error in handle delete: ", error);
    }
  };

  return (
    <div className="flex bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-white/50 w-full max-w-3xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-0.5">
      <div className="w-36 sm:w-44 shrink-0 relative overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
              data.foodType === "Veg"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-600 border border-red-200"
            }`}
          >
            {data.foodType === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between px-4 py-3 flex-1 min-w-0">
        <div>
          <h1
            className={`font-extrabold text-lg truncate ${
              data.foodType === "Veg" ? "text-[#2d2d2d]" : "text-[#2d2d2d]"
            }`}
          >
            {data.name}
          </h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-amber-100">
              {data.category}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center bg-[#e84c3d]/10 px-3 py-1.5 rounded-full">
            <MdCurrencyRupee size={16} className="text-[#e84c3d]" />
            <span className="text-[#e84c3d] font-extrabold text-base">{data.price}</span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to={`/edit-item/${data._id}`}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-all duration-300 cursor-pointer"
              title="Edit Item"
            >
              <FaPenToSquare size={14} />
            </Link>
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#e84c3d] hover:bg-[#e84c3d] hover:text-white transition-all duration-300 cursor-pointer"
              title="Remove Item"
              onClick={handleDeleteItem}
            >
              <FaTrashAlt size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
