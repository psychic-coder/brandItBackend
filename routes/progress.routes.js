import express from "express";
import { getProgressByStudent, recordProgress } from "../controllers/progress.controller.js";


const router = express.Router();

router.post("/", recordProgress);
router.get("/student/:studentId", getProgressByStudent);

export default router;
