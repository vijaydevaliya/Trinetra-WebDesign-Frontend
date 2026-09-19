import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const FeatureCategories = ({ categories = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-lg space-y-4"
        >
          <div className="flex items-center gap-3">
            {cat.icon && (
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center flex-shrink-0">
                <cat.icon className="w-4.5 h-4.5" />
              </div>
            )}
            <h4 className="text-base font-bold text-navy-950 dark:text-white">{cat.title}</h4>
          </div>
          <ul className="space-y-2.5">
            {cat.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-700 dark:text-brand-200/80">
                <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
