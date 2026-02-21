import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";

const OrderPlaced = () => {
  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#e84c3d]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Confetti-like food icons */}
        <span className="absolute top-[20%] left-[15%] text-4xl opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>🍕</span>
        <span className="absolute top-[15%] right-[20%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🍔</span>
        <span className="absolute bottom-[25%] left-[20%] text-4xl opacity-30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌮</span>
        <span className="absolute bottom-[20%] right-[15%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🍰</span>
        <span className="absolute top-[45%] left-[10%] text-3xl opacity-20 rotate-12">🍟</span>
        <span className="absolute top-[50%] right-[10%] text-3xl opacity-20 -rotate-12">🍩</span>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 md:p-14 shadow-2xl border border-white/50 text-center flex flex-col items-center">
          {/* Animated Success Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <FaCircleCheck className="text-8xl text-green-500 relative z-10 drop-shadow-lg" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#2d2d2d] mb-4 tracking-tight">
            Order <span className="text-[#e84c3d]">Placed!</span>
          </h1>
          
          <div className="w-16 h-1.5 bg-[#e84c3d] rounded-full mb-8"></div>

          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-10">
            Yay! Your food is on its way. Your order is being prepared with love and will reach you shortly. 
          </p>

          <div className="w-full space-y-4">
            <Link
              to="/my-orders"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#e84c3d] to-orange-500 text-white font-black py-5 px-8 rounded-2xl text-lg shadow-xl shadow-red-200 hover:shadow-red-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              Track My Order
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/home"
              className="w-full block py-4 text-[#2d2d2d] font-bold text-sm hover:text-[#e84c3d] transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        {/* Festive Dots */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#e84c3d]/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default OrderPlaced;
