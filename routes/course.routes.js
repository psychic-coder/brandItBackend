import express from "express";
import {

  getCoursesByUniqueSubject,
  getCoursesSubject,
} from "../controllers/quiz.controller.js";

const router = express.Router();
// Route 1: Get all available courses
router.get("/course", getCoursesByUniqueSubject);
// Route 2: Get all lessons by course name (case-insensitive match)
router.get("/courses/:subject", getCoursesSubject);

// router.post("/seed", seedCourses);

export default router;
