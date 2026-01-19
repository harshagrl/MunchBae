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
    <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow border-2 border-black">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-30 h-30 object-cover rounded-lg border"
        />
        <div>
          <h1 className="text-black font-bold font-sans text-xl">
            {data.name}
          </h1>
          <p className="text-gray-500 font-sans font-medium text-sm mb-2">
            ₹{data.price} x {data.quantity}
          </p>
          <p className="text-gray-900 font-sans font-bold text-lg">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => handleDecrease(data.id, data.quantity)}>
          <TiMinus
            size={30}
            className="p-2 text-black cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-300 bg-slate-100"
            title="Decrease"
          />
        </button>
        <span className="text-base md:text-lg text-black">{data.quantity}</span>
        <button onClick={() => handleIncrease(data.id, data.quantity)}>
          <IoIosAdd
            size={32}
            className="p-1 rounded-full text-black cursor-pointer hover:bg-gray-300 transition-all duration-300 bg-slate-100"
            title="Increase"
          />
        </button>
        <button onClick={() => dispatch(removeItem(data.id))}>
          <FaTrashAlt
            size={32}
            className="p-2 rounded-full text-red-600 cursor-pointer hover:bg-red-200 transition-all duration-300 bg-red-100 mr-3"
            title="Remove item"
          />
        </button>
      </div>
    </div>
  );
};

export default CartItemsCard;
