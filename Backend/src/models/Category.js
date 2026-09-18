import mongoose from 'mongoose';

export const CATEGORY_TYPES = ['product', 'project', 'blog'];

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: CATEGORY_TYPES },
  },
  { timestamps: true }
);

categorySchema.index({ type: 1, name: 1 }, { unique: true });

export const Category = mongoose.model('Category', categorySchema);
