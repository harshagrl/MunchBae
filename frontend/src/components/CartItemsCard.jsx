import React from "react";

const CartItemsCard = ({ data }) => {
  return (
    <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow border-2 border-black">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-30 h-30 object-cover rounded-lg border"
        />
        <div>
          <h1 className="text-black font-semibold font-sans text-lg">
            {data.name}
          </h1>
          <p className="text-gray-600 font-sans font-medium text-md">
            ₹{data.price} x {data.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemsCard;
