import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import CartItemsCard from "../components/CartItemsCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="bg-[#ebe5d9]/90 backdrop-blur-md border-b border-[#d4cec2] shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 text-[#2d2d2d] hover:text-[#e84c3d] transition-colors duration-200 cursor-pointer"
          >
            <IoIosArrowRoundBack size={28} />
            <span className="font-semibold text-sm">Back</span>
          </button>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#2d2d2d] tracking-tight">
            My Cart
          </h1>
          <div className="relative">
            <BsCart3 className="text-[#2d2d2d] text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e84c3d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
              <BsCart3 className="text-5xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#2d2d2d] mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Looks like you haven't added anything yet
            </p>
            <Link
              to="/home"
              className="bg-[#2d2d2d] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Food →
            </Link>
          </div>
        ) : (
          <>
            {/* Items Count */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm font-medium">
                {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your
                cart
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <CartItemsCard data={item} key={index} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-[#e8e2d8] p-6">
              <h3 className="text-lg font-extrabold text-[#2d2d2d] mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-[#2d2d2d]">
                    ₹{totalAmount}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="border-t border-dashed border-[#e8e2d8] my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-extrabold text-[#2d2d2d]">
                    Total
                  </span>
                  <span className="text-2xl font-extrabold text-green-600">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full mt-6 bg-[#2d2d2d] text-white py-4 rounded-xl font-bold text-base cursor-pointer hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
