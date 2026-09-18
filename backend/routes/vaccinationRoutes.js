import express from "express";
import {
  addVaccination,
  updateVaccination,
  getMyVaccinations,
  deleteVaccination,
} from "../controllers/vaccinationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.post("/", addVaccination);
router.get("/", getMyVaccinations);
router.put("/:id", updateVaccination);
router.delete("/:id", deleteVaccination);

export default router;
