import mongoose from "mongoose";

import { PORT, DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB connected on port ${PORT}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
