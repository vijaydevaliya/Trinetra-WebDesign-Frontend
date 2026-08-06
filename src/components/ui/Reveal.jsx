import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, EASE } from '../../lib/motion';

export const Reveal = ({
  children,
  width = 'w-full',
  delay = 0,
  duration = 0.6,
  y = 28,
  className = '',
  once = true
}) => {
  return (
    <div className={`${width} ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-80px' }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
};
