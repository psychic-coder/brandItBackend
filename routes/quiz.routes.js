// routes/quizRoutes.js
import express from "express";
import {
  getQuizzesBySubject,
  getQuizMetadata,
  getAllQuizQuestions,
  getQuestionByIndex,
  submitAnswer,
  submitQuiz,
  getUserResult,
  createQuizWithQuestions,

} from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/subject/:subject", getQuizzesBySubject);
router.get("/:quizId", getQuizMetadata);
router.get("/:quizId/questions", getAllQuizQuestions);
router.get("/:quizId/questions/:index", getQuestionByIndex);
router.post("/:quizId/questions/:index/answer", submitAnswer);
router.post("/:quizId/submit", submitQuiz);
router.get("/:quizId/result/:userId", getUserResult);
router.post("/", createQuizWithQuestions); 


export default router;
