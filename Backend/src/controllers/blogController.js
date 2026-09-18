import { Blog } from '../models/Blog.js';
import { publicPathFor } from '../middleware/upload.js';
import { deleteImageFiles } from '../utils/fileUtils.js';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const uniqueSlug = async (title, ignoreId) => {
  const base = slugify(title);
  let slug = base;
  let counter = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Blog.exists({ slug, ...(ignoreId ? { _id: { $ne: ignoreId } } : {}) })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
};

const parseContent = (content) => {
  if (Array.isArray(content)) return content;
  if (typeof content !== 'string') return [];
  return content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
};

export const list = async (req, res) => {
  const items = await Blog.find().sort({ createdAt: -1 });
  res.json(items);
};

export const getOne = async (req, res) => {
  const item = await Blog.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const getBySlug = async (req, res) => {
  const item = await Blog.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const create = async (req, res) => {
  const { title, category, excerpt, content, featured } = req.body;
  const slug = await uniqueSlug(title);
  const isFeatured = featured === 'true' || featured === true;

  if (isFeatured) {
    await Blog.updateMany({ featured: true }, { featured: false });
  }

  const images = (req.files || []).map((f) => publicPathFor('blogs', f.filename));

  const item = await Blog.create({
    title,
    slug,
    category,
    excerpt,
    content: parseContent(content),
    featured: isFeatured,
    images,
  });

  res.status(201).json(item);
};

export const update = async (req, res) => {
  const item = await Blog.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });

  const { title, category, excerpt, content, featured } = req.body;

  if (title !== undefined && title !== item.title) {
    item.title = title;
    item.slug = await uniqueSlug(title, item._id);
  }
  if (category !== undefined) item.category = category;
  if (excerpt !== undefined) item.excerpt = excerpt;
  if (content !== undefined) item.content = parseContent(content);

  if (featured !== undefined) {
    const isFeatured = featured === 'true' || featured === true;
    if (isFeatured) {
      await Blog.updateMany({ featured: true, _id: { $ne: item._id } }, { featured: false });
    }
    item.featured = isFeatured;
  }

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

  const uploaded = (req.files || []).map((f) => publicPathFor('blogs', f.filename));
  item.images = [...keepImages, ...uploaded];

  await item.save();
  res.json(item);
};

export const remove = async (req, res) => {
  const item = await Blog.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  deleteImageFiles(item.images);
  res.json({ message: 'Deleted' });
};
