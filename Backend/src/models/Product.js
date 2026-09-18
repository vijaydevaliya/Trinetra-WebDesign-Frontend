import mongoose from 'mongoose';

export const PRODUCT_CATEGORY_IDS = [
  'switches', 'lighting', 'security', 'sensors', 'curtains', 'hub', 'fan', 'energy',
];

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: PRODUCT_CATEGORY_IDS },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
