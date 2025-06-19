import mongoose from "mongoose";



const optionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // A, B, C, D
  text: { type: String, required: true },
});

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  subject: {
    type: String,
    enum: ["english", "natural-science", "social-science"],
    required: true,
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (v) {
        return v.length === 4;
      },
      message: "Question must have exactly 4 options",
    },
  },
  correctAnswer: { type: String, required: true }, // A, B, C, or D
  explanation: { type: String },
  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  accessibilityOptions: {
    hasAudio: { type: Boolean, default: false },
    hasVisualAids: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", QuestionSchema);
