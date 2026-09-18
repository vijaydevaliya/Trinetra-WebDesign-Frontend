import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';

const MODEL_BY_TYPE = { product: Product, project: Project, blog: Blog };

export const list = async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  const categories = await Category.find(filter).sort({ name: 1 });
  res.json(categories);
};

export const create = async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ message: 'name and type are required' });
  }
  if (!MODEL_BY_TYPE[type]) {
    return res.status(400).json({ message: 'type must be product, project or blog' });
  }

  const existing = await Category.findOne({ type, name: new RegExp(`^${name.trim()}$`, 'i') });
  if (existing) {
    return res.status(409).json({ message: 'A category with this name already exists' });
  }

  const category = await Category.create({ name: name.trim(), type });
  res.status(201).json(category);
};

export const update = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name is required' });
  }

  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });

  const duplicate = await Category.findOne({
    _id: { $ne: category._id },
    type: category.type,
    name: new RegExp(`^${name.trim()}$`, 'i'),
  });
  if (duplicate) {
    return res.status(409).json({ message: 'A category with this name already exists' });
  }

  const oldName = category.name;
  const Model = MODEL_BY_TYPE[category.type];

  category.name = name.trim();
  await category.save();

  // Keep existing products/projects/blogs pointing at the renamed category.
  await Model.updateMany({ category: oldName }, { category: category.name });

  res.json(category);
};

export const remove = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Not found' });

  const Model = MODEL_BY_TYPE[category.type];
  const inUse = await Model.countDocuments({ category: category.name });
  if (inUse > 0) {
    return res.status(400).json({
      message: `Cannot delete - ${inUse} ${category.type}(s) still use this category. Reassign them first.`,
    });
  }

  await category.deleteOne();
  res.json({ message: 'Deleted' });
};
