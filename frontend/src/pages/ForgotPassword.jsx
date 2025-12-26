import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-cyan-700 to-cyan-900">
      <div className="w-full max-w-md">
        <div className="bg-base-200 border-2 border-base-300 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/signin">
              <IoArrowBack
                size={25}
                className="text-green-600 cursor-pointer"
              />
            </Link>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Forgot Password
            </h1>
          </div>

          {step == 1 && (
            <div className="space-y-2">
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
                  placeholder="Enter your email to reset password"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <button
                className="btn btn-lg w-full mt-6 bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setStep(2)}
              >
                Send OTP
              </button>
            </div>
          )}

          {step == 2 && (
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="otp"
                  className="label p-0 pb-2 font-semibold text-base"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
              </div>

              <button
                className="btn btn-lg w-full mt-6 bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setStep(3)}
              >
                Verify
              </button>
            </div>
          )}

          {step == 3 && (
            <div className="space-y-3">
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="label p-0 pb-2 font-semibold text-base"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="label p-0 pb-2 font-semibold text-base"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

              <button className="btn btn-lg w-full mt-6 bg-green-700 hover:bg-green-800 text-white border-0 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl">
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
