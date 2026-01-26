import React from "react";

function UserOrderCard({ data }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4 w-full max-w-3xl">
      <div className="flex justify-between p-2 border-b-2 border-black">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Order #{data._id.slice(-6)}
          </h3>
          <p className="text-sm text-gray-700 font-sans">
            Placed on: {data.createdAt.slice(0, 10)}
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Method: {data.paymentMethod?.toUpperCase()}
          </h3>
          <p className="text-sm text-gray-700 font-sans">
            Status:{" "}
            <span className="text-blue-600">
              {data.shopOrders?.[0]?.status || "Pending"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserOrderCard;
