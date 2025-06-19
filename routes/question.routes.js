import express from "express";
import { createQuestion, getQuestionsBySubject } from "../controllers/question.Controller";


const router = express.Router();

router.post("/", createQuestion);
router.get("/subject/:subject", getQuestionsBySubject);

export default router;
