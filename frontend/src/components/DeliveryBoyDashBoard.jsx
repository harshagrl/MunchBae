import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import DeliveryTracking from "./DeliveryTracking";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClipLoader } from "react-spinners";

const DeliveryBoyDashBoard = () => {
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [otp, setOtp] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distanceError, setDistanceError] = useState(null);
  const [currentDistance, setCurrentDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, socket } = useSelector((state) => state.user);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  useEffect(() => {
    if (!socket || userData?.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation({
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          });
          socket.emit("updateLocation", {
            latitude,
            longitude,
            userId: userData._id,
          });
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    }
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [socket, userData]);

  const ratePerDelivery = 50;
  const totalEarning = todayDeliveries.reduce(
    (sum, d) => sum + d.count * ratePerDelivery,
    0,
  );

  useEffect(() => {
    if (!socket) return;
    const handleLocationUpdate = ({ latitude, longitude }) => {
      setCurrentLocation({
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
      });
    };
    socket.on("updateDeliveryLocation", handleLocationUpdate);
    return () => {
      socket.off("updateDeliveryLocation", handleLocationUpdate);
    };
  }, [socket]);

  const getDeliveryPartnerAssignments = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/delivery-partner-assignment`,
        { withCredentials: true },
      );
      setAvailableAssignments(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          withCredentials: true,
        },
      );
      if (result.data && result.data.message) {
        setCurrentOrder(null);
      } else {
        setCurrentOrder(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrderAssignment = async (assignmentId) => {
    try {
      await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, {
        withCredentials: true,
      });
      await getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const sendDeliveryOtp = async () => {
    setLoading(true);
    try {
      if (!currentLocation) {
        setDistanceError("Location not available. Please enable GPS.");
        setLoading(false);
        return;
      }
      const customerLat =
        currentOrder?.deliveryAddress?.latitude ||
        currentOrder?.order?.deliveryAddress?.latitude;
      const customerLon =
        currentOrder?.deliveryAddress?.longitude ||
        currentOrder?.order?.deliveryAddress?.longitude;
      if (!customerLat || !customerLon) {
        setDistanceError("Customer location not available.");
        setLoading(false);
        return;
      }
      const distance = calculateDistance(
        parseFloat(currentLocation.latitude),
        parseFloat(currentLocation.longitude),
        customerLat,
        customerLon,
      );
      setCurrentDistance(distance);
      if (distance > 10) {
        setDistanceError(
          `You are ${distance.toFixed(2)} meters away. You must be within 10 meters to send OTP.`,
        );
        setLoading(false);
        return;
      }
      setDistanceError(null);
      await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
        },
        {
          withCredentials: true,
        },
      );
      setLoading(false);
      setShowOtpBox(true);
    } catch (error) {
      console.log(error);
      setDistanceError("Error sending OTP. Please try again.");
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setMessage("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          otp: otp,
        },
        {
          withCredentials: true,
        },
      );
      setMessage(result.data.message);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-today-deliveries`,
        {
          withCredentials: true,
        },
      );
      setTodayDeliveries(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleNewAssignment = (data) => {
      if (data.sentTo === userData._id) {
        setAvailableAssignments((prev) => [...prev, data]);
      }
    };
    socket?.on("newAssignment", handleNewAssignment);
    return () => {
      socket?.off("newAssignment", handleNewAssignment);
    };
  }, [socket, userData]);

  useEffect(() => {
    getDeliveryPartnerAssignments();
    getCurrentOrder();
    handleTodayDeliveries();
  }, [userData]);

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* NavBar */}
      <NavBar />

      {/* ===== Full-Page Decorative Background ===== */}
      <div className="fixed inset-0 top-16 pointer-events-none z-0" aria-hidden="true">
        {/* Large Gradient Blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#e84c3d]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] -right-24 w-[450px] h-[450px] bg-orange-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-[55%] -left-20 w-[400px] h-[400px] bg-amber-300/18 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-rose-300/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-[#e84c3d]/10 rounded-full blur-[100px]"></div>

        {/* Floating Delivery Emojis */}
        <span className="absolute top-[8%] left-[6%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>🛵</span>
        <span className="absolute top-[15%] right-[8%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>📦</span>
        <span className="absolute top-[35%] left-[3%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍕</span>
        <span className="absolute top-[50%] right-[5%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🗺️</span>
        <span className="absolute top-[65%] left-[8%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🍔</span>
        <span className="absolute top-[25%] right-[3%] text-3xl opacity-25 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>⏱️</span>
        <span className="absolute top-[75%] right-[7%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '2s' }}>🏠</span>
        <span className="absolute top-[80%] left-[5%] text-5xl opacity-25 animate-bounce" style={{ animationDuration: '3.6s', animationDelay: '1.2s' }}>🍟</span>

        {/* Dashed Decorative Rings */}
        <div className="absolute top-[10%] right-[18%] w-36 h-36 rounded-full border-[3px] border-dashed border-[#e84c3d]/20"></div>
        <div className="absolute top-[45%] left-[12%] w-28 h-28 rounded-full border-[3px] border-dashed border-orange-400/20"></div>
        <div className="absolute top-[70%] right-[20%] w-24 h-24 rounded-full border-2 border-dashed border-amber-400/25"></div>
        <div className="absolute top-[30%] left-[50%] w-20 h-20 rounded-full border-2 border-dashed border-rose-300/20 -translate-x-1/2"></div>

        {/* Scattered Dots */}
        <div className="absolute top-[12%] left-[25%] w-3 h-3 bg-[#e84c3d]/30 rounded-full"></div>
        <div className="absolute top-[22%] right-[25%] w-2.5 h-2.5 bg-orange-400/35 rounded-full"></div>
        <div className="absolute top-[55%] left-[35%] w-3.5 h-3.5 bg-amber-400/30 rounded-full"></div>
        <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-rose-400/25 rounded-full"></div>
        <div className="absolute top-[68%] right-[30%] w-2.5 h-2.5 bg-[#e84c3d]/25 rounded-full"></div>
        <div className="absolute top-[85%] left-[45%] w-3 h-3 bg-orange-300/30 rounded-full"></div>
        <div className="absolute top-[5%] left-[60%] w-2 h-2 bg-amber-500/35 rounded-full"></div>
        <div className="absolute top-[48%] right-[12%] w-2.5 h-2.5 bg-rose-500/20 rounded-full"></div>

        {/* Star Sparkles */}
        <svg className="absolute top-[6%] left-[45%] w-8 h-8 text-amber-400/40 animate-pulse" style={{ animationDuration: '2s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[38%] right-[15%] w-7 h-7 text-[#e84c3d]/30 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[72%] left-[20%] w-6 h-6 text-orange-400/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>

        {/* Wavy Decorative Lines */}
        <svg className="absolute top-[28%] left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30" stroke="#e84c3d" strokeWidth="3" />
        </svg>
        <svg className="absolute top-[60%] left-0 w-full h-16 opacity-[0.05]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 60 300 30 T600 30 T900 30 T1200 30" stroke="#f97316" strokeWidth="2" />
        </svg>
      </div>
      {/* ===== End Decorative Background ===== */}

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-6">

        {/* Welcome Card */}
        <div
          className="rounded-2xl p-6 md:p-8 border border-white/60 shadow-lg"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e84c3d] to-orange-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
              {userData?.fullName?.slice(0, 1).toUpperCase() || "D"}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1
                className="text-2xl md:text-3xl font-extrabold text-[#2d2d2d] mb-1"
              >
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-[#e84c3d] to-orange-500 bg-clip-text text-transparent">
                  {userData?.fullName || "Delivery Partner"}!
                </span>
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Your deliveries are making people smile 😊
              </p>
            </div>
          </div>

          {/* Location & Status Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 bg-[#f5f0e8] rounded-full px-4 py-2 text-sm text-[#2d2d2d] font-medium border border-[#e0d9cc]">
              <span className="text-[#e84c3d]">📍</span>
              <span>
                {currentLocation?.latitude ||
                  userData?.location?.coordinates?.[1] ||
                  "N/A"}
                ,{" "}
                {currentLocation?.longitude ||
                  userData?.location?.coordinates?.[0] ||
                  "N/A"}
              </span>
            </div>
            {currentLocation && (
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-green-700 font-semibold text-xs">Live Tracking Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            className="rounded-2xl p-5 border border-white/60 shadow-md text-center"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <p className="text-3xl font-bold text-[#e84c3d]">
              {todayDeliveries.reduce((sum, d) => sum + d.count, 0)}
            </p>
            <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
              Today's Deliveries
            </p>
          </div>
          <div
            className="rounded-2xl p-5 border border-white/60 shadow-md text-center"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <p className="text-3xl font-bold text-orange-500">
              ₹{totalEarning}
            </p>
            <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
              Today's Earnings
            </p>
          </div>
          <div
            className="rounded-2xl p-5 border border-white/60 shadow-md text-center col-span-2 md:col-span-1"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <p className="text-3xl font-bold text-amber-500">
              {availableAssignments.length}
            </p>
            <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
              Pending Orders
            </p>
          </div>
        </div>

        {/* Today's Deliveries Chart */}
        <div
          className="rounded-2xl p-6 border border-white/60 shadow-lg"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-[#2d2d2d] mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span> Today's Activity
          </h2>
          {todayDeliveries && todayDeliveries.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={todayDeliveries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0d9cc" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={(h) => `${h}:00`}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => [value, "deliveries"]}
                  labelFormatter={(label) => `${label}:00`}
                  contentStyle={{
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid #e0d9cc',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="count" fill="#e84c3d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10">
              <p className="text-5xl mb-3">🛵</p>
              <p className="text-gray-500 font-medium">No deliveries yet today</p>
              <p className="text-gray-400 text-sm mt-1">Accept an order to get started!</p>
            </div>
          )}
        </div>

        {/* Available Orders */}
        {!currentOrder?.shopOrder && (
          <div
            className="rounded-2xl p-6 border border-white/60 shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-[#2d2d2d] mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span> Available Orders
            </h2>
            <div className="flex flex-col gap-3">
              {availableAssignments.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-5xl mb-3">📭</p>
                  <p className="text-gray-500 font-medium">No available orders right now</p>
                  <p className="text-gray-400 text-sm mt-1">
                    New orders will appear here automatically
                  </p>
                </div>
              ) : (
                availableAssignments.map((a, index) => (
                  <div
                    className="bg-white/70 border border-[#e0d9cc] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
                    key={index}
                  >
                    <div className="flex-1">
                      <p className="text-lg font-bold text-[#2d2d2d] flex items-center gap-2">
                        <span className="text-[#e84c3d]">🏪</span>
                        {a?.shopName}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <span>📍</span>
                        {a?.deliveryAddress.text}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-semibold bg-[#f5f0e8] text-[#2d2d2d] px-3 py-1 rounded-full border border-[#e0d9cc]">
                          {a.items.length} items
                        </span>
                        <span className="text-sm font-bold text-[#e84c3d]">
                          ₹{a.subtotal}
                        </span>
                      </div>
                    </div>
                    <button
                      className="bg-gradient-to-r from-[#e84c3d] to-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-300 whitespace-nowrap"
                      onClick={() => acceptOrderAssignment(a.assignmentId)}
                    >
                      Accept Order
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Current Order */}
        {currentOrder?.shopOrder && (
          <div
            className="rounded-2xl p-6 border-2 border-[#e84c3d]/30 shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-[#2d2d2d] mb-4 flex items-center gap-2">
              <span className="text-2xl">📦</span> Current Order
            </h2>

            {/* Order Details Card */}
            <div className="bg-gradient-to-br from-[#f5f0e8] to-white rounded-xl p-4 border border-[#e0d9cc] mb-4">
              <p className="text-lg font-bold text-[#2d2d2d] flex items-center gap-2">
                <span className="text-[#e84c3d]">🏪</span>
                {currentOrder?.shopOrder?.shop?.name}
              </p>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                <span>📍</span>
                {currentOrder?.deliveryAddress?.text}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-semibold bg-white text-[#2d2d2d] px-3 py-1 rounded-full border border-[#e0d9cc]">
                  {currentOrder?.shopOrder?.shopOrderItem?.length || 0} items
                </span>
                <span className="text-sm font-bold text-[#e84c3d]">
                  ₹{currentOrder?.shopOrder?.subtotal || 0}
                </span>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-[#e0d9cc] shadow-md">
              <DeliveryTracking
                data={{
                  deliveryPartnerLocation: currentLocation
                    ? {
                        lat: parseFloat(currentLocation.latitude),
                        long: parseFloat(currentLocation.longitude),
                      }
                    : {
                        lat: userData?.location?.coordinates?.[1] || 0,
                        long: userData?.location?.coordinates?.[0] || 0,
                      },
                  customerLocation: {
                    lat:
                      currentOrder?.deliveryAddress?.latitude ||
                      currentOrder?.order?.deliveryAddress?.latitude ||
                      0,
                    long:
                      currentOrder?.deliveryAddress?.longitude ||
                      currentOrder?.order?.deliveryAddress?.longitude ||
                      0,
                  },
                }}
              />
            </div>

            {/* Distance Info */}
            {currentDistance !== null && !showOtpBox && (
              <div className="mt-4 bg-[#f5f0e8] border border-[#e0d9cc] rounded-xl p-4 text-center">
                <p className="text-[#2d2d2d] font-bold text-lg">
                  📏 {currentDistance.toFixed(2)} meters away
                </p>
                {currentDistance <= 10 && (
                  <p className="text-green-600 text-sm font-semibold mt-1 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    Within delivery range
                  </p>
                )}
              </div>
            )}

            {/* Distance Error */}
            {distanceError && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-semibold text-sm text-center">
                  ⚠️ {distanceError}
                </p>
              </div>
            )}

            {/* OTP Section */}
            {!showOtpBox ? (
              <button
                className="mt-5 w-full bg-gradient-to-r from-[#e84c3d] to-orange-500 text-white px-6 py-3.5 rounded-xl font-bold text-base hover:shadow-lg hover:scale-[1.02] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                onClick={sendDeliveryOtp}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  <>
                    <span>✅</span> Mark as Delivered
                  </>
                )}
              </button>
            ) : (
              <div className="mt-5 bg-[#f5f0e8] rounded-xl p-5 border border-[#e0d9cc]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#2d2d2d] flex items-center gap-2">
                    <span>🔐</span> Enter OTP
                  </h3>
                  <button
                    onClick={() => {
                      setShowOtpBox(false);
                      setDistanceError(null);
                      setOtp("");
                    }}
                    className="w-8 h-8 rounded-full bg-white border border-[#e0d9cc] flex items-center justify-center text-gray-400 hover:text-[#e84c3d] hover:border-[#e84c3d] transition-all duration-200 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  placeholder={`Enter OTP sent to ${currentOrder?.user.fullName}`}
                  className="w-full bg-white border border-[#e0d9cc] rounded-xl px-4 py-3 text-[#2d2d2d] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/40 focus:border-[#e84c3d] transition-all duration-200 placeholder:text-gray-400 mb-3"
                />
                {message && (
                  <p className="text-[#2d2d2d] text-sm font-semibold text-center mb-3 bg-white rounded-lg py-2 border border-[#e0d9cc]">
                    {message}
                  </p>
                )}
                <button
                  className="w-full bg-gradient-to-r from-[#e84c3d] to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-[1.02] cursor-pointer transition-all duration-300"
                  onClick={verifyOtp}
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoyDashBoard;
