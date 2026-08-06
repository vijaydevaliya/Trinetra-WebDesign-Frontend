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
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      className={`relative rounded-2xl p-6 transition-all duration-300 glass-card-light dark:glass-card-dark ${
        glow ? 'shadow-xl shadow-brand-500/10 dark:shadow-brand-500/20 ring-1 ring-brand-500/30' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
