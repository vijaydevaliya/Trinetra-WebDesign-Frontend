import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    status: { type: String, enum: ['new', 'read'], default: 'new' },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
