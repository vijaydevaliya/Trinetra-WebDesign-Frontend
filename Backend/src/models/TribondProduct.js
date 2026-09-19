import mongoose from 'mongoose';

const tribondProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    standard: { type: String, default: '' },
    areaOfApplication: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    compliance: { type: [String], default: [] },
    precautions: { type: [String], default: [] },
    coverage: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const TribondProduct = mongoose.model('TribondProduct', tribondProductSchema);
