import { User } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, password, about } = req.body;

    const user = new User({ username, password, about });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { status },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
