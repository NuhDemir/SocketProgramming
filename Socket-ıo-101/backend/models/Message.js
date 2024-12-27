import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: false,
  },
  content: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

export const Messsage = mongoose.model("Message", MessageSchema);
