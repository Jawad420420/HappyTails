import express from "express";
import {
  submitAdoption,
  getMyAdoptions,
  getAllAdoptions,
  updateAdoptionStatus,
} from "../controllers/adoptionController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, submitAdoption);
router.get("/my", protect, getMyAdoptions);
router.get("/", protect, authorize("admin"), getAllAdoptions);
router.patch("/:id/status", protect, authorize("admin"), updateAdoptionStatus);

export default router;
