import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { cloudinary } from '../config/cloudinary.js';
import { Product } from '../models/Product.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { TribondProduct } from '../models/TribondProduct.js';
import { SiteSettings } from '../models/SiteSettings.js';

const uploadsRoot = path.join(process.cwd(), 'uploads');

// Uploads a local /uploads/... file to Cloudinary and returns the new
// secure_url, or null if the local file doesn't actually exist.
const uploadLocalFile = async (localPath, resource) => {
  const absolute = path.join(uploadsRoot, localPath.replace('/uploads/', ''));
  if (!fs.existsSync(absolute)) return null;
  const result = await cloudinary.uploader.upload(absolute, { folder: `trinetra/${resource}` });
  return result.secure_url;
};

const migrateImagesField = async (Model, resource) => {
  const docs = await Model.find({ images: { $regex: '^/uploads/' } });
  let migrated = 0;
  let skipped = 0;

  for (const doc of docs) {
    const newImages = [];
    let changed = false;

    for (const img of doc.images) {
      if (!img.startsWith('/uploads/')) {
        newImages.push(img);
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const url = await uploadLocalFile(img, resource);
      if (url) {
        newImages.push(url);
        changed = true;
        migrated += 1;
      } else {
        newImages.push(img);
        skipped += 1;
        console.log(`  ! Missing local file for "${doc.title || doc.name}": ${img}`);
      }
    }

    if (changed) {
      doc.images = newImages;
      // eslint-disable-next-line no-await-in-loop
      await doc.save();
    }
  }

  console.log(`[${resource}] migrated ${migrated} image(s), ${skipped} missing/skipped.`);
};

const migrateSettings = async () => {
  const settings = await SiteSettings.findOne();
  if (!settings) {
    console.log('[settings] no settings document found, skipping.');
    return;
  }

  let changed = false;
  if (settings.logo?.startsWith('/uploads/')) {
    const url = await uploadLocalFile(settings.logo, 'settings');
    if (url) {
      settings.logo = url;
      changed = true;
    } else {
      console.log(`  ! Missing local logo file: ${settings.logo}`);
    }
  }
  if (settings.favicon?.startsWith('/uploads/')) {
    const url = await uploadLocalFile(settings.favicon, 'settings');
    if (url) {
      settings.favicon = url;
      changed = true;
    } else {
      console.log(`  ! Missing local favicon file: ${settings.favicon}`);
    }
  }

  if (changed) await settings.save();
  console.log(`[settings] ${changed ? 'migrated.' : 'nothing to migrate.'}`);
};

const run = async () => {
  await connectDB();

  await migrateImagesField(Product, 'products');
  await migrateImagesField(Project, 'projects');
  await migrateImagesField(Blog, 'blogs');
  await migrateImagesField(TribondProduct, 'tribond-products');
  await migrateSettings();

  console.log('Migration complete.');
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
