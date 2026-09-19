import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative rounded-2xl p-6 transition-all duration-300 glass-card-light dark:glass-card-dark ${hover ? 'hover:bg-brand-500/5 dark:hover:bg-brand-500/10 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-500/20' : ''} ${
        glow ? 'shadow-xl shadow-brand-500/10 dark:shadow-brand-500/20 ring-1 ring-brand-500/30' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
