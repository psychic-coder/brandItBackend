import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  questionText: { type: String },
  selectedOption: { type: String },
  correctOption: { type: String },
  options: [
    {
      id: { type: String },
      text: { type: String },
    },
  ],
  isCorrect: { type: Boolean },
  explanation: { type: String },
});

const ProgressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  answers: [answerSchema],
  dateTaken: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", ProgressSchema);
