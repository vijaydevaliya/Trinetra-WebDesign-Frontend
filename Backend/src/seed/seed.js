import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

import { connectDB } from '../config/db.js';
import { Admin } from '../models/Admin.js';
import { Product } from '../models/Product.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { PRODUCTS_SEED, PROJECTS_SEED, BLOGS_SEED } from './seedData.js';
import { seedCategories } from './seedCategories.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');

// Legacy image assets (saved before the admin+database system existed) live
// in the frontend's public/ folder. This is a one-off migration read, not a
// runtime dependency between the two projects.
const legacyPublicDir =
  process.env.LEGACY_FRONTEND_PUBLIC_DIR ||
  path.join(__dirname, '..', '..', '..', 'Frontend', 'public');

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const copyImage = (resource, sourceFileName) => {
  const sourcePath = path.join(legacyPublicDir, resource, sourceFileName);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ! Missing source image, skipping: ${sourcePath}`);
    return null;
  }
  const ext = path.extname(sourceFileName);
  const base = slugify(path.basename(sourceFileName, ext)).slice(0, 60);
  const destName = `${base || 'image'}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const destDir = path.join(uploadsRoot, resource);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(sourcePath, path.join(destDir, destName));
  return `/uploads/${resource}/${destName}`;
};

const seedAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@trinetra.com').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists (${email}), skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ email, passwordHash });
  console.log(`Created admin user: ${email} / ${password}`);
};

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Products already seeded (${count} found), skipping.`);
    return;
  }

  for (const item of PRODUCTS_SEED) {
    const image = copyImage('products', item.sourceImage);
    // eslint-disable-next-line no-await-in-loop
    await Product.create({
      title: item.title,
      category: item.category,
      description: item.description,
      images: image ? [image] : [],
    });
  }
  console.log(`Seeded ${PRODUCTS_SEED.length} products.`);
};

const seedProjects = async () => {
  const count = await Project.countDocuments();
  if (count > 0) {
    console.log(`Projects already seeded (${count} found), skipping.`);
    return;
  }

  for (const item of PROJECTS_SEED) {
    const image = copyImage('projects', item.sourceImage);
    // eslint-disable-next-line no-await-in-loop
    await Project.create({
      title: item.title,
      category: item.category,
      images: image ? [image] : [],
    });
  }
  console.log(`Seeded ${PROJECTS_SEED.length} projects.`);
};

const seedBlogs = async () => {
  const count = await Blog.countDocuments();
  if (count > 0) {
    console.log(`Blogs already seeded (${count} found), skipping.`);
    return;
  }

  for (const item of BLOGS_SEED) {
    // eslint-disable-next-line no-await-in-loop
    await Blog.create({
      title: item.title,
      slug: slugify(item.title),
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      featured: Boolean(item.featured),
      images: [],
    });
  }
  console.log(`Seeded ${BLOGS_SEED.length} blogs.`);
};

const run = async () => {
  await connectDB();
  await seedAdmin();
  await seedProducts();
  await seedProjects();
  await seedBlogs();
  await seedCategories();
  console.log('Seed complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
