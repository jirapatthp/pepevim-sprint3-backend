import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const connectDB = async () => {
  const uri = env.MONGO_URI;

  try {
    await mongoose.connect(uri, { dbName: "pepeDB" });
    console.log("DB name :", mongoose.connection.name);
    console.log("DB HOST:", mongoose.connection.host);
    console.log("MongoDB connected ✅ 🎉");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    process.exit(1);
  }
};
