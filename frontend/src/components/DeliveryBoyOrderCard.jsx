import { MdCurrencyRupee, MdOutlineLocationOn, MdAccessTime } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const DeliveryBoyOrderCard = ({ data }) => {
  const shopData = data?.shopOrders;
  const deliveryAddress = data?.deliveryAddress;
  const customer = data?.user;

  // Format the deliveredAt time
  let formattedTime = "N/A";
  if (shopData?.deliveredAt) {
    const dateObj = new Date(shopData.deliveredAt);
    formattedTime = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(dateObj);
  }

  const itemsCount = shopData?.shopOrderItem?.length || 0;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#e8e2d8] p-5 w-full hover:shadow-lg transition-all duration-300">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#2d2d2d] flex items-center gap-2">
            <span className="text-2xl">🏪</span> 
            {shopData?.shop?.name || "Shop Name"}
          </h3>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
            <MdAccessTime className="text-[#e84c3d]" />
            Delivered on: {formattedTime}
          </p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Delivered
        </div>
      </div>

      <hr className="border-[#e8e2d8] my-4 border-dashed" />

      {/* Customer & Location Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Detail */}
        <div className="flex bg-[#f5f0e8] p-3 rounded-xl border border-[#e0d9cc]">
          <div className="bg-[#2d2d2d] text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0">
            <FaUser />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Customer</p>
            <p className="text-sm font-semibold text-[#2d2d2d]">{customer?.fullName || "User"}</p>
          </div>
        </div>

        {/* Location Detail */}
        <div className="flex bg-[#f5f0e8] p-3 rounded-xl border border-[#e0d9cc]">
          <div className="bg-[#e84c3d]/10 text-[#e84c3d] w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0">
            <MdOutlineLocationOn size={20} />
          </div>
          <div>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Delivered To</p>
             <p className="text-xs font-semibold text-[#2d2d2d] line-clamp-2">
                {deliveryAddress?.text || "Address not available"}
             </p>
          </div>
        </div>
      </div>

      <hr className="border-[#e8e2d8] my-4 border-dashed" />

      {/* Order Summary & Earnings */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Items Delivered</p>
          <p className="text-sm font-semibold text-[#2d2d2d] bg-gray-100 px-3 py-1 rounded-full inline-block mt-1">
            {itemsCount} Item{itemsCount > 1 ? "s" : ""}
          </p>
        </div>

        <div className="text-right border-l-2 border-[#e8e2d8] pl-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Delivery Earning</p>
          <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200 mt-1">
            <MdCurrencyRupee size={16} />
            <span className="font-extrabold text-lg">50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyOrderCard;
