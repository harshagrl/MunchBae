import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

function OwnerOrderCard({ data }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4 w-full max-w-3xl">
      <div className="text-black">
        <h1 className="text-lg font-semibold">{data.user.fullName}</h1>
        <p className="flex items-center gap-1 text-sm text-gray-500 font-medium">
          <MdEmail size={16} />
          {data.user.email}
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-500 font-medium">
          <FaPhoneAlt size={14} />
          {data.user.mobile}
        </p>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <p className="text-black text-md font-medium underline">
          {data?.deliveryAddress?.text}
        </p>
        <p className="text-gray-500 text-sm font-normal">
          <span className="text-md font-medium text-gray-600">Lat:</span>{" "}
          {data?.deliveryAddress?.latitude},{" "}
          <span className="text-md font-medium text-gray-600">Long:</span>{" "}
          {data?.deliveryAddress?.longitude}
        </p>
      </div>

      <div className="flex pb-2 space-x-4 overflow-x-auto">
        {data.shopOrders.shopOrderItem.map((item, index) => (
          <div
            key={index}
            className="shrink-0 w-40 rounded-lg p-2 shadow-md bg-slate-100"
          >
            <img
              src={item.item.image}
              alt="food-image"
              className="w-full h-24 object-cover rounded"
            />
            <p className="text-center text-black mt-2 text-sm font-medium">
              {item.item.name}
            </p>
            <p className="text-gray-500 text-center text-xs font-medium">
              ₹{item.item.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-400">
        <span className="text-gray-900 font-medium text-md">
          Status:{" "}
          <span className="text-blue-600 capitalize">
            {data.shopOrders.status}
          </span>
        </span>
        <select
          value={data.shopOrders.status}
          className="text-black rounded-lg border-2 px-2 text-sm focus:outline-none focus:ring-2 border-green-600 shadow py-1"
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out for delivery">Out For Delivery</option>
        </select>
      </div>
      <div className="text-right text-black font-bold text-md">
        Total: ₹{data.shopOrders.subtotal}
      </div>
    </div>
  );
}

export default OwnerOrderCard;
