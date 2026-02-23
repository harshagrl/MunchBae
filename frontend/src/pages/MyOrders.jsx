import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbReceiptRupee } from "react-icons/tb";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import DeliveryBoyOrderCard from "../components/DeliveryBoyOrderCard";
import { setMyOrders, updateRealTimeOrderStatus } from "../store/user.slice";

const MyOrders = () => {
  const { userData, myOrders, socket } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Note: Socket listeners moved to App.jsx for global real-time updates
  }, []);

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
            {userData?.role === "deliveryBoy" ? "My Delivered Orders" : "My Orders"}
          </h1>
          <TbReceiptRupee className="text-[#2d2d2d] text-xl" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {myOrders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
              <TbReceiptRupee className="text-5xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#2d2d2d] mb-2">
              {userData?.role === "deliveryBoy" ? "No deliveries yet" : "No orders yet"}
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              {userData?.role === "deliveryBoy" ? "Your delivered orders will appear here" : "Your order history will appear here"}
            </p>
            <button
              onClick={() => navigate(userData?.role === "deliveryBoy" ? "/delivery-partner-dashboard" : "/home")}
              className="bg-[#2d2d2d] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              {userData?.role === "deliveryBoy" ? "Find Orders →" : "Start Ordering →"}
            </button>
          </div>
        ) : (
          <>
            {/* Orders Count */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm font-medium">
                {myOrders.length} order{myOrders.length > 1 ? "s" : ""} {userData?.role === "deliveryBoy" ? "delivered" : "placed"}
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-5">
              {myOrders.map((order, index) =>
                userData.role === "user" ? (
                  <UserOrderCard data={order} key={index} />
                ) : userData.role === "owner" ? (
                  <OwnerOrderCard data={order} key={index} />
                ) : userData.role === "deliveryBoy" ? (
                  <DeliveryBoyOrderCard data={order} key={index} />
                ) : null
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
