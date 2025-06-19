import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "parent", "ngo", "admin"],
    required: true,
  },
  accessibilitySettings: {
    dyslexiaFont: { type: Boolean, default: false },
    highContrast: { type: Boolean, default: false },
    largeButtons: { type: Boolean, default: false },
    voiceControl: { type: Boolean, default: false },
    gestureControl: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
