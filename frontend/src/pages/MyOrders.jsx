import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import { setMyOrders } from "../store/user.slice";

const MyOrders = () => {
  const { userData, myOrders, socket } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    socket?.on("newOrder", (data) => {
      if (data.shopOrders?.owner._id === userData._id) {
        dispatch(setMyOrders([data, ...myOrders]));
      }
    });
    return () => {
      socket?.off("newOrder");
    };
  }, [socket]);
  return (
    <div className="w-full min-h-screen flex justify-center p-4 bg-linear-to-b from-slate-900 via-slate-800 to-slate-700">
      <div className="w-full max-w-200 p-4">
        <div
          className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <IoIosArrowRoundBack size={30} />
          <h2 className="text-md sm:text-xl">Back</h2>
        </div>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-green-600 underline text-center mb-2.5">
          My Orders
        </div>
        {myOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-xl text-white mb-4">No orders found</h2>
          </div>
        )}
        <div className="space-y-6 flex items-center justify-center flex-col mt-10">
          {myOrders.map((order, index) =>
            userData.role === "user" ? (
              <UserOrderCard data={order} key={index} />
            ) : userData.role === "owner" ? (
              <OwnerOrderCard data={order} key={index} />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
