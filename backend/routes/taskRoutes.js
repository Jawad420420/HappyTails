import express from 'express';
import {
  createTask,
  getAllTasks,
  getVolunteerTasks,
  toggleInterest,
  assignTask,
  submitTask,
  reviewTask,
  closeTask,
} from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
const admin = [protect, authorize('admin')];

router.get('/', ...admin, getAllTasks);
router.post('/', ...admin, createTask);
router.get('/my', protect, getVolunteerTasks);
router.post('/:id/interest', protect, toggleInterest);
router.patch('/:id/assign', ...admin, assignTask);
router.post('/:id/submit', protect, submitTask);
router.patch('/:id/review', ...admin, reviewTask);
router.patch('/:id/close', ...admin, closeTask);

export default router;
