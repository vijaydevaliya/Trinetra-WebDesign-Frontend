import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABand } from '../components/sections/CTABand';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const counts = useMemo(() => {
    return PROJECT_CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = cat.id === 'all'
        ? PROJECTS.length
        : PROJECTS.filter((p) => p.category === cat.id).length;
      return acc;
    }, {});
  }, []);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Our Projects — Vishwakarma by Trinetra</title>
        <meta
          name="description"
          content="Browse Vishwakarma's portfolio of completed interior design projects across bedrooms, living rooms, dining areas, and bespoke spaces."
        />
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Portfolio"
            title={<>Our <span className="text-brand-500">Projects</span></>}
            subtitle="Browse through our work by space"
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/30'
                      : 'bg-transparent text-navy-700 dark:text-brand-100 border-brand-500/20 hover:border-brand-400/60 hover:text-brand-600 dark:hover:text-brand-300'
                  }`}
                >
                  {cat.label}{' '}
                  <span className={isActive ? 'text-white/80' : 'text-brand-500/70'}>
                    ({counts[cat.id]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry Gallery */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-brand-500/15 shadow-lg"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-950/0 group-hover:bg-navy-950/60 transition-colors duration-300">
                    <span className="px-4 text-center text-base sm:text-lg font-semibold text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {project.title}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 text-center text-sm text-navy-600 dark:text-brand-200/70">
            Showing <span className="font-semibold text-navy-950 dark:text-white">{filteredProjects.length}</span> of{' '}
            <span className="font-semibold text-navy-950 dark:text-white">{PROJECTS.length}</span> projects
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
};
