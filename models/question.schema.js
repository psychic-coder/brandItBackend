// models/Question.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  options: {
    type: [optionSchema],
    validate: [(arr) => arr.length === 4, "Exactly 4 options are required"],
  },
  correctAnswerIndex: { type: Number, required: true },
  subject: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
