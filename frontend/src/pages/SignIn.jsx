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
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
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
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
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
              Welcome back! Sign in to continue
            </p>
          </div>

          <div className="space-y-3">
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
                  placeholder="Enter your password"
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
            <Link
              to="/forgot-password"
              className="text-green-600 text-sm font-medium hover:underline"
            >
              Forgot Password?
            </Link>
            {err.length > 0 && <p className="text-red-500">{err}</p>}
            <button
              className="btn btn-lg w-full mt-6 bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="flex items-center justify-center mx-auto gap-1 cursor-pointer hover:bg-gray-300 border border-black bg-white w-full text-black font-semibold rounded-lg py-3 mt-2"
              onClick={handleGoogleAuth}
            >
              <FcGoogle size={25} />
              <span>Sign In with Google</span>
            </button>
            <p className="text-center text-sm">
              Don't have an account ?{" "}
              <Link to="/signup" className="cursor-pointer text-green-600">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
