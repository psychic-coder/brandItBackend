import express from "express";
import {
  createQuiz,
  getQuizById,
  listQuizzes,
  submitQuiz,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", createQuiz);           // Create a new quiz
router.get("/:id", getQuizById);        // Get a quiz by ID
router.get("/", listQuizzes);           // List all quizzes
router.post("/submit", submitQuiz);     // Submit a quiz and track progress


export default router;
