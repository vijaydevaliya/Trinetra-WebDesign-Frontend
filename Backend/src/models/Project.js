import mongoose from 'mongoose';

export const PROJECT_CATEGORY_IDS = ['bedroom', 'living', 'dining', 'others'];

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: PROJECT_CATEGORY_IDS },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
