import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
export const SignUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exists." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length must be at least 6 characters." });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile no. length must be of 10 digits." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`Sign up error ${error}`);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`Sign in error ${error}`);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Log out successfull" });
  } catch (error) {
    return res.status(500).json(`Sign out error: ${error}`);
  }
};
