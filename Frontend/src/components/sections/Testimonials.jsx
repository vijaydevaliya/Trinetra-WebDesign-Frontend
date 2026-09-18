import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../data/testimonials';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-brand-50 dark:bg-navy-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Client Endorsements"
          title="Trusted Across Industries"
          subtitle="Hear from society RWA leadership, corporate clients, and engineering partners."
        />

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1000 }}
              className="p-8 sm:p-12 rounded-3xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-2xl relative text-center"
            >
              <Quote className="w-12 h-12 text-brand-500/30 mx-auto mb-6" />

              <p className="text-lg sm:text-xl font-medium text-navy-950 dark:text-brand-50 italic leading-relaxed">
                "{current.quote}"
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 my-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Author Details */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-gradient text-white font-bold flex items-center justify-center text-sm shadow-md mb-2">
                  {current.avatar}
                </div>
                <div className="font-bold text-navy-950 dark:text-white text-base">
                  {current.author}
                </div>
                <div className="text-xs text-brand-600 dark:text-brand-300">
                  {current.role} — <span className="font-semibold">{current.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-3 rounded-full bg-brand-100 dark:bg-navy-800 text-navy-900 dark:text-brand-100 hover:bg-brand-500/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-brand-500' : 'w-2.5 bg-brand-500/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-3 rounded-full bg-brand-100 dark:bg-navy-800 text-navy-900 dark:text-brand-100 hover:bg-brand-500/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
