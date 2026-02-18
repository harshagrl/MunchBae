import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setStep(2);
      console.log(result);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setStep(3);
      console.log(result);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      navigate("/signin");
      console.log(result);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const stepTitles = [
    { title: "Forgot Password?", subtitle: "Enter your email to receive an OTP." },
    { title: "Verify OTP", subtitle: "Enter the OTP sent to your email." },
    { title: "Reset Password", subtitle: "Create a new password for your account." },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:border-transparent transition-all duration-300 placeholder:text-gray-400";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-100"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Back Arrow */}
            <Link
              to="/signin"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#2d2d2d] text-sm font-medium mb-6 transition-colors duration-300"
            >
              <IoArrowBack size={18} />
              <span>Back to Login</span>
            </Link>

            {/* Step Progress Indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                      step >= s ? "bg-[#2d2d2d]" : "bg-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] mb-2">
                {stepTitles[step - 1].title}
              </h1>
              <p className="text-gray-500 text-sm">
                {stepTitles[step - 1].subtitle}
              </p>
            </div>

            {/* Step 1: Email */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <input
                    id="forgot-email"
                    type="email"
                    className={inputClass}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>

                {err && err.length > 0 && (
                  <p className="text-red-500 text-sm">{err}</p>
                )}

                <button
                  className="w-full py-3.5 bg-[#2d2d2d] hover:bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <input
                    id="forgot-otp"
                    type="text"
                    className={inputClass}
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    required
                    maxLength={6}
                  />
                </div>

                {err && err.length > 0 && (
                  <p className="text-red-500 text-sm">{err}</p>
                )}

                <button
                  className="w-full py-3.5 bg-[#2d2d2d] hover:bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <button
                  className="w-full text-center text-sm text-gray-400 hover:text-[#2d2d2d] font-medium transition-colors duration-300 cursor-pointer"
                  onClick={() => {
                    setErr("");
                    handleSendOtp();
                  }}
                  disabled={loading}
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    className={inputClass}
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {!showNewPassword ? (
                      <FaRegEye size={18} />
                    ) : (
                      <FaRegEyeSlash size={18} />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className={inputClass}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {!showConfirmPassword ? (
                      <FaRegEye size={18} />
                    ) : (
                      <FaRegEyeSlash size={18} />
                    )}
                  </button>
                </div>

                {err && err.length > 0 && (
                  <p className="text-red-500 text-sm">{err}</p>
                )}

                <button
                  className="w-full py-3.5 bg-[#2d2d2d] hover:bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            )}

            {/* Bottom Link */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-[#2d2d2d] font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
