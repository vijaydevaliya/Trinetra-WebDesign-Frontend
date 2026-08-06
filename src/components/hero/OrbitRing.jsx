import React from 'react';
import { motion } from 'framer-motion';

export const OrbitRing = ({
  size = 420,
  duration = 36,
  reverse = false,
  isBlasting = false,
  isMain = false,
}) => {
  return (
    <motion.div
      style={{ width: `${size}px`, height: `${size}px` }}
      animate={
        isBlasting
          ? { scale: [0.8, 1.3, 1.6], opacity: [0, 1, 0] }
          : { rotate: reverse ? -360 : 360, scale: 1, opacity: 1 }
      }
      transition={
        isBlasting
          ? { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
          : { rotate: { duration, repeat: Infinity, ease: 'linear' } }
      }
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 ${
        isMain
          ? 'border-2 border-brand-400/60 shadow-[0_0_30px_rgba(79,192,232,0.45)] ring-1 ring-brand-300/30'
          : 'border border-brand-500/20 dark:border-brand-400/20'
      }`}
    >
      {/* Radiant Comet dot on ring */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-300 shadow-[0_0_15px_#4FC0E8]" />
    </motion.div>
  );
};
