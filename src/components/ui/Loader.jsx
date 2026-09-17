import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoPlate } from './LogoPlate';

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-50 dark:bg-navy-950 text-navy-900 dark:text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <LogoPlate logo="trinetra" size="xl" />
          </motion.div>

          <div className="w-48 h-1 bg-brand-100 dark:bg-navy-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0 bg-brand-gradient"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
