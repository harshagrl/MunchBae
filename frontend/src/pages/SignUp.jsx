import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import carouselImg1 from "../assets/Sign in page carousel/img1.webp";
import carouselImg2 from "../assets/Sign in page carousel/img2.jpg";
import carouselImg3 from "../assets/Sign in page carousel/img3.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/user.slice";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const carouselImages = [carouselImg1, carouselImg2, carouselImg3];

  const roleOptions = [
    { key: "user", label: "User" },
    { key: "owner", label: "Shop Owner" },
    { key: "deliveryBoy", label: "Delivery Boy" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      localStorage.setItem("userData", JSON.stringify(result.data));
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return setErr("Mobile no. is required");
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          mobile,
          role,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(data));
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-100 relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-[#2d2d2d] hover:text-[#e84c3d] transition-colors duration-200 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg"
      >
        <span className="text-lg">←</span> Back to Home
      </Link>
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] mb-2">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Join MunchBae for delicious food & great deals.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-3.5">
              <div>
                <input
                  id="fullName"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                  placeholder="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  required
                />
              </div>

              <div>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div>
                <input
                  id="mobile"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                  placeholder="Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  required
                />
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {!showPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </button>
              </div>

              {/* Role Selection */}
              <div>
                <p className="text-sm font-semibold text-[#2d2d2d] mb-2">
                  Select Role
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setRole(r.key)}
                      className={`cursor-pointer py-2.5 px-2 rounded-xl font-medium text-xs transition-all duration-300 ${
                        role === r.key
                          ? "bg-[#2d2d2d] text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {err && err.length > 0 && (
                <p className="text-red-500 text-sm">* {err}</p>
              )}

              <button
                className="w-full py-3.5 bg-[#2d2d2d] hover:bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-400 text-xs">or sign up with</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google */}
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#2d2d2d] font-medium text-sm transition-all duration-300 cursor-pointer"
                onClick={handleGoogleAuth}
              >
                <FcGoogle size={20} />
                <span>Sign Up with Google</span>
              </button>
            </div>

            {/* Bottom Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#2d2d2d] font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Carousel */}
        <div className="hidden md:block flex-1 relative overflow-hidden rounded-2xl m-4">
          {carouselImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Food ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}
          {/* Carousel Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "w-8 h-3 bg-white"
                    : "w-3 h-3 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
