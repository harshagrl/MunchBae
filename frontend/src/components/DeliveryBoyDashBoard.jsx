import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import DeliveryTracking from "./DeliveryTracking";

const DeliveryBoyDashBoard = () => {
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [otp, setOtp] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distanceError, setDistanceError] = useState(null);
  const [currentDistance, setCurrentDistance] = useState(null);
  const { userData, socket } = useSelector((state) => state.user);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
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

          // Update local state with real-time location
          setCurrentLocation({
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          });

          // Emit to server
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
    try {
      // Check if current location exists
      if (!currentLocation) {
        setDistanceError("Location not available. Please enable GPS.");
        return;
      }

      // Get customer location
      const customerLat =
        currentOrder?.deliveryAddress?.latitude ||
        currentOrder?.order?.deliveryAddress?.latitude;
      const customerLon =
        currentOrder?.deliveryAddress?.longitude ||
        currentOrder?.order?.deliveryAddress?.longitude;

      if (!customerLat || !customerLon) {
        setDistanceError("Customer location not available.");
        return;
      }

      // Calculate distance
      const distance = calculateDistance(
        parseFloat(currentLocation.latitude),
        parseFloat(currentLocation.longitude),
        customerLat,
        customerLon,
      );

      setCurrentDistance(distance);

      // Check if within 10 meters
      if (distance > 10) {
        setDistanceError(
          `You are ${distance.toFixed(2)} meters away. You must be within 10 meters to send OTP.`,
        );
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
      setShowOtpBox(true);
    } catch (error) {
      console.log(error);
      setDistanceError("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(
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
      console.log(result.data);
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
    <div className="w-screen min-h-screen flex flex-col bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 py-4 px-2 items-center">
      <NavBar />

      <div className="w-full max-w-200 flex flex-col gap-5 items-center mt-0 md:mt-20 justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col text-center justify-center gap-2 items-center w-[90%] border border-green-100">
          <h1 className="text-2xl font-semibold text-green-700 font-mono">
            Welcome,{" "}
            <span className="text-green-700 underline underline-offset-2">
              {userData?.fullName || "Delivery Boy"}!
            </span>
          </h1>
          <p className="text-gray-800 text-md">
            <span className="underline font-semibold">Latitude:</span>{" "}
            {currentLocation?.latitude ||
              userData?.location?.coordinates?.[1] ||
              "N/A"}
            , <span className="underline font-semibold">Longitude:</span>{" "}
            {currentLocation?.longitude ||
              userData?.location?.coordinates?.[0] ||
              "N/A"}
          </p>
          {currentLocation && (
            <p className="text-xs text-green-600 font-semibold animate-pulse">
              ● Live tracking active
            </p>
          )}
        </div>
        {!currentOrder?.shopOrder && (
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col text-center justify-center w-[90%] max-w-200 border border-green-100 gap-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Available Orders
            </h1>
            <div className="space-y-4">
              {availableAssignments.length === 0 ? (
                <p className="text-gray-600">No available orders.</p>
              ) : (
                availableAssignments.map((a, index) => (
                  <div
                    className="border border-gray-300 bg-gray-100 rounded-lg p-4 flex justify-between items-center"
                    key={index}
                  >
                    <div className="text-gray-800 text-start">
                      <p className="text-gray-900 text-lg font-semibold">
                        {a?.shopName}
                      </p>
                      <p>
                        <span className="text-md font-medium font-sans">
                          Address:
                        </span>{" "}
                        {a?.deliveryAddress.text}
                      </p>
                      <p className="text-md font-medium font-sans">
                        {a.items.length} items |{" "}
                        <span className="text-green-700">₹{a.subtotal}</span>
                      </p>
                    </div>
                    <button
                      className="bg-green-600 text-white px-4 font-semibold py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-colors duration-200"
                      onClick={() => acceptOrderAssignment(a.assignmentId)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentOrder?.shopOrder && (
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col text-center justify-center w-[90%] max-w-200 border border-green-100 gap-4">
            <h1 className="text-xl font-bold  text-gray-800">
              📦Current Order
            </h1>
            <div className="text-gray-800 text-lg border border-gray-300 bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
              <p>{currentOrder?.shopOrder?.shop?.name}</p>
              <p>{currentOrder?.deliveryAddress?.text}</p>
              <p>
                {currentOrder?.shopOrder?.shopOrderItem?.length || 0} items | ₹
                {currentOrder?.shopOrder?.subtotal || 0}
              </p>
            </div>
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
            {currentDistance !== null && !showOtpBox && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-blue-700 font-semibold">
                  Distance: {currentDistance.toFixed(2)} meters
                </p>
                {currentDistance <= 10 && (
                  <p className="text-green-600 text-sm font-semibold">
                    ✓ Within delivery range
                  </p>
                )}
              </div>
            )}
            {distanceError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 font-semibold text-sm text-center">
                  {distanceError}
                </p>
              </div>
            )}
            {!showOtpBox ? (
              <button
                className="bg-green-600 text-white px-4 font-semibold py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-200"
                onClick={sendDeliveryOtp}
              >
                Mark as Delivered
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Enter OTP
                  </h3>
                  <button
                    onClick={() => {
                      setShowOtpBox(false);
                      setDistanceError(null);
                      setOtp("");
                    }}
                    className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                  >
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  placeholder={`Enter OTP sent to ${currentOrder?.user.fullName}`}
                  className="border border-gray-300 rounded-lg p-2 w-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                />
                <button
                  className="bg-green-600 text-white px-4 font-semibold py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-200"
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
