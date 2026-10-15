import nodemailer from 'nodemailer';

let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

// Fire-and-forget: inquiry already saved to the DB by the time this runs, so a
// missing/misconfigured SMTP setup should never block or fail the request.
export const sendInquiryNotification = async (inquiry) => {
  if (!transporter) {
    console.warn('SMTP not configured — skipping inquiry email notification.');
    return;
  }

  const to = process.env.NOTIFY_EMAIL || 'support@trinetratechno.world';

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      replyTo: inquiry.email,
      subject: `New inquiry from ${inquiry.name}${inquiry.companyName ? ` (${inquiry.companyName})` : ''}`,
      text: [
        `Name: ${inquiry.name}`,
        `Phone: ${inquiry.phone || '-'}`,
        `Email: ${inquiry.email}`,
        inquiry.companyName ? `Company page: ${inquiry.companyName}` : null,
        '',
        inquiry.message,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  } catch (err) {
    console.error('Failed to send inquiry notification email:', err.message);
  }
};
