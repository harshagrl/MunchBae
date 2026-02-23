import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { serverUrl } from "../App";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiPackage, FiUser, FiPhone, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";
import DeliveryTracking from "../components/DeliveryTracking";
import { useSelector } from "react-redux";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState();
  const [liveLocations, setLiveLocations] = useState({});
  const { socket } = useSelector((state) => state.user);

  const handleGetOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true },
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    const handleLocationUpdate = ({ deliveryBoyId, latitude, longitude }) => {
      setLiveLocations((prev) => ({
        ...prev,
        [deliveryBoyId]: { lat: latitude, long: longitude },
      }));
    };
    const handleAssignmentUpdate = ({ orderId: updatedOrderId, shopId, assignedDeliveryPartner }) => {
      if (updatedOrderId === orderId) {
        setCurrentOrder((prev) => {
          if (!prev) return prev;
          const updatedShopOrders = prev.shopOrders.map((so) => {
            if (so.shop._id === shopId || so.shop === shopId) {
              return { ...so, assignedDeliveryPartner };
            }
            return so;
          });
          return { ...prev, shopOrders: updatedShopOrders };
        });
      }
    };

    const handleStatusUpdate = ({ orderId: updatedOrderId, shopId, status }) => {
      if (updatedOrderId === orderId) {
        setCurrentOrder((prev) => {
          if (!prev) return prev;
          const updatedShopOrders = prev.shopOrders.map((so) => {
            if (so.shop._id === shopId || so.shop === shopId) {
              return { ...so, status };
            }
            return so;
          });
          return { ...prev, shopOrders: updatedShopOrders };
        });
      }
    };

    socket.on("updateDeliveryLocation", handleLocationUpdate);
    socket.on("update-status", handleStatusUpdate);
    socket.on("update-assignment", handleAssignmentUpdate);

    return () => {
      socket.off("updateDeliveryLocation", handleLocationUpdate);
      socket.off("update-status", handleStatusUpdate);
      socket.off("update-assignment", handleAssignmentUpdate);
    };
  }, [socket, orderId]);

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-700 border-green-200";
      case "preparing": return "bg-amber-100 text-amber-700 border-amber-200";
      case "out for delivery": return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden flex flex-col pt-20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#e84c3d]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] bg-amber-300/10 rounded-full blur-[110px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-orange-400/10 rounded-full blur-[90px]"></div>

        {/* Floating Icons */}
        <span className="absolute top-[12%] right-[15%] text-4xl opacity-15 animate-bounce">🛵</span>
        <span className="absolute bottom-[20%] left-[10%] text-4xl opacity-15 animate-bounce" style={{ animationDelay: '1s' }}>📦</span>
        <span className="absolute top-[60%] right-[8%] text-3xl opacity-10">📍</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/my-orders")}
            className="group flex items-center gap-1.5 text-[#2d2d2d] hover:text-[#e84c3d] transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#e84c3d] group-hover:text-white transition-all">
              <IoIosArrowRoundBack size={26} />
            </div>
            <span className="font-bold text-sm">Back to Orders</span>
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-black text-[#2d2d2d] tracking-tight">
              Track <span className="text-[#e84c3d]">Order</span>
            </h1>
            <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">ID: #{orderId.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {currentOrder?.shopOrders?.map((shopOrder, index) => (
            <div
              className="bg-white/80 backdrop-blur-md rounded-[32px] overflow-hidden shadow-xl border border-white/50"
              key={index}
            >
              {/* Card Header: Shop & Status */}
              <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#e84c3d]/10 flex items-center justify-center text-[#e84c3d]">
                    <FiPackage size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#2d2d2d] mb-1">{shopOrder.shop.name}</h2>
                    <div className="flex items-center gap-2">
                       <FiClock className="text-gray-400" size={12} />
                       <span className="text-xs text-gray-400 font-medium">Estimated arrival in 30-40 mins</span>
                    </div>
                  </div>
                </div>
                <div className={`self-start md:self-center px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(shopOrder.status)}`}>
                  {shopOrder.status}
                </div>
              </div>

              {/* Order Info Section */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Items & Address */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#e84c3d]"></span>
                       Items Ordered
                    </h3>
                    <div className="bg-[#f8f6f2] rounded-2xl p-4 border border-gray-100/50">
                       <p className="text-sm font-bold text-[#2d2d2d] leading-relaxed">
                          {shopOrder.shopOrderItem?.map((i) => i.item.name).join(", ")}
                       </p>
                       <div className="mt-3 pt-3 border-t border-gray-200/50 flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-medium">Subtotal</span>
                          <span className="text-[#2d2d2d] font-black">₹{shopOrder.subtotal}</span>
                       </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#e84c3d]"></span>
                       Delivery to
                    </h3>
                    <div className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#e84c3d] shrink-0">
                          <FiMapPin size={16} />
                       </div>
                       <p className="text-sm font-bold text-[#2d2d2d] leading-relaxed italic">
                          "{currentOrder.deliveryAddress.text}"
                       </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Partner Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#e84c3d]"></span>
                       Delivery Partner
                    </h3>
                    {shopOrder.status !== "delivered" ? (
                      shopOrder.assignedDeliveryPartner ? (
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2d2d2d] to-black flex items-center justify-center text-white font-black text-lg">
                              {shopOrder.assignedDeliveryPartner.fullName?.slice(0, 1).toUpperCase()}
                           </div>
                           <div className="flex-1">
                              <p className="text-sm font-black text-[#2d2d2d]">{shopOrder.assignedDeliveryPartner.fullName}</p>
                              <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mt-0.5">
                                 <FiPhone size={10} /> {shopOrder.assignedDeliveryPartner.mobile}
                              </p>
                           </div>
                           <a 
                             href={`tel:${shopOrder.assignedDeliveryPartner.mobile}`}
                             className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-100 hover:scale-110 active:scale-95 transition-all"
                           >
                             <FiPhone size={16} />
                           </a>
                        </div>
                      ) : (
                        <div className="bg-orange-50 rounded-2xl p-5 text-center border border-orange-100">
                           <p className="text-xs text-orange-600 font-bold mb-1 italic">Finding near-by heroes...</p>
                           <p className="text-[10px] text-orange-400 font-medium leading-tight">We'll assign a delivery partner shortly.</p>
                        </div>
                      )
                    ) : (
                      <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3 border border-green-100">
                         <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <span className="text-xs font-bold">✓</span>
                         </div>
                         <p className="text-sm font-black text-green-700">Order successfully delivered!</p>
                      </div>
                    )}
                  </div>

                  {/* Tracking Note */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-wide flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live tracking active
                     </p>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              {shopOrder.assignedDeliveryPartner && shopOrder.status !== "delivered" && (
                <div className="px-6 md:px-8 pb-8">
                  <div className="h-80 w-full rounded-3xl overflow-hidden shadow-inner border border-gray-100 relative group">
                    <DeliveryTracking
                      data={{
                        deliveryPartnerLocation: liveLocations[
                          shopOrder.assignedDeliveryPartner._id
                        ] || {
                          lat: shopOrder.assignedDeliveryPartner.location
                            ?.coordinates?.[1] || 0,
                          long: shopOrder.assignedDeliveryPartner.location
                            ?.coordinates?.[0] || 0,
                        },
                        customerLocation: {
                          lat: currentOrder.deliveryAddress.latitude,
                          long: currentOrder.deliveryAddress.longitude,
                        },
                      }}
                    />
                    <div className="absolute top-4 left-4 z-10">
                       <span className="bg-[#2d2d2d] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                          <FiMapPin size={12} className="text-[#e84c3d]" />
                          LIVE TRACKING
                       </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Support Section */}
        <div className="mt-12 text-center pb-8 border-t border-gray-100 pt-8">
           <p className="text-sm text-gray-400 font-medium mb-4">Having trouble with your order?</p>
           <button 
             onClick={() => window.location.href = "mailto:munchbaehelp@gmail.com"}
             className="bg-white text-[#2d2d2d] font-bold text-xs px-6 py-3 rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:text-[#e84c3d] transition-all cursor-pointer"
           >
              Contact Support
           </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
