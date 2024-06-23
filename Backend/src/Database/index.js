import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`mongodb connected success`);
  } catch (error) {
    console.log("mongodb connection error");
    process.exit(1);
  }
};

export { connectDB };
