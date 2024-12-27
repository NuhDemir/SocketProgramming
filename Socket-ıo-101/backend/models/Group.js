import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: trueiun, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  required: true,
});

export const Group = mongoose.model("Group", GroupSchema);
