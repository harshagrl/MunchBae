import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router";

const OrderPlaced = () => {
  return (
    <div className="bg-linear-to-b from-cyan-700 to-cyan-900 min-h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      <FaCircleCheck className="text-8xl text-green-400 mb-4" />
      <h1 className="text-amber-200 text-3xl font-bold font-sans mb-2">
        Order Placed!
      </h1>
      <p className="text-white text-lg max-w-lg mb-6">
        Your order has been placed successfully. Your order is being prepared
        and will be delivered soon. You can track your order in the{" "}
        <span className="font-semibold text-amber-100">"My Orders"</span>{" "}
        section.
      </p>
      <Link
        to={"/my-orders"}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg px-6 rounded-full cursor-pointer transition-all duration-300"
      >
        Back to My orders
      </Link>
    </div>
  );
};

export default OrderPlaced;
