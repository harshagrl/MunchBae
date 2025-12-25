import User from "../models/user.model";
import bcrypt from "bcryptjs";
const SignUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return req.status(400).json({ message: "User Already exists." });
    }
    if (password.length < 6) {
      return req
        .status(400)
        .json({ message: "Password length must be at least 6 characters." });
    }
    if (mobile.length < 10) {
      return req
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
  } catch (error) {}
};
