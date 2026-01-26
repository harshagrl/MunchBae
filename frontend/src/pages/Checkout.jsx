import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../store/map.slice";
import axios from "axios";
import { FaPaypal } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { MdStickyNote2 } from "react-icons/md";
import { serverUrl } from "../App";

const Checkout = () => {
  const navigate = useNavigate();
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount } = useSelector((state) => state.user);
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
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude }));
      getAddressbyLatLng(latitude, longitude);
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 16, { animate: true });
      }
    });
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
      console.log(result.data);
      navigate("/order-placed");
    } catch (error) {
      console.error(`Place order error: ${error}`);
    }
  };
  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-700 flex justify-center items-center p-6">
      <div
        className="absolute top-4 left-6 z-10 mb-2.5 flex items-center cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <IoIosArrowRoundBack size={30} />
        <h2 className="text-md sm:text-xl">Back</h2>
      </div>
      <div className="w-full mt-10 max-w-225 bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-green-700 font-bold text-center text-2xl underline underline-offset-3">
          Checkout
        </h1>
        <section>
          <h1 className="flex text-gray-800 text-xl font-mono font-semibold items-center gap-2 mb-3 mt-6">
            <FaLocationDot size={16} className="text-green-600" />
            Delivery Location
          </h1>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter your delivery address..."
              className="flex-1 border border-gray-400 rounded-lg focus:outline:none focus:ring-green-600 focus:ring-2 p-2 text-black font-serif"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              className="py-2 px-3.5 bg-green-500 hover:bg-green-600 rounded-lg text-white flex items-center justify-center cursor-pointer"
              onClick={getLatLongByAddress}
            >
              <FaSearch size={16} />
            </button>
            <button
              className="py-2 px-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white flex items-center justify-center cursor-pointer"
              onClick={getCurrentLocation}
            >
              <BiCurrentLocation size={21} />
            </button>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-400">
            <div className="h-64 w-full flex items-center justify-center text-black">
              <MapContainer
                ref={mapRef}
                className={"w-full h-full"}
                center={[location?.lat || 0, location?.long || 0]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[location?.lat, location?.long]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </section>
        <section>
          <h1 className="flex text-gray-800 text-xl font-mono font-semibold items-center gap-1 mb-3 mt-6">
            <FaPaypal size={18} className="text-blue-600" />
            Payment Method
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition duration-300 ${paymentMethod === "cod" ? "hover:border-green-300 bg-green-100 shadow hover:bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-slate-100"} cursor-pointer`}
              onClick={() => setPaymentMethod("cod")}
            >
              <span className="inline-flex h-12 w-12 rounded-full bg-orange-100 items-center justify-center shadow">
                <MdDeliveryDining className="text-orange-500 text-3xl" />
              </span>
              <div>
                <p className="text-gray-800 font-sans font-semibold text-lg">
                  Cash on delivery
                </p>
                <p className="text-gray-500 text-xs">Pay at your doorstep</p>
              </div>
            </div>
            <div
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition duration-300 ${paymentMethod === "online" ? "hover:border-green-300 bg-green-100 shadow hover:bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-slate-100"} cursor-pointer`}
              onClick={() => setPaymentMethod("online")}
            >
              <span className="inline-flex h-12 w-12 rounded-full bg-purple-100 items-center justify-center shadow">
                <FaMobileAlt className="text-purple-500 text-3xl" />
              </span>
              <span className="inline-flex h-12 w-12 rounded-full bg-blue-100 items-center justify-center shadow">
                <CiCreditCard1 className="text-blue-500 text-3xl" />
              </span>
              <div>
                <p className="text-gray-800 font-sans font-semibold text-lg">
                  UPI / Credit / Debit card
                </p>
                <p className="text-gray-500 text-xs">Pay securely online</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h1 className="flex text-gray-800 text-xl font-mono font-semibold items-center gap-1 mb-3 mt-6">
            <MdStickyNote2 size={18} className="text-cyan-700" />
            Order summary
          </h1>
          <div className="rounded-xl border-2 bg-gray-50 p-4 border-gray-200">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between gap-3 font-mono text-md text-slate-600"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <hr className="text-gray-300 my-2" />
            <div className="flex justify-between gap-3 font-mono text-lg text-gray-700 font-bold">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between font-mono gap-3 text-md text-gray-700 font-medium">
              <span>Delivery Fee</span>
              <span>{totalAmount > 500 ? "Free" : `₹${deliveryCharge}`}</span>
            </div>
            {totalAmount < 500 && (
              <p className="text-gray-500 text-xs mb-1">{`(Add items worth ₹${500 - totalAmount} more for free delivery)`}</p>
            )}
            <div className="flex justify-between font-mono gap-3 text-md text-gray-700 font-medium">
              <span>Packing charges</span>
              <span>₹{packingCharge}</span>
            </div>
            <div className="flex justify-between font-mono gap-3 text-md text-gray-700 font-medium">
              <span>Gst(5%)</span>
              <span>₹{GST}</span>
            </div>

            <div className="flex font-mono justify-between gap-3 text-xl text-green-600 font-bold mt-2">
              <span>Total</span>
              <span>₹{amountWithCharges}</span>
            </div>
          </div>
        </section>
        <button
          className="text-white bg-green-500 hover:bg-green-600 transition-all duration-300 cursor-pointer rounded-xl py-3 text-xl font-bold w-full mt-4 font-mono"
          onClick={handlePlaceOrder}
        >
          {paymentMethod === "cod" ? "Place order" : "Pay online"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
