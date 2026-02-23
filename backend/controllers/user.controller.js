import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User id not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get current user error: ${error}` });
  }
};

export const updateUserLocation = async (req, res) => {
  try {
    const userId = req.userId;
    const { lat, long } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User id not found" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          type: "Point",
          coordinates: [long, lat],
        },
      },
      { new: true },
    );
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update user location error: ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User id not found" });
    }

    const { fullName, email, mobile, password } = req.body;

    // Fetch user to check OTP status if password is changing
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const updateData = {};
    
    if (fullName) {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(fullName)) {
        return res.status(400).json({ message: "Name should only contain alphabets." });
      }
      updateData.fullName = fullName;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
      updateData.email = email;
    }

    if (mobile) {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: "Mobile number must be exactly 10 digits." });
      }
      updateData.mobile = mobile;
    }

    if (password) {
      if (!user.isOtpVerified) {
        return res
          .status(400)
          .json({ message: "OTP verification is required to change password." });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password length must be at least 6 characters." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password"); // Exclude password from the returned user object

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Reset OTP verification flag after password has been successfully changed
    if (password) {
      updatedUser.isOtpVerified = false;
      await updatedUser.save();
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: "Email already exists." });
    }
    return res
      .status(500)
      .json({ message: `update profile error: ${error.message}` });
  }
};
