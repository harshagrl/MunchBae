import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MdStorefront, MdLocationOn, MdDriveFileRenameOutline } from "react-icons/md";
import { FaMapMarkerAlt, FaCity, FaImage } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { serverUrl } from "../App";
import { setMyShopData } from "../store/owner.slice";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import toast from "react-hot-toast";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = React.useState(myShopData?.name || "");
  const [city, setCity] = React.useState(myShopData?.city || currentCity || "");
  const [state, setState] = React.useState(
    myShopData?.state || currentState || ""
  );
  const [address, setAddress] = React.useState(
    myShopData?.address || currentAddress || ""
  );
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [rawImage, setRawImage] = useState(null);

  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawImage(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(rawImage, croppedAreaPixels);
      
      // Convert Object URL back to a File for the backend
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "cropped_image.jpg", { type: "image/jpeg" });

      setBackendImage(file);
      setFrontendImage(croppedImageUrl);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setRawImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit-shop`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      toast.success(isEditMode ? "Shop updated successfully!" : "Shop created successfully!");
      setLoading(false);
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save shop details");
      setLoading(false);
    }
  };

  const isEditMode = !!myShopData;

  return (
    <div
      className="w-screen min-h-screen bg-[#f5f0e8] relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      {/* ===== Full-Page Decorative Background ===== */}
      <div className="fixed inset-0 top-16 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#e84c3d]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[20%] -right-24 w-[450px] h-[450px] bg-orange-400/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-[55%] -left-20 w-[400px] h-[400px] bg-amber-300/18 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-rose-300/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-[#e84c3d]/10 rounded-full blur-[100px]"></div>

        <span className="absolute top-[8%] left-[6%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>🍕</span>
        <span className="absolute top-[15%] right-[8%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🍔</span>
        <span className="absolute top-[35%] left-[3%] text-4xl opacity-25 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍩</span>
        <span className="absolute top-[50%] right-[5%] text-5xl opacity-30 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>🌮</span>
        <span className="absolute top-[65%] left-[8%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🍟</span>
        <span className="absolute top-[25%] right-[3%] text-3xl opacity-25 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }}>🧁</span>
        <span className="absolute top-[75%] right-[7%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '2s' }}>🍰</span>
        <span className="absolute top-[80%] left-[5%] text-5xl opacity-25 animate-bounce" style={{ animationDuration: '3.6s', animationDelay: '1.2s' }}>🥤</span>

        <div className="absolute top-[10%] right-[18%] w-36 h-36 rounded-full border-[3px] border-dashed border-[#e84c3d]/20"></div>
        <div className="absolute top-[45%] left-[12%] w-28 h-28 rounded-full border-[3px] border-dashed border-orange-400/20"></div>
        <div className="absolute top-[70%] right-[20%] w-24 h-24 rounded-full border-2 border-dashed border-amber-400/25"></div>
        <div className="absolute top-[30%] left-[50%] w-20 h-20 rounded-full border-2 border-dashed border-rose-300/20 -translate-x-1/2"></div>

        <div className="absolute top-[12%] left-[25%] w-3 h-3 bg-[#e84c3d]/30 rounded-full"></div>
        <div className="absolute top-[22%] right-[25%] w-2.5 h-2.5 bg-orange-400/35 rounded-full"></div>
        <div className="absolute top-[55%] left-[35%] w-3.5 h-3.5 bg-amber-400/30 rounded-full"></div>
        <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-rose-400/25 rounded-full"></div>
        <div className="absolute top-[68%] right-[30%] w-2.5 h-2.5 bg-[#e84c3d]/25 rounded-full"></div>
        <div className="absolute top-[85%] left-[45%] w-3 h-3 bg-orange-300/30 rounded-full"></div>
        <div className="absolute top-[5%] left-[60%] w-2 h-2 bg-amber-500/35 rounded-full"></div>
        <div className="absolute top-[48%] right-[12%] w-2.5 h-2.5 bg-rose-500/20 rounded-full"></div>

        <svg className="absolute top-[6%] left-[45%] w-8 h-8 text-amber-400/40 animate-pulse" style={{ animationDuration: '2s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[38%] right-[15%] w-7 h-7 text-[#e84c3d]/30 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <svg className="absolute top-[72%] left-[20%] w-6 h-6 text-orange-400/35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>

        <svg className="absolute top-[28%] left-0 w-full h-16 opacity-[0.06]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30" stroke="#e84c3d" strokeWidth="3" />
        </svg>
        <svg className="absolute top-[60%] left-0 w-full h-16 opacity-[0.05]" viewBox="0 0 1200 60" fill="none">
          <path d="M0 30 Q150 60 300 30 T600 30 T900 30 T1200 30" stroke="#f97316" strokeWidth="2" />
        </svg>
      </div>
      {/* ===== End Decorative Background ===== */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8 min-h-[calc(100vh-64px)]">

        {/* Back Button */}
        <div className="w-full max-w-xl mb-6">
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm text-[#2d2d2d] px-5 py-2.5 rounded-full hover:bg-white transition-all duration-300 cursor-pointer shadow-md border border-white/50 font-medium text-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <IoIosArrowRoundBack size={24} />
            Back to Dashboard
          </button>
        </div>

        {/* Form Card */}
        <div className="max-w-xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-10 border border-white/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500">

          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-8 gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#e84c3d] to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <MdStorefront className="text-white w-10 h-10" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl text-[#2d2d2d] font-extrabold">
                {isEditMode ? "Edit Your Shop" : "Create Your Shop"}
              </h1>
              <p className="text-gray-500 text-sm mt-2 max-w-sm leading-relaxed">
                {isEditMode
                  ? "Update your shop details to keep your profile fresh."
                  : "Set up your restaurant and start reaching hungry customers."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Shop Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                <MdDriveFileRenameOutline className="text-[#e84c3d]" size={16} />
                Shop Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/50 focus:border-[#e84c3d] text-[#2d2d2d] font-medium placeholder-gray-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                placeholder="Enter your shop name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* Shop Image */}
            <div>
              <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                <FaImage className="text-orange-500" size={14} />
                Shop Image
              </label>
              <label className="flex flex-col items-center justify-center w-full px-4 py-5 bg-white/60 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#e84c3d]/40 hover:bg-[#e84c3d]/5 transition-all duration-300 group/upload">
                <HiOutlineUpload className="text-gray-400 group-hover/upload:text-[#e84c3d] transition-colors duration-300 mb-1" size={24} />
                <span className="text-sm text-gray-500 group-hover/upload:text-[#e84c3d] font-medium transition-colors duration-300">
                  {frontendImage ? "Change Image" : "Click to upload"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
              {frontendImage && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-white/50 shadow-lg">
                  <img
                    src={frontendImage}
                    alt="image preview"
                    className="w-full h-48 object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
            </div>

            {/* State & City Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                  <MdLocationOn className="text-[#e84c3d]" size={16} />
                  State
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/50 focus:border-[#e84c3d] text-[#2d2d2d] font-medium placeholder-gray-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                  placeholder="Enter state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                  <FaCity className="text-amber-500" size={14} />
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/50 focus:border-[#e84c3d] text-[#2d2d2d] font-medium placeholder-gray-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                  placeholder="Enter city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
            </div>

            {/* Shop Address */}
            <div>
              <label className="flex items-center gap-2 text-[#2d2d2d] text-sm font-bold mb-2.5">
                <FaMapMarkerAlt className="text-rose-500" size={14} />
                Shop Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/50 focus:border-[#e84c3d] text-[#2d2d2d] font-medium placeholder-gray-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                placeholder="Enter your shop address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#e84c3d] to-orange-500 hover:from-[#d63a2c] hover:to-orange-600 text-white font-bold py-3.5 px-6 rounded-xl cursor-pointer transition-all duration-300 mt-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={22} color="white" />
              ) : (
                <>
                  <MdStorefront size={22} />
                  {isEditMode ? "Update Shop" : "Create Shop"}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs font-medium">
            Powered by <span className="text-[#e84c3d] font-bold">MunchBae</span> ✨
          </p>
        </div>
      </div>

      {/* ===== CROPPER MODAL ===== */}
      {showCropper && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white z-10">
              <h3 className="text-xl font-extrabold text-[#2d2d2d]">Crop Shop Image</h3>
              <p className="text-xs text-gray-400 font-medium">Drag to format perfectly</p>
            </div>
            
            <div className="relative flex-1 w-full bg-gray-100">
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9} // Common aspect ratio for beautiful wide banners
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center z-10">
              <div className="flex-1 w-full max-w-xs flex items-center gap-4">
                <span className="text-xs text-gray-500 font-bold">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#e84c3d]"
                />
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCropCancel}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full text-[#2d2d2d] font-bold border-2 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCropConfirm}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full text-white font-bold bg-[#e84c3d] shadow-lg shadow-[#e84c3d]/30 hover:shadow-[#e84c3d]/50 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Confirm Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEditShop;
