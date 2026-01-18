import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { TiMinus } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/user.slice";
import { IoIosCart } from "react-icons/io";

const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const handleAddToCart = () => {
    {
      quantity > 0 &&
        dispatch(
          addToCart({
            id: data._id,
            name: data.name,
            image: data.image,
            shop: data.shop,
            price: data.price,
            quantity,
            foodType: data.foodType,
          })
        );
    }
    setQuantity(0);
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar className="text-yellow-500 text-base md:text-lg" />
        ) : (
          <CiStar className="text-yellow-500 text-base md:text-lg" />
        )
      );
    }
    return stars;
  };
  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
    }
  };
  return (
    <div className="w-full max-w-52 md:max-w-64 h-74 md:h-86 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="w-full h-40 md:h-48 bg-gray-200 overflow-hidden flex items-center justify-center relative">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg";
            }}
          />
        ) : (
          <div className="text-gray-400 text-sm">No Image</div>
        )}
      </div>

      <div className="md:p-4 p-2">
        <div className="flex items-start flex-row justify-between space-x-1">
          {data.foodType === "Veg" ? (
            <h3
              className="text-base md:text-lg font-bold font-mono text-green-600 truncate mb-2"
              title={data.name}
            >
              {data.name}
            </h3>
          ) : (
            <h3
              className="text-base md:text-lg font-bold font-mono text-red-600 truncate mb-2"
              title={data.name}
            >
              {data.name}
            </h3>
          )}

          <div className="flex items-center">
            {renderStars(data.rating?.average || 0)}
            <span className="text-black">{data.rating?.count || 0}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg md:text-xl font-bold text-black">
            ₹{data.price}
          </span>
          {data.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{data.originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center gap-2">
            <button onClick={handleDecrease}>
              <TiMinus
                size={34}
                className="p-2 text-black cursor-pointer hover:bg-gray-300 rounded-lg transition-all duration-300"
              />
            </button>
            <span className="text-base md:text-lg text-black">{quantity}</span>
            <button onClick={handleIncrease}>
              <IoIosAdd
                size={36}
                className="p-1 rounded-lg text-black cursor-pointer hover:bg-gray-300 transition-all duration-300"
              />
            </button>
          </div>
          <button
            className={`${
              cartItems.some((i) => i.id == data._id)
                ? "bg-gray-700 hover:bg-gray-900"
                : "bg-green-700 hover:bg-green-900"
            } text-sm md:text-base text-white font-semibold py-1 px-2 md:py-2 md:px-4 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-2`}
            onClick={handleAddToCart}
          >
            <IoIosCart size={30} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
