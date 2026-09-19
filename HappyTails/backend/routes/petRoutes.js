import express from "express";
import { getPets, getPetById, createPet, deletePet } from "../controllers/petController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPets);
router.get("/:id", getPetById);
router.post("/", protect, authorize("admin"), createPet);
router.delete("/:id", protect, authorize("admin"), deletePet);

export default router;
