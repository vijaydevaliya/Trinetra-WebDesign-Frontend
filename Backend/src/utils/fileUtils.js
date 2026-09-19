import { cloudinary } from '../config/cloudinary.js';

// Cloudinary URLs look like:
//   https://res.cloudinary.com/<cloud>/image/upload/v169.../trinetra/products/foo-123.webp
// The public_id is everything after the version segment, minus the extension.
const publicIdFromUrl = (url) => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};

export const deleteImageFile = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('res.cloudinary.com')) return;
  const publicId = publicIdFromUrl(imageUrl);
  if (!publicId) return;
  cloudinary.uploader.destroy(publicId, (err) => {
    if (err) console.error(`Failed to delete Cloudinary image ${publicId}:`, err.message);
  });
};

export const deleteImageFiles = (imageUrls = []) => {
  imageUrls.forEach(deleteImageFile);
};
