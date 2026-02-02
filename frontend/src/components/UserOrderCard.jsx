import { useNavigate } from "react-router";

function UserOrderCard({ data }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4 w-full max-w-3xl">
      <div className="flex justify-between p-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Order #{data._id.slice(-6)}
          </h3>
          <p className="text-sm text-gray-500 font-medium font-sans">
            Placed on: {data.createdAt.slice(0, 10)}
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Method: {data.paymentMethod?.toUpperCase()}
          </h3>
          <p className="text-sm font-medium text-gray-500 font-sans">
            Status:{" "}
            <span className="text-blue-600 capitalize">
              {data.shopOrders?.[0]?.status || "Pending"}
            </span>
          </p>
        </div>
      </div>
      {data.shopOrders.map((shopOrder, index) => (
        <div
          className="rounded-lg p-3 bg-gray-100 shadow space-y-3"
          key={index}
        >
          <p className="text-green-700 text-lg font-semibold underline underline-offset-2 font-mono">
            {shopOrder.shop.name}
          </p>
          <div className="flex pb-2 space-x-4 overflow-x-auto">
            {shopOrder.shopOrderItem.map((item, index) => (
              <div
                key={index}
                className="shrink-0 w-40 rounded-lg p-2 shadow-md bg-white"
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
          <div className="flex justify-between items-center border-t pt-2 text-black">
            <p className="font-semibold font-sans">
              Subtotal: ₹{shopOrder.subtotal}
            </p>
            <span className="text-blue-600 text-sm font-medium capitalize">
              {shopOrder.status}
            </span>
          </div>
        </div>
      ))}
      <div className="flex justify-between pt-2">
        <h1 className="text-black text-xl font-bold font-sans">
          Total: ₹{data.totalAmount}
        </h1>
        <button
          className="text-white bg-green-500 rounded-lg p-2 font-medium font-sans cursor-pointer hover:bg-green-600 transition-all duration-300"
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          Track order
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;
