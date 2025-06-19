import express from "express";
import {
  createStudent,
  getStudentById,
  getStudentsByNGO,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/:id", getStudentById);
router.get("/ngo/:ngoId", getStudentsByNGO);

export default router;
