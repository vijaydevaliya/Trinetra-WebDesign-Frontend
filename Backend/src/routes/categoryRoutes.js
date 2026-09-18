import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', categoryController.list);
router.post('/', requireAuth, categoryController.create);
router.put('/:id', requireAuth, categoryController.update);
router.delete('/:id', requireAuth, categoryController.remove);

export default router;
