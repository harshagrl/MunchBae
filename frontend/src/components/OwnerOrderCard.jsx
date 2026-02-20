import { MdEmail, MdPayments, MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../store/user.slice";
import { useState } from "react";

function OwnerOrderCard({ data }) {
  const dispatch = useDispatch();
  const [availablePartners, setAvailablePartners] = useState([]);

  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true },
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailablePartners(result.data.availableDeliveryPartners);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    preparing: "bg-blue-100 text-blue-700 border-blue-200",
    "out for delivery": "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-5 w-full max-w-3xl border border-white/50 hover:shadow-xl transition-all duration-300">
      {/* Customer Info */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e84c3d] to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
            {data.user.fullName?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#2d2d2d]">{data.user.fullName}</h1>
            <div className="flex flex-col gap-0.5">
              <p className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <MdEmail size={13} />
                {data.user.email}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <FaPhoneAlt size={11} />
                {data.user.mobile}
              </p>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border capitalize ${statusColors[data.shopOrders.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
          {data.shopOrders.status}
        </div>
      </div>

      {/* Payment Info */}
      <div className="flex items-center gap-2 mb-4 bg-amber-50/80 rounded-xl px-4 py-2.5 border border-amber-100">
        <MdPayments size={16} className="text-amber-600" />
        <span className="text-sm text-[#2d2d2d] font-medium">
          {data.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
        </span>
        {data.paymentMethod === "online" && (
          <span className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${data.payment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {data.payment ? "✓ Verified" : "✗ Not Verified"}
          </span>
        )}
      </div>

      {/* Delivery Address */}
      <div className="flex items-start gap-2 mb-4 bg-gray-50/80 rounded-xl px-4 py-2.5 border border-gray-100">
        <MdLocationOn size={18} className="text-[#e84c3d] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-[#2d2d2d] font-semibold">{data?.deliveryAddress?.text}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {data?.deliveryAddress?.latitude}, {data?.deliveryAddress?.longitude}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide mb-4">
        {data.shopOrders.shopOrderItem.map((item, index) => (
          <div
            key={index}
            className="shrink-0 w-36 rounded-xl overflow-hidden bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.item.image}
                alt="food-image"
                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-2 text-center">
              <p className="text-sm font-bold text-[#2d2d2d] truncate">{item.item.name}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                ₹{item.item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Status & Total */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200/80">
        <select
          className="text-[#2d2d2d] rounded-full border-2 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/30 border-gray-200 bg-white shadow-sm cursor-pointer transition-all duration-300 hover:border-[#e84c3d]/40"
          onChange={(e) =>
            handleUpdateStatus(
              data._id,
              data.shopOrders.shop._id,
              e.target.value,
            )
          }
        >
          <option value="">Update Status</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out for delivery">Out For Delivery</option>
        </select>
        <div className="flex items-center gap-1 bg-[#e84c3d]/10 px-4 py-2 rounded-full">
          <span className="text-xs text-gray-500 font-medium">Total</span>
          <span className="text-[#e84c3d] font-extrabold text-lg ml-1">₹{data.shopOrders.subtotal}</span>
        </div>
      </div>

      {/* Delivery Partners Section */}
      {data.shopOrders.status === "out for delivery" && (
        <div className="mt-4 bg-blue-50/80 rounded-xl p-4 border border-blue-100">
          {availablePartners && availablePartners.length > 0 ? (
            <>
              <h2 className="text-sm font-bold text-blue-700 mb-2">
                Available Delivery Partners
              </h2>
              <div className="space-y-2">
                {availablePartners.map((partner) => (
                  <div key={partner.id} className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {partner.fullName?.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2d2d2d]">{partner.fullName}</p>
                      <p className="text-xs text-gray-400">{partner.mobile}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : data.shopOrders.assignedDeliveryPartner ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                {data.shopOrders.assignedDeliveryPartner.fullName?.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Assigned Partner</p>
                <p className="text-sm font-bold text-[#2d2d2d]">
                  {data.shopOrders.assignedDeliveryPartner.fullName}
                </p>
                <p className="text-xs text-gray-400">{data.shopOrders.assignedDeliveryPartner.mobile}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center font-medium">No available delivery partners found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerOrderCard;
