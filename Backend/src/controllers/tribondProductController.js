import { TribondProduct } from '../models/TribondProduct.js';
import { publicPathFor } from '../middleware/upload.js';
import { deleteImageFiles } from '../utils/fileUtils.js';

// Multiline fields (Area of Application, Benefits, Compliance, Precautions)
// arrive from the admin form as one item per line in a textarea.
const parseLines = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};

export const list = async (req, res) => {
  const { page } = req.query;

  if (!page) {
    const items = await TribondProduct.find().sort({ name: 1 });
    return res.json(items);
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(req.query.limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    TribondProduct.find().sort({ name: 1 }).skip(skip).limit(limitNum),
    TribondProduct.countDocuments(),
  ]);

  res.json({
    items,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.max(1, Math.ceil(total / limitNum)),
  });
};

export const getOne = async (req, res) => {
  const item = await TribondProduct.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const create = async (req, res) => {
  const { name, type, standard, coverage } = req.body;
  const images = (req.files || []).map((f) => publicPathFor('tribond-products', f));

  const item = await TribondProduct.create({
    name,
    type,
    standard,
    coverage,
    areaOfApplication: parseLines(req.body.areaOfApplication),
    benefits: parseLines(req.body.benefits),
    compliance: parseLines(req.body.compliance),
    precautions: parseLines(req.body.precautions),
    images,
  });

  res.status(201).json(item);
};

export const update = async (req, res) => {
  const item = await TribondProduct.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });

  const { name, type, standard, coverage } = req.body;
  if (name !== undefined) item.name = name;
  if (type !== undefined) item.type = type;
  if (standard !== undefined) item.standard = standard;
  if (coverage !== undefined) item.coverage = coverage;
  if (req.body.areaOfApplication !== undefined) item.areaOfApplication = parseLines(req.body.areaOfApplication);
  if (req.body.benefits !== undefined) item.benefits = parseLines(req.body.benefits);
  if (req.body.compliance !== undefined) item.compliance = parseLines(req.body.compliance);
  if (req.body.precautions !== undefined) item.precautions = parseLines(req.body.precautions);

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

  const uploaded = (req.files || []).map((f) => publicPathFor('tribond-products', f));
  item.images = [...keepImages, ...uploaded];

  await item.save();
  res.json(item);
};

export const remove = async (req, res) => {
  const item = await TribondProduct.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  deleteImageFiles(item.images);
  res.json({ message: 'Deleted' });
};
