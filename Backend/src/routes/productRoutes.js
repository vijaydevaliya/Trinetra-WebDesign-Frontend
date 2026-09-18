import express from 'express';
import { productController } from '../controllers/productController.js';
import { requireAuth } from '../middleware/auth.js';
import { createUploader } from '../middleware/upload.js';

const router = express.Router();
const upload = createUploader('products');

router.get('/', productController.list);
router.get('/:id', productController.getOne);
router.post('/', requireAuth, upload.array('images', 10), productController.create);
router.put('/:id', requireAuth, upload.array('images', 10), productController.update);
router.delete('/:id', requireAuth, productController.remove);

export default router;
