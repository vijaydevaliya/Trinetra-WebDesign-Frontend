import express from 'express';
import * as blogController from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';
import { createUploader } from '../middleware/upload.js';

const router = express.Router();
const upload = createUploader('blogs');

router.get('/', blogController.list);
router.get('/slug/:slug', blogController.getBySlug);
router.get('/:id', blogController.getOne);
router.post('/', requireAuth, upload.array('images', 10), blogController.create);
router.put('/:id', requireAuth, upload.array('images', 10), blogController.update);
router.delete('/:id', requireAuth, blogController.remove);

export default router;
