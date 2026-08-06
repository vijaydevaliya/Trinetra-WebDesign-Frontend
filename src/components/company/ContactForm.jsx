import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

// Stubbed inquiry handler with TODO note for real API endpoint integration
const submitInquiry = async (formData) => {
  // TODO: Replace stubbed simulation with actual API POST endpoint (e.g. /api/v1/inquiries)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export const ContactForm = ({ companyName = 'Trinetra Technoworld Group' }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await submitInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className="py-20 bg-brand-100/30 dark:bg-navy-900/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-2xl">
          <div className="text-center space-y-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Consultation</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
              Connect with {companyName}
            </h3>
            <p className="text-sm text-navy-700 dark:text-brand-200/80">
              Submit your inquiry and our engineering specialists will respond within 24 hours.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold text-center">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy-950 dark:text-white">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-navy-950 border border-brand-500/20 dark:border-brand-400/20 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-navy-950 dark:text-white">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-navy-950 border border-brand-500/20 dark:border-brand-400/20 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-navy-950 dark:text-white">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-navy-950 border border-brand-500/20 dark:border-brand-400/20 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-navy-950 dark:text-white">
                    Inquiry Details / Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your society, interior site, or adhesive bulk requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-navy-950 border border-brand-500/20 dark:border-brand-400/20 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="gradient"
                  disabled={loading}
                  className="w-full justify-center"
                  icon={Send}
                >
                  {loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 animate-bounce" />
                </div>
                <h4 className="text-2xl font-bold text-navy-950 dark:text-white">
                  Inquiry Received Successfully!
                </h4>
                <p className="text-sm text-navy-700 dark:text-brand-200/80 max-w-md mx-auto">
                  Thank you, {formData.name}. Our technical team has received your message and will reach out to {formData.email} shortly.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Send Another Inquiry
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
