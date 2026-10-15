import { Inquiry } from '../models/Inquiry.js';
import { sendInquiryNotification } from '../utils/mailer.js';

export const create = async (req, res) => {
  const { name, phone, email, message, companyName } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email and message are required' });
  }

  const inquiry = await Inquiry.create({ name, phone, email, message, companyName });
  sendInquiryNotification(inquiry);

  res.status(201).json({ success: true });
};

export const list = async (req, res) => {
  const pageNum = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limitNum = Math.max(1, parseInt(req.query.limit, 10) || 20);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Inquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Inquiry.countDocuments(),
  ]);

  res.json({
    items,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.max(1, Math.ceil(total / limitNum)),
  });
};

export const markRead = async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return res.status(404).json({ message: 'Not found' });

  inquiry.status = 'read';
  await inquiry.save();
  res.json(inquiry);
};

export const remove = async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return res.status(404).json({ message: 'Not found' });

  await inquiry.deleteOne();
  res.json({ message: 'Deleted' });
};
