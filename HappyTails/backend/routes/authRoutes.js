import express from "express";
import { signup, login, getAllUsers } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", protect, authorize("admin"), getAllUsers);

export default router;
