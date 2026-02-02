import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { serverUrl } from "../App";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryTracking from "../components/DeliveryTracking";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState();
  const handleGetOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true },
      );
      setCurrentOrder(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetOrder();
  }, [orderId]);
  return (
    <div className="mx-auto p-4 flex flex-col gap-6 bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 min-h-screen w-full">
      <div
        className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer"
        onClick={() => navigate("/my-orders")}
      >
        <IoIosArrowRoundBack size={30} />
        <h2 className="text-md sm:text-xl">Back</h2>
      </div>
      <div className="mt-10 flex flex-col gap-5 min-w-md md:min-w-3xl lg:min-w-4xl justify-center mx-auto">
        {currentOrder?.shopOrders?.map((shopOrder, index) => (
          <div
            className="bg-white p-4 rounded-2xl shadow-md border-green-200 space-y-4 border-2"
            key={index}
          >
            <div className="text-black">
              <p className="text-xl font-bold text-green-700">
                {shopOrder.shop.name}
              </p>
              <p className="font-normal">
                <span className="font-semibold underline">Items:</span>{" "}
                {shopOrder.shopOrderItem?.map((i) => i.name).join(",")}
              </p>
              <p className="font-normal">
                <span className="font-semibold underline">SubTotal:</span> ₹
                {shopOrder.subtotal}
              </p>
              <p className="font-normal">
                <span className="font-semibold underline">
                  Delivery Address:
                </span>{" "}
                {currentOrder.deliveryAddress.text},{" "}
              </p>
            </div>
            {shopOrder.status != "delivered" ? (
              <>
                {shopOrder.assignedDeliveryPartner ? (
                  <div className="text-black">
                    <p className="font-normal">
                      <span className="font-semibold ">
                        Delivery partner name:
                      </span>{" "}
                      {shopOrder.assignedDeliveryPartner.fullName}
                    </p>
                    <p className="font-normal">
                      <span className="font-semibold ">
                        Delivery partner mobile no:
                      </span>{" "}
                      {shopOrder.assignedDeliveryPartner.mobile}
                    </p>
                  </div>
                ) : (
                  <p>Delivery partner not assigned yet</p>
                )}
              </>
            ) : (
              <p className="text-green-700 font-semibold">Delivered</p>
            )}
            {shopOrder.assignedDeliveryPartner && (
              <div className="h-100 w-full rounded-2xl overflow-hidden shadow-md">
                <DeliveryTracking
                  data={{
                    deliveryPartnerLocation: {
                      lat: shopOrder.assignedDeliveryPartner.location
                        .coordinates[1],
                      long: shopOrder.assignedDeliveryPartner.location
                        .coordinates[0],
                    },
                    customerLocation: {
                      lat: currentOrder.deliveryAddress.latitude,
                      long: currentOrder.deliveryAddress.longitude,
                    },
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrderPage;
