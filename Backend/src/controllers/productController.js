import { Product } from '../models/Product.js';
import { createCrudController } from './crudFactory.js';

export const productController = createCrudController(Product, 'products', [
  'title',
  'category',
  'description',
]);
