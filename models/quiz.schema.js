// models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subject: { type: String, required: true },
  totalDuration: { type: Number, required: true },
  numberOfQuestions: { type: Number, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
