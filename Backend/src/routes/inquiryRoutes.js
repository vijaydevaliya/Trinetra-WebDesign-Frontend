import express from 'express';
import * as inquiryController from '../controllers/inquiryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', inquiryController.create);
router.get('/', requireAuth, inquiryController.list);
router.put('/:id/read', requireAuth, inquiryController.markRead);
router.delete('/:id', requireAuth, inquiryController.remove);

export default router;
