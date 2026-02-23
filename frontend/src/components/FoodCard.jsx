import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { TiMinus } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/user.slice";
import { IoIosCart } from "react-icons/io";
import toast from "react-hot-toast";

const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          image: data.image,
          shop: data.shop,
          price: data.price,
          quantity,
          foodType: data.foodType,
        }),
      );
      toast.success(`${quantity} ${data.name} added to cart`);
      setQuantity(0);
    } else {
      toast.error("Please select quantity first");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-amber-400 text-xs" />
        ) : (
          <CiStar key={i} className="text-amber-400 text-xs" />
        ),
      );
    }
    return stars;
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const isInCart = cartItems.some((i) => i.id == data._id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src =
                "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            🍽️
          </div>
        )}
        {/* Food type badge */}
        <div
          className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            data.foodType === "Veg"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {data.foodType}
        </div>
        {/* Rating */}
        {data.rating?.average > 0 && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
            <FaStar className="text-amber-400 text-[10px]" />
            <span className="text-[10px] font-bold text-[#2d2d2d]">
              {data.rating?.average}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3
          className="text-sm font-bold text-[#2d2d2d] truncate mb-1"
          title={data.name}
        >
          {data.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-base font-extrabold text-[#2d2d2d]">
            ₹{data.price}
          </span>
          {data.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{data.originalPrice}
            </span>
          )}
        </div>

        {/* Quantity + Add */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-1 py-0.5">
            <button
              onClick={handleDecrease}
              className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
            >
              <TiMinus size={14} className="text-[#2d2d2d]" />
            </button>
            <span className="text-sm font-bold text-[#2d2d2d] w-5 text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
            >
              <IoIosAdd size={16} className="text-[#2d2d2d]" />
            </button>
          </div>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              isInCart
                ? "bg-gray-800 text-white hover:bg-gray-900"
                : "bg-[#2d2d2d] text-white hover:bg-black"
            }`}
            onClick={handleAddToCart}
          >
            <IoIosCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
