import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {

    const mongourl = process.env.MONGO_URI;
    if(!mongourl){
      console.log("MONGO_URI is not defined");
    }
    
    await mongoose.connect(mongourl!);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};