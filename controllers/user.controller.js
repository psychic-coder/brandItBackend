// --- controllers/userController.js ---
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, accessibilitySettings } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }
    const user = await User.create({
      username,
      email,
      password,
      role,
      accessibilitySettings,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAccessibilitySettings = async (req, res) => {
  try {
    const settings = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { accessibilitySettings: settings },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
