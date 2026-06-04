import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

import { setAddress, setLocation } from "../store/map.slice";
import { addMyOrder, clearCart } from "../store/user.slice";
import axios from "axios";
import { FaPaypal } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { MdStickyNote2 } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount, userData } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const mapRef = useRef();
  const [addressInput, setAddressInput] = useState("");
  const deliveryCharge = totalAmount > 500 ? 0 : 30;
  const packingCharge = 15;
  const GST = totalAmount * 0.05;
  const amountWithCharges = totalAmount + deliveryCharge + packingCharge + GST;

  const getAddressbyLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${geoApiKey}`,
      );
      dispatch(
        setAddress(
          result?.data?.results[0].formatted ||
            result?.data?.results[0].address_line2,
        ),
      );
    } catch (error) {
      console.log("Finding address error: ", error);
    }
  };

  const getCurrentLocation = () => {
    const latitude = userData.location.coordinates[1];
    const longitude = userData.location.coordinates[0];
    dispatch(setLocation({ lat: latitude, long: longitude }));
    getAddressbyLatLng(latitude, longitude);
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 16, { animate: true });
    }
  };

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, long: lng }));
    getAddressbyLatLng(lat, lng);
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 16, { animate: true });
    }
  };

  const getLatLongByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${geoApiKey}`,
      );
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, long: lon }));
      dispatch(setAddress(addressInput));
      if (mapRef.current) {
        mapRef.current.setView([lat, lon], 16, { animate: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.long,
          },
          totalAmount: amountWithCharges,
          cartItems,
        },
        { withCredentials: true },
      );
      if (paymentMethod === "cod") {
        dispatch(addMyOrder(result.data));
        dispatch(clearCart());
        navigate("/order-placed");
      } else {
        const orderId = result.data.orderId;
        const razorOrder = result.data.razorOrder;
        openRazorpay(orderId, razorOrder);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };
  const openRazorpay = (orderId, razorOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorOrder.amount,
      currency: "INR",
      name: "MunchBae",
      description: "Food Delivery website",
      order_id: razorOrder.id,
      handler: async function (response) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/order/verify-payment`,
            { razorpay_payment_id: response.razorpay_payment_id, orderId },
            { withCredentials: true },
          );
          dispatch(addMyOrder(result.data));
          dispatch(clearCart());
          navigate("/order-placed");
        } catch (error) {
          toast.error(error.response?.data?.message || "Payment verification failed");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden flex flex-col pt-20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#e84c3d]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] -right-24 w-[450px] h-[450px] bg-orange-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-rose-300/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }}></div>
        
        {/* Floating Food Emojis */}
        <span className="absolute top-[10%] left-[5%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🍕</span>
        <span className="absolute top-[60%] right-[5%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🍔</span>
        <span className="absolute bottom-[15%] left-[8%] text-4xl opacity-15 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌮</span>
        <span className="absolute top-[30%] right-[10%] text-4xl opacity-15 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🌯</span>

        {/* Dashed Rings */}
        <div className="absolute top-[15%] right-[15%] w-32 h-32 rounded-full border-2 border-dashed border-[#e84c3d]/10"></div>
        <div className="absolute bottom-[20%] left-[12%] w-24 h-24 rounded-full border-2 border-dashed border-orange-400/10"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16 w-full">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="group flex items-center gap-1.5 text-[#2d2d2d] hover:text-[#e84c3d] transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#e84c3d] group-hover:text-white transition-all">
              <IoIosArrowRoundBack size={26} />
            </div>
            <span className="font-bold text-sm">Back to Cart</span>
          </button>
          
          <div className="text-right">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] tracking-tight">
              Checkout
            </h1>
            <p className="text-sm text-gray-500 font-medium">Almost there! Complete your order.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Location Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h2 className="text-xl font-extrabold text-[#2d2d2d] mb-5 flex items-center gap-2">
                <FaLocationDot size={18} className="text-[#e84c3d]" />
                Delivery Address
              </h2>
              
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    placeholder="Search or enter your full address..."
                    className="w-full bg-[#f8f6f2] border-2 border-transparent rounded-2xl px-4 py-3 text-sm text-[#2d2d2d] font-medium focus:border-[#e84c3d]/30 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                  />
                </div>
                <button
                  className="w-12 h-12 bg-[#2d2d2d] hover:bg-black rounded-2xl text-white flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95"
                  onClick={getLatLongByAddress}
                >
                  <FaSearch size={16} />
                </button>
                <button
                  className="w-12 h-12 bg-white border border-gray-200 hover:border-[#e84c3d] hover:text-[#e84c3d] rounded-2xl text-gray-600 flex items-center justify-center cursor-pointer transition-all shadow-sm active:scale-95"
                  onClick={getCurrentLocation}
                >
                  <BiCurrentLocation size={20} />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner group">
                <div className="h-64 w-full">
                  <MapContainer
                    ref={mapRef}
                    className={"w-full h-full z-0"}
                    center={[location?.lat || 20, location?.long || 78]}
                    zoom={location?.lat ? 16 : 4}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {location?.lat && (
                      <Marker
                        position={[location?.lat, location?.long]}
                        draggable
                        eventHandlers={{ dragend: onDragEnd }}
                      />
                    )}
                  </MapContainer>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400 font-medium flex items-center gap-1">
                <span>📍</span> Drag the marker to pin your exact location
              </p>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h2 className="text-xl font-extrabold text-[#2d2d2d] mb-5 flex items-center gap-2">
                <FaPaypal size={18} className="text-[#e84c3d]" />
                Payment Method
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`relative overflow-hidden cursor-pointer group p-5 rounded-2xl border-2 transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "bg-orange-50/50 border-[#e84c3d] shadow-md"
                      : "bg-white border-transparent hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      paymentMethod === "cod" ? "bg-[#e84c3d] text-white shadow-lg shadow-red-100" : "bg-orange-50 text-[#e84c3d]"
                    }`}>
                      <MdDeliveryDining size={28} />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#2d2d2d] text-base mb-0.5">Cash on Delivery</p>
                      <p className="text-xs text-gray-500 font-medium">Pay when you get it</p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="absolute top-0 right-0 p-1">
                      <div className="bg-[#e84c3d] text-white w-6 h-6 rounded-bl-xl flex items-center justify-center">
                        <span className="text-[10px]">✓</span>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`relative overflow-hidden cursor-pointer group p-5 rounded-2xl border-2 transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "bg-orange-50/50 border-[#e84c3d] shadow-md"
                      : "bg-white border-transparent hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      paymentMethod === "online" ? "bg-[#e84c3d] text-white shadow-lg shadow-red-100" : "bg-orange-50 text-[#e84c3d]"
                    }`}>
                      <FaMobileAlt size={22} />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#2d2d2d] text-base mb-0.5">Online Payment</p>
                      <p className="text-xs text-gray-500 font-medium">UPI, Cards, Wallets</p>
                    </div>
                  </div>
                  {paymentMethod === "online" && (
                    <div className="absolute top-0 right-0 p-1">
                      <div className="bg-[#e84c3d] text-white w-6 h-6 rounded-bl-xl flex items-center justify-center">
                        <span className="text-[10px]">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Summary Column */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 sticky top-24">
              <h2 className="text-xl font-extrabold text-[#2d2d2d] mb-6 flex items-center gap-2">
                <MdStickyNote2 size={18} className="text-[#e84c3d]" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center group">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#2d2d2d] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-extrabold text-[#2d2d2d]">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t-2 border-dashed border-gray-100">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-[#2d2d2d]">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className={deliveryCharge === 0 ? "text-green-600 font-bold" : "text-[#2d2d2d]"}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Taxes & Charges</span>
                  <span className="text-[#2d2d2d]">₹{(packingCharge + GST).toFixed(2)}</span>
                </div>
                
                {totalAmount < 500 && (
                  <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                    <p className="text-[10px] text-orange-600 font-bold leading-tight uppercase tracking-wider">
                      Free delivery on orders above ₹500
                    </p>
                    <p className="text-[9px] text-orange-400 font-medium mt-0.5">
                      Add ₹{500 - totalAmount} more to save ₹{deliveryCharge}!
                    </p>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Payable</p>
                    <p className="text-3xl font-black text-[#e84c3d]">₹{Math.round(amountWithCharges)}</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-8 bg-gradient-to-r from-[#e84c3d] to-orange-500 text-white rounded-2xl py-4 font-black text-base shadow-lg shadow-red-200 hover:shadow-red-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
                onClick={handlePlaceOrder}
              >
                <span>{paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="mt-4 text-[10px] text-gray-400 text-center font-medium leading-relaxed px-4">
                By placing the order, you agree to our Terms & Conditions and Cancellation Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
