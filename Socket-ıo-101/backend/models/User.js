import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String, default: "" },
  status: {
    type: String,
    enum: ["online", "offline", "away"],
    default: "offline",
  },
  socketId: { type: String, default: null },
});

export const User = mongoose.model("User", UserSchema);
