import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../config/cloudinary.js';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

export const createUploader = (resource) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const base = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 60);
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      return {
        folder: `trinetra/${resource}`,
        public_id: `${base || 'image'}-${unique}`,
        allowed_formats: ALLOWED_FORMATS,
      };
    },
  });

  return multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024, files: 10 },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(new Error('Only JPG, PNG, WEBP, GIF or AVIF images are allowed'));
      }
      cb(null, true);
    },
  });
};

// Cloudinary-stored files come back from multer with `file.path` already set
// to the full secure URL — nothing to build, just read it off the file.
export const publicPathFor = (resource, file) => file.path;
