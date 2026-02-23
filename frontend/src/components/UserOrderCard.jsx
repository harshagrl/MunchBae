import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { serverUrl } from "../App";

function UserOrderCard({ data }) {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState({});

  const handleRating = async (itemId, rating) => {
    try {
      await axios.post(
        `${serverUrl}/api/item/rating`,
        { itemId, rating },
        { withCredentials: true }
      );
      setSelectedRating((prev) => ({ ...prev, [itemId]: rating }));
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "preparing":
        return "bg-yellow-100 text-yellow-700";
      case "out for delivery":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-orange-100 text-orange-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#e8e2d8] overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Order Header */}
      <div className="px-5 py-4 border-b border-[#f0ece4] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-extrabold text-[#2d2d2d]">
              Order #{data._id.slice(-6)}
            </h3>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${getStatusColor(
                data.shopOrders?.[0]?.status
              )}`}
            >
              {data.shopOrders?.[0]?.status || "Pending"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Placed on {new Date(data.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            {data.paymentMethod === "cod"
              ? "Cash on Delivery"
              : data.payment
              ? "✓ Paid Online"
              : "Payment Pending"}
          </span>
        </div>
      </div>

      {/* Shop Orders */}
      <div className="px-5 py-4 space-y-4">
        {data.shopOrders.map((shopOrder, index) => (
          <div key={index}>
            {/* Shop Name */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-sm font-bold text-[#2d2d2d]">
                {shopOrder.shop.name}
              </p>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ml-auto ${getStatusColor(
                  shopOrder.status
                )}`}
              >
                {shopOrder.status}
              </span>
            </div>

            {/* Items Row */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {shopOrder.shopOrderItem.map((item, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-32 bg-[#faf8f4] rounded-xl p-2 border border-[#f0ece4] flex flex-col"
                >
                  <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    {item.item?.image ? (
                      <img
                        src={item.item.image}
                        alt={item.item?.name || "food item"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">No Image</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#2d2d2d] mt-1.5 truncate">
                    {item.item?.name || "Deleted Item"}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    ₹{item.item?.price || 0} × {item.quantity}
                  </p>

                  {/* Star Rating */}
                  {shopOrder.status === "delivered" && item.item?._id && (
                    <div className="flex gap-0.5 mt-1.5 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={`text-sm cursor-pointer transition-colors ${
                            selectedRating[item.item._id] >= star
                              ? "text-yellow-400"
                              : "text-gray-200 hover:text-yellow-300"
                          }`}
                          onClick={() => handleRating(item.item._id, star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shop Subtotal */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed border-[#e8e2d8]">
              <p className="text-xs text-gray-400">Shop Subtotal</p>
              <p className="text-sm font-bold text-[#2d2d2d]">
                ₹{shopOrder.subtotal}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-[#faf8f4] border-t border-[#f0ece4] flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Total Amount</p>
          <p className="text-xl font-extrabold text-[#2d2d2d]">
            ₹{data.totalAmount}
          </p>
        </div>
        <button
          className="bg-[#2d2d2d] text-white px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer hover:bg-[#1a1a1a] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          Track Order →
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;
