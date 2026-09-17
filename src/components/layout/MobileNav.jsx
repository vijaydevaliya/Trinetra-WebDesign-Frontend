import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { Button } from '../ui/Button';

export const MobileNav = ({ isOpen, onClose, subsidiaries = [] }) => {
  const location = useLocation();

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    },
    open: {
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 30 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy-800 pb-6">
            <LogoPlate logo="trinetra" size="md" forceGlow />
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="p-2.5 rounded-full bg-navy-800 text-brand-300 border border-brand-500/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Links */}
          <div className="my-auto py-8 space-y-6">
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                onClick={onClose}
                className={`text-2xl font-bold transition-colors ${
                  location.pathname === '/' ? 'text-brand-400' : 'text-white hover:text-brand-300'
                }`}
              >
                Home
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                Our Companies
              </div>
              <div className="grid gap-3 pl-2">
                {subsidiaries.map((sub) => (
                  <Link
                    key={sub.id}
                    to={sub.route}
                    onClick={onClose}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-navy-900/80 border border-brand-500/15 hover:border-brand-400/40"
                  >
                    <div className="flex items-center gap-3">
                      <LogoPlate logo={sub.id} size="sm" forceGlow />
                      <div>
                        <div className="font-bold text-sm text-white">{sub.fullName}</div>
                        <div className="text-xs text-brand-200/70">{sub.heroBadge}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-400" />
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                to="/about"
                onClick={onClose}
                className={`text-2xl font-bold transition-colors ${
                  location.pathname === '/about' ? 'text-brand-400' : 'text-white hover:text-brand-300'
                }`}
              >
                About Us
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                to="/contact"
                onClick={onClose}
                className={`text-2xl font-bold transition-colors ${
                  location.pathname === '/contact' ? 'text-brand-400' : 'text-white hover:text-brand-300'
                }`}
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Footer Action */}
          <motion.div variants={itemVariants} className="pt-6 border-t border-navy-800">
            <Button to="/contact" variant="gradient" size="lg" className="w-full justify-center">
              Talk to Us
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
