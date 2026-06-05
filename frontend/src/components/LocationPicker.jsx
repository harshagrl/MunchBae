import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
} from "../store/user.slice";
import { setAddress, setLocation } from "../store/map.slice";
import { FaLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

const AVAILABLE_CITIES = ["Kapurthala"];

const LocationPicker = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const { currentCity } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const geoApiKey = import.meta.env.VITE_GEO_APIKEY;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectCity = async (city) => {
    dispatch(setCurrentCity(city));
    localStorage.setItem("selectedCity", city);
    setIsOpen(false);
    
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${geoApiKey}`
      );
      if (result.data.features && result.data.features.length > 0) {
        const { lat, lon, formatted, state } = result.data.features[0].properties;
        dispatch(setLocation({ lat, long: lon }));
        dispatch(setAddress(formatted || city));
        dispatch(setCurrentState(state));
        dispatch(setCurrentAddress(formatted || city));
      }
    } catch (error) {
      console.error("Failed to fetch city coordinates", error);
    }
  };

  const handleUseMyLocation = () => {
    setDetectingLocation(true);
    localStorage.removeItem("selectedCity");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, long: longitude }));

        try {
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`,
          );
          const loc = result?.data?.results[0];
          const cityName =
            loc?.state_district ||
            loc?.city ||
            loc?.county ||
            loc?.state ||
            "Kapurthala";
          dispatch(setCurrentCity(cityName));
          dispatch(setCurrentState(loc?.state));
          dispatch(
            setCurrentAddress(
              loc?.formatted || loc?.address_line2,
            ),
          );
          dispatch(
            setAddress(
              loc?.formatted || loc?.address_line2,
            ),
          );
        } catch (error) {
          // Fallback to Kapurthala if reverse geocoding fails
          dispatch(setCurrentCity("Kapurthala"));
        }
        setDetectingLocation(false);
        setIsOpen(false);
      },
      (error) => {
        // Show user-friendly message based on the error
        if (error.code === error.PERMISSION_DENIED) {
          toast.error(
            "Location access is blocked. Please enable location in your browser settings.",
            { duration: 4000 }
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          toast.error(
            "Location unavailable. Please check if your device's location is turned on.",
            { duration: 4000 }
          );
        } else if (error.code === error.TIMEOUT) {
          toast.error(
            "Location request timed out. Please try again.",
            { duration: 3000 }
          );
        }
        dispatch(setCurrentCity("Kapurthala"));
        localStorage.setItem("selectedCity", "Kapurthala");
        setDetectingLocation(false);
        setIsOpen(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const isManuallySelected = !!localStorage.getItem("selectedCity");

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 cursor-pointer rounded-full transition-all duration-200 hover:bg-white/60 ${
          isMobile
            ? "px-2 py-1 text-sm"
            : "px-3 py-2 text-sm"
        } ${
          isOpen
            ? "bg-white/70 shadow-sm"
            : ""
        }`}
      >
        <FaLocationDot className="text-[#e84c3d] shrink-0" />
        <span
          className={`font-medium text-[#2d2d2d] ${
            isMobile ? "truncate max-w-[100px]" : ""
          }`}
        >
          {detectingLocation ? "Detecting..." : currentCity || "Select Location"}
        </span>
        <IoChevronDown
          className={`text-gray-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={isMobile ? 12 : 14}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 py-2 overflow-hidden ${
            isMobile
              ? "left-0 min-w-[200px]"
              : "left-1/2 -translate-x-1/2 min-w-[240px]"
          }`}
          style={{
            animation: "fadeInDown 0.15s ease-out",
          }}
        >
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Choose Location
            </p>
          </div>

          {/* Use My Location */}
          <button
            onClick={handleUseMyLocation}
            disabled={detectingLocation}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
              !isManuallySelected
                ? "bg-[#e84c3d]/5 text-[#e84c3d]"
                : "text-[#2d2d2d] hover:bg-gray-50"
            } ${detectingLocation ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                !isManuallySelected
                  ? "bg-[#e84c3d]/10"
                  : "bg-gray-100"
              }`}
            >
              <MdMyLocation
                className={
                  !isManuallySelected ? "text-[#e84c3d]" : "text-gray-500"
                }
                size={16}
              />
            </div>
            <div className="text-left">
              <span className="block">
                {detectingLocation ? "Detecting location..." : "Use My Location"}
              </span>
              {detectingLocation && (
                <span className="text-xs text-gray-400">Please wait...</span>
              )}
            </div>
            {!isManuallySelected && !detectingLocation && (
              <span className="ml-auto w-2 h-2 rounded-full bg-[#e84c3d] shrink-0" />
            )}
          </button>

          <div className="mx-3 border-t border-gray-100" />

          {/* City List */}
          <div className="py-1">
            <p className="px-4 py-1.5 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              Available Cities
            </p>
            {AVAILABLE_CITIES.map((city) => {
              const isActive = isManuallySelected && currentCity === city;
              return (
                <button
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#e84c3d]/5 text-[#e84c3d]"
                      : "text-[#2d2d2d] hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isActive ? "bg-[#e84c3d]/10" : "bg-gray-100"
                    }`}
                  >
                    <FaLocationDot
                      className={isActive ? "text-[#e84c3d]" : "text-gray-400"}
                      size={14}
                    />
                  </div>
                  <span>{city}</span>
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#e84c3d] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Inline animation keyframes */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LocationPicker;
