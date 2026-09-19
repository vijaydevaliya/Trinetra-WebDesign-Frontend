import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { requireAuth } from '../middleware/auth.js';
import { createUploader } from '../middleware/upload.js';

const router = express.Router();
const upload = createUploader('settings');

router.get('/', settingsController.get);
router.put(
  '/',
  requireAuth,
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]),
  settingsController.update
);

export default router;
