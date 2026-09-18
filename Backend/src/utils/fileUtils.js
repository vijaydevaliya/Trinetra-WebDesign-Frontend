import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');

// imagePath looks like "/uploads/products/foo.webp"
export const deleteImageFile = (imagePath) => {
  if (!imagePath || !imagePath.startsWith('/uploads/')) return;
  const relative = imagePath.replace('/uploads/', '');
  const absolute = path.join(uploadsRoot, relative);
  fs.unlink(absolute, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error(`Failed to delete image ${absolute}:`, err.message);
    }
  });
};

export const deleteImageFiles = (imagePaths = []) => {
  imagePaths.forEach(deleteImageFile);
};
