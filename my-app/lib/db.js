import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured.");
  await mongoose.connect(process.env.MONGO_URI);
  return mongoose.connection;
}

export default connectDB;   