import { Product } from '../models/Product.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { Category } from '../models/Category.js';

// One-time rename from the old hardcoded slugs (e.g. "switches", "bedroom")
// to human-readable labels, now that category is just a free string instead
// of a fixed enum. Safe to run repeatedly - once renamed, the old slug no
// longer matches anything and the update is a no-op.
const PRODUCT_SLUG_TO_LABEL = {
  switches: 'Switches',
  lighting: 'Lighting',
  security: 'Security',
  sensors: 'Sensors',
  curtains: 'Curtains',
  hub: 'Hub',
  fan: 'Fan',
  energy: 'Energy',
};

const PROJECT_SLUG_TO_LABEL = {
  bedroom: 'Bed Room',
  living: 'Living Room',
  dining: 'Dining Area',
  others: 'Others',
};

const renameLegacySlugs = async () => {
  for (const [slug, label] of Object.entries(PRODUCT_SLUG_TO_LABEL)) {
    // eslint-disable-next-line no-await-in-loop
    await Product.updateMany({ category: slug }, { category: label });
  }
  for (const [slug, label] of Object.entries(PROJECT_SLUG_TO_LABEL)) {
    // eslint-disable-next-line no-await-in-loop
    await Project.updateMany({ category: slug }, { category: label });
  }
};

// Category documents are derived from whatever category values are actually
// in use right now, so this stays correct no matter how the data got there.
const seedFromExistingData = async () => {
  const sources = [
    { Model: Product, type: 'product' },
    { Model: Project, type: 'project' },
    { Model: Blog, type: 'blog' },
  ];

  let created = 0;
  for (const { Model, type } of sources) {
    // eslint-disable-next-line no-await-in-loop
    const names = await Model.distinct('category');
    for (const name of names) {
      if (!name) continue;
      // eslint-disable-next-line no-await-in-loop
      const result = await Category.updateOne(
        { type, name },
        { $setOnInsert: { type, name } },
        { upsert: true }
      );
      if (result.upsertedCount) created += 1;
    }
  }
  return created;
};

export const seedCategories = async () => {
  await renameLegacySlugs();
  const created = await seedFromExistingData();
  console.log(`Categories ready (${created} newly created from existing data).`);
};
