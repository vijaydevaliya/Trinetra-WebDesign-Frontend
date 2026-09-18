import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', forceDark = false }) => {
  const { isDark, toggleTheme } = useTheme();

  const colorClasses = forceDark
    ? 'bg-navy-800 text-brand-50'
    : 'bg-brand-100/50 dark:bg-navy-800 text-navy-900 dark:text-brand-50';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative p-2.5 rounded-xl border border-brand-500/20 overflow-hidden transition-colors ${colorClasses} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          className="block"
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
