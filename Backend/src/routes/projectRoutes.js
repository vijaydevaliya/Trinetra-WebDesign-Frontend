import express from 'express';
import { projectController } from '../controllers/projectController.js';
import { requireAuth } from '../middleware/auth.js';
import { createUploader } from '../middleware/upload.js';

const router = express.Router();
const upload = createUploader('projects');

router.get('/', projectController.list);
router.get('/:id', projectController.getOne);
router.post('/', requireAuth, upload.array('images', 10), projectController.create);
router.put('/:id', requireAuth, upload.array('images', 10), projectController.update);
router.delete('/:id', requireAuth, projectController.remove);

export default router;
