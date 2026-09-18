import { Project } from '../models/Project.js';
import { createCrudController } from './crudFactory.js';

export const projectController = createCrudController(Project, 'projects', [
  'title',
  'category',
]);
