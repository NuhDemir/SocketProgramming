import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const generateToken = (user) => {
  jwt.sign(
    {
      id: user._id,
      username: user.username,
    },

    JWT_SECRET,
    { expiresIn: "14d" }
  );
};
