import express from 'express';
import * as tribondProductController from '../controllers/tribondProductController.js';
import { requireAuth } from '../middleware/auth.js';
import { createUploader } from '../middleware/upload.js';

const router = express.Router();
const upload = createUploader('tribond-products');

router.get('/', tribondProductController.list);
router.get('/:id', tribondProductController.getOne);
router.post('/', requireAuth, upload.array('images', 10), tribondProductController.create);
router.put('/:id', requireAuth, upload.array('images', 10), tribondProductController.update);
router.delete('/:id', requireAuth, tribondProductController.remove);

export default router;
