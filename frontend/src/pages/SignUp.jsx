import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import munchBaeLogo from "../assets/munch-bae-logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const roleOptions = [
    { key: "user", label: "User" },
    { key: "shopOwner", label: "Shop Owner" },
    { key: "deliveryBoy", label: "Delivery Boy" },
  ];

  const handleSignUp = async () => {
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
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
    } catch (error) {
      setErr(error?.response?.data?.message);
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
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-cyan-700 to-cyan-900">
      <div className="w-full max-w-md">
        <div className="bg-base-200 border-2 border-base-300 rounded-3xl p-6 shadow-2xl">
          <div className="flex justify-center mb-2">
            <img
              src={munchBaeLogo}
              alt="MunchBae Logo"
              className="w-26 h-26 drop-shadow-lg"
            />
          </div>

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-green-600 mb-2">MunchBae</h1>
            <p className="text-sm text-base-content/70 font-medium">
              Join us for delicious food & great deals
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="fullName"
                className="label p-0 pb-2 font-semibold text-base"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Enter your full name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="label p-0 pb-2 font-semibold text-base"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="label p-0 pb-2 font-semibold text-base"
              >
                Mobile
              </label>
              <input
                id="mobile"
                type="text"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Enter your mobile number"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="label p-0 pb-2 font-semibold text-base"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  placeholder="Enter a password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {!showPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="label p-0 pb-3 font-semibold text-base">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className={`cursor-pointer py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      role === r.key
                        ? "bg-green-700 text-white shadow-lg scale-105"
                        : "bg-base-300 text-base-content hover:bg-base-400"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {err.length > 0 && <p className="text-red-500">* {err}</p>}
            <button
              className="btn btn-lg w-full mt-6 bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleSignUp}
            >
              Create Account
            </button>
            <button
              className="flex items-center justify-center mx-auto gap-1 cursor-pointer hover:bg-gray-300 border border-black bg-white w-full text-black font-semibold rounded-lg py-3 mt-2"
              onClick={handleGoogleAuth}
            >
              <FcGoogle size={25} />
              <span>Sign Up with Google</span>
            </button>
            <p className="text-center text-sm">
              Already have an account ?{" "}
              <Link to="/signin" className="cursor-pointer text-green-600">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
