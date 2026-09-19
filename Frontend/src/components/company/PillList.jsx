import React from 'react';
import { motion } from 'framer-motion';

export const PillList = ({ items = [] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {items.map((item, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-300 cursor-default"
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
};
