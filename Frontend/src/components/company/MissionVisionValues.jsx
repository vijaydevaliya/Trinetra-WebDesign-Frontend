import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';

export const MissionVisionValues = ({ mission, vision, values = [] }) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-lg space-y-3 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 hover:border-brand-400/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/15 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-navy-950 dark:text-white">Mission</h4>
          <p className="text-sm text-navy-700 dark:text-brand-200/80 leading-relaxed">{mission}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-lg space-y-3 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 hover:border-brand-400/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/15 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-navy-950 dark:text-white">Vision</h4>
          <p className="text-sm text-navy-700 dark:text-brand-200/80 leading-relaxed">{vision}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {values.map((v, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-5 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-md space-y-2 hover:bg-brand-500/5 dark:hover:bg-brand-500/10 hover:border-brand-400/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/15 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 text-brand-400" />
            <h5 className="text-sm font-bold text-navy-950 dark:text-white">{v.title}</h5>
            <p className="text-xs text-navy-700 dark:text-brand-200/80 leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
