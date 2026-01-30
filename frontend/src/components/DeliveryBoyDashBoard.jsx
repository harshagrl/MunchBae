import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect } from "react";

const DeliveryBoyDashBoard = () => {
  const { userData } = useSelector((state) => state.user);
  const getDeliveryPartnerAssignments = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/delivery-partner-assignment`,
        { withCredentials: true },
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeliveryPartnerAssignments();
  }, [userData]);
  return (
    <div className="w-screen min-h-screen flex flex-col bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 py-4 px-2 items-center">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className="w-full max-w-200 flex flex-col gap-5 items-center mt-0 md:mt-20 justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col text-center justify-center gap-2 items-center w-[90%] border border-green-100">
          <h1 className="text-2xl font-semibold text-gray-800 font-mono">
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
      </div>
    </div>
  );
};

export default DeliveryBoyDashBoard;
