import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PARENT_COMPANY } from '../../data/companies';
import { useCountUp } from '../../hooks/useCountUp';

const StatCard = ({ stat, index }) => {
  const [inView, setInView] = useState(false);
  const count = useCountUp(stat.value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 rounded-2xl glass-card-light dark:glass-card-dark text-center border border-brand-500/20 shadow-lg relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-4xl md:text-5xl font-extrabold text-gradient mb-2 tracking-tight">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wider text-navy-700 dark:text-brand-200/80">
        {stat.label}
      </div>
    </motion.div>
  );
};

export const StatsCounter = () => {
  return (
    <section className="py-16 bg-brand-100/30 dark:bg-navy-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PARENT_COMPANY.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
