import { TiMinus } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../store/user.slice";

const CartItemsCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#e8e2d8] p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <img
        src={data.image}
        alt={data.name}
        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl flex-shrink-0"
      />

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-bold text-[#2d2d2d] truncate">
          {data.name}
        </h3>
        <p className="text-gray-400 text-xs mt-0.5">
          ₹{data.price} per item
        </p>
        <p className="text-[#2d2d2d] font-extrabold text-lg mt-1">
          ₹{data.price * data.quantity}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1">
        <div className="flex items-center bg-[#f5f0e8] rounded-full border border-[#e8e2d8]">
          <button
            onClick={() => handleDecrease(data.id, data.quantity)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e8e2d8] transition-colors cursor-pointer"
          >
            <TiMinus size={14} className="text-[#2d2d2d]" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-[#2d2d2d] select-none">
            {data.quantity}
          </span>
          <button
            onClick={() => handleIncrease(data.id, data.quantity)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e8e2d8] transition-colors cursor-pointer"
          >
            <IoIosAdd size={18} className="text-[#2d2d2d]" />
          </button>
        </div>

        {/* Delete */}
        <button
          onClick={() => dispatch(removeItem(data.id))}
          className="ml-2 w-9 h-9 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors cursor-pointer group"
          title="Remove item"
        >
          <FaTrashAlt
            size={14}
            className="text-red-400 group-hover:text-red-600 transition-colors"
          />
        </button>
      </div>
    </div>
  );
};

export default CartItemsCard;
