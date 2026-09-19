import { SiteSettings } from '../models/SiteSettings.js';
import { publicPathFor } from '../middleware/upload.js';
import { deleteImageFile } from '../utils/fileUtils.js';

const getOrCreate = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return settings;
};

export const get = async (req, res) => {
  const settings = await getOrCreate();
  res.json(settings);
};

export const update = async (req, res) => {
  const settings = await getOrCreate();

  const logoFile = req.files?.logo?.[0];
  const faviconFile = req.files?.favicon?.[0];

  if (logoFile) {
    if (settings.logo) deleteImageFile(settings.logo);
    settings.logo = publicPathFor('settings', logoFile);
  }
  if (faviconFile) {
    if (settings.favicon) deleteImageFile(settings.favicon);
    settings.favicon = publicPathFor('settings', faviconFile);
  }

  await settings.save();
  res.json(settings);
};
