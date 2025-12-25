import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    const token = await jwt.sign(userId, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log(`Token error: ${error}`);
  }
};

export default genToken;
