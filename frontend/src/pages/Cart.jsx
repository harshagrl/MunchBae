import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import CartItemsCard from "../components/CartItemsCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen flex justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 p-6">
      <div className="w-full max-w-200">
        <div
          className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <IoIosArrowRoundBack size={30} />
          <h2 className="text-md sm:text-xl">Back</h2>
        </div>
        {cartItems.length === 0 ? (
          <div className="text-xl text-center mt-20">
            Your cart is empty.{" "}
            <Link to={"/"} className="text-blue-500 underline cursor-pointer">
              Add Items.
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5 mt-20">
              {cartItems.map((item, index) => (
                <CartItemsCard data={item} key={index} />
              ))}
            </div>
            <div className="flex justify-between bg-white py-4 px-2 rounded-xl shadow border-2 border-black mt-5 text-black font-bold text-xl font-sans">
              <h1>Total Amount</h1>
              <span className="text-green-600">₹{totalAmount}</span>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                className="bg-green-600 hover:bg-green-700 text-lg font-bold  shadow-lg rounded-xl px-6 py-4 text-white cursor-pointer transition-all duration-300"
                title="Place order"
                onClick={() => navigate("/checkout")}
              >
                Checkout <span className="text-sm">➤</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
