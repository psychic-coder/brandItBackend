import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guardianId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  disabilityType: {
    type: String,
    enum: ["dyslexia", "low-vision", "motor-impairment", "other"],
  },
  progress: [{ type: mongoose.Schema.Types.ObjectId, ref: "Progress" }],
  gradeLevel: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", StudentSchema);
