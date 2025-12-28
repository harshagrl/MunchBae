import jwt from "jwt";
const isAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(400).json({ message: "Token not verified" });
    }
    console.log(decodeToken);
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: `isAuth error: ${error}` });
  }
};
