import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Db connected");
  } catch (err) {
    console.log(`DB Error ${err}`);
  }
};
export default connectDB;
