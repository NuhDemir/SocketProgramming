import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB'ye başarıyla bağlandı!");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error.message);
    process.exit(1);
  }
};
