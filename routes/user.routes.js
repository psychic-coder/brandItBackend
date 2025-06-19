import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateAccessibilitySettings,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id/accessibility", updateAccessibilitySettings);

export default router;
