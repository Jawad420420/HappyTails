import express from 'express';
import { 
  createApplication, 
  getMyApplications, 
  getApplications, 
  updateStatus 
} from '../controllers/volunteerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createApplication);
router.get('/my', protect, getMyApplications);
router.get('/', protect, getApplications);
router.patch('/:id/status', protect, updateStatus);

export default router;