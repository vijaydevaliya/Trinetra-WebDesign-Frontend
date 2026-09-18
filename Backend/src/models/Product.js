import mongoose from 'mongoose';

// Category values are no longer a fixed enum - they're managed dynamically
// via the Category model (type: 'product') and edited through /admin.
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
