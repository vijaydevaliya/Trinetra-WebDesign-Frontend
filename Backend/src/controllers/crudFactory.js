import { publicPathFor } from '../middleware/upload.js';
import { deleteImageFiles } from '../utils/fileUtils.js';

// Builds standard list/create/update/remove handlers for simple
// { title, category, images } style resources (Product, Project).
export const createCrudController = (Model, resource, allowedFields) => {
  const list = async (req, res) => {
    const { page } = req.query;

    // No page param: return the full list, unpaginated (used by public
    // pages that need every record for client-side category filtering).
    if (!page) {
      const items = await Model.find().sort({ createdAt: -1 });
      return res.json(items);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Model.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Model.countDocuments(),
    ]);

    res.json({
      items,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.max(1, Math.ceil(total / limitNum)),
    });
  };

  const getOne = async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  };

  const create = async (req, res) => {
    const payload = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) payload[field] = req.body[field];
    });
    const uploaded = (req.files || []).map((f) => publicPathFor(resource, f));
    payload.images = uploaded;

    const item = await Model.create(payload);
    res.status(201).json(item);
  };

  const update = async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) item[field] = req.body[field];
    });

    let keepImages = item.images;
    if (req.body.keepImages !== undefined) {
      try {
        keepImages = JSON.parse(req.body.keepImages);
      } catch {
        keepImages = item.images;
      }
    }
    const removed = item.images.filter((img) => !keepImages.includes(img));
    deleteImageFiles(removed);

    const uploaded = (req.files || []).map((f) => publicPathFor(resource, f));
    item.images = [...keepImages, ...uploaded];

    await item.save();
    res.json(item);
  };

  const remove = async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    deleteImageFiles(item.images);
    res.json({ message: 'Deleted' });
  };

  return { list, getOne, create, update, remove };
};
