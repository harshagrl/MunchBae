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
  const [otp, setOtp] = useState("");
  const { userData, socket } = useSelector((state) => state.user);
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
      console.log(result.data);
      // backend returns { message: 'No current active ...' } when there's no assignment
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
      const result = await axios.post(
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

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
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
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket?.on("newAssignment", (data) => {
      if (data.sentTo === userData._id) {
        setAvailableAssignments((prev) => [...prev, data]);
      }
    });
    return () => {
      socket?.off("newAssignment");
    };
  }, [socket]);
  useEffect(() => {
    getDeliveryPartnerAssignments();
    getCurrentOrder();
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
            {userData?.location?.coordinates?.[1]},{" "}
            <span className="underline font-semibold">Longitude:</span>{" "}
            {userData?.location?.coordinates?.[0]}
          </p>
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
            <DeliveryTracking data={currentOrder} />
            {!showOtpBox ? (
              <button
                className="bg-green-600 text-white px-4 font-semibold py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-200"
                onClick={sendDeliveryOtp}
              >
                Mark as Delivered
              </button>
            ) : (
              <div className="flex flex-col gap-2">
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
