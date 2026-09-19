import mongoose from 'mongoose';

// Singleton document — only one SiteSettings record ever exists.
const siteSettingsSchema = new mongoose.Schema(
  {
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
