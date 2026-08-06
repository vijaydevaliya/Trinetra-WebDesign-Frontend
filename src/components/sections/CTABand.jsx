import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTABand = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-brand-gradient text-white">
      {/* Animated light shine sweep overlay */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-brand-100 border border-white/20">
          <Sparkles className="w-4 h-4" />
          <span>Transform Your Infrastructure</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Ready to Build Something Extraordinary Together?
        </h2>

        <p className="text-base sm:text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
          Connect with Trinetra Technoworld Pvt Ltd and discover how our specialized subsidiaries elevate living, design, and construction.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/contact" size="lg" className="bg-white text-navy-950 hover:bg-brand-50 border-none shadow-2xl">
            <span>Schedule Corporate Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button to="/about" size="lg" className="bg-navy-950/40 text-white hover:bg-navy-950/60 border border-white/30 backdrop-blur-md">
            Learn More About Group
          </Button>
        </div>
      </div>
    </section>
  );
};
