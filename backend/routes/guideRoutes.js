import express from "express";
import { getGuides, createGuide, deleteGuide } from "../controllers/guideController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public route: Everyone can view pet care guides
router.get("/", getGuides);

// Protected Admin-only routes
router.post("/", protect, authorize("admin"), createGuide);
router.delete("/:id", protect, authorize("admin"), deleteGuide);

export default router;