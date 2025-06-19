import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: {
    type: String,
    enum: ["english", "natural-science", "social-science"],
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  duration: { type: Number }, // in minutes
  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);
