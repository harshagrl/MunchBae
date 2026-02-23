import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import NavBar from "../components/NavBar";
import { serverUrl } from "../App";
import { setUserData } from "../store/user.slice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData: user } = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        password: "", // Do not populate password for security
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const executeProfileUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully");
      dispatch(setUserData(data));
      localStorage.setItem("userData", JSON.stringify(data));
      setFormData((prev) => ({ ...prev, password: "" }));
      setShowOtpModal(false);
      setOtp("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (formData.fullName && !/^[A-Za-z\s]+$/.test(formData.fullName)) {
      return toast.error("Name should only contain alphabets.");
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format.");
    }
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      return toast.error("Mobile number must be exactly 10 digits.");
    }
    if (formData.password && formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    setLoading(true);

    if (formData.password) {
      // Require OTP for password changes
      try {
        await axios.post(
          `${serverUrl}/api/auth/send-otp`,
          { email: user.email }, // Send OTP to the currently logged in email
          { withCredentials: true }
        );
        setShowOtpModal(true);
        toast.success(`OTP Sent to ${user.email}`);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to send OTP.");
        setLoading(false);
      }
    } else {
      // No password change, proceed directly
      await executeProfileUpdate();
    }
  };

  const handleVerifyAndSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email: user.email, otp },
        { withCredentials: true }
      );
      // OTP verified, now execute profile update
      await executeProfileUpdate();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f5f0e8] relative overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <NavBar />

      {/* Decorative Background Elements (Consistent with UserDashboard) */}
      <div className="fixed inset-0 top-16 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#e84c3d]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-24 w-[450px] h-[450px] bg-orange-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-rose-300/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
        {/* Back Link */}
        <div className="w-full max-w-2xl mb-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-[#2d2d2d] hover:text-[#e84c3d] transition-colors font-semibold group cursor-pointer"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-[32px] shadow-xl border border-white/50 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] mb-3">
                Edit Profile
              </h1>
              <p className="text-gray-500 font-medium">Update your account information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2d2d2d] ml-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white px-5 py-4 rounded-2xl border border-gray-200 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/20 focus:border-[#e84c3d] transition-all duration-300 placeholder:text-gray-400 font-medium shadow-sm"
                    placeholder="Full Name"
                    disabled={showOtpModal}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2d2d2d] ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white px-5 py-4 rounded-2xl border border-gray-200 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/20 focus:border-[#e84c3d] transition-all duration-300 placeholder:text-gray-400 font-medium shadow-sm"
                    placeholder="Email Address"
                    disabled={showOtpModal}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2d2d2d] ml-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-white px-5 py-4 rounded-2xl border border-gray-200 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/20 focus:border-[#e84c3d] transition-all duration-300 placeholder:text-gray-400 font-medium shadow-sm"
                    placeholder="Mobile Number"
                    disabled={showOtpModal}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#2d2d2d] ml-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white px-5 py-4 rounded-2xl border border-gray-200 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/20 focus:border-[#e84c3d] transition-all duration-300 placeholder:text-gray-400 font-medium shadow-sm pr-12"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      disabled={showOtpModal}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2d2d2d] transition-colors cursor-pointer"
                      disabled={showOtpModal}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {!showOtpModal ? (
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4.5 bg-[#2d2d2d] hover:bg-black text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              ) : (
                <div className="pt-6 mt-6 border-t border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-inner">
                    <h3 className="text-lg font-bold text-[#2d2d2d] mb-2">Verify Password Change</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      An OTP has been sent to <span className="font-semibold">{user.email}</span>. Please enter it to securely update your password.
                    </p>
                    <div className="space-y-4">
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 4-digit OTP"
                        className="w-full bg-white px-5 py-4 rounded-2xl border border-gray-200 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#e84c3d]/20 focus:border-[#e84c3d] text-center text-xl tracking-[0.5em] font-bold shadow-sm"
                      />
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowOtpModal(false);
                            setOtp("");
                          }}
                          disabled={loading}
                          className="flex-1 py-4 text-[#2d2d2d] font-bold rounded-2xl border border-gray-300 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleVerifyAndSave}
                          disabled={loading || otp.length < 4}
                          className="flex-1 py-4 bg-[#e84c3d] hover:bg-[#d63d2e] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                        >
                          {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Verify & Save"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
