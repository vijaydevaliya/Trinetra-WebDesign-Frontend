import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABand } from '../components/sections/CTABand';
import { api, resolveImageUrl } from '../lib/api';
import { useCategories } from '../hooks/useCategories';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const { categories } = useCategories('project');

  useEffect(() => {
    api.get('/api/projects').then(setProjects).finally(() => setLoading(false));
  }, []);

  const filterPills = useMemo(() => [{ _id: 'all', name: 'All' }, ...categories], [categories]);

  const counts = useMemo(() => {
    return filterPills.reduce((acc, cat) => {
      const value = cat._id === 'all' ? 'all' : cat.name;
      acc[value] = value === 'all'
        ? projects.length
        : projects.filter((p) => p.category === value).length;
      return acc;
    }, {});
  }, [filterPills, projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

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
            {filterPills.map((cat) => {
              const value = cat._id === 'all' ? 'all' : cat.name;
              const isActive = activeCategory === value;
              return (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(value)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/30'
                      : 'bg-transparent text-navy-700 dark:text-brand-100 border-brand-500/20 hover:border-brand-400/60 hover:text-brand-600 dark:hover:text-brand-300'
                  }`}
                >
                  {cat.name}{' '}
                  <span className={isActive ? 'text-white/80' : 'text-brand-500/70'}>
                    ({counts[value] ?? 0})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry Gallery */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            </div>
          ) : (
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
                    key={project._id}
                    className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-brand-500/15 shadow-lg"
                  >
                    {project.images[0] && (
                      <img
                        src={resolveImageUrl(project.images[0])}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-950/0 group-hover:bg-navy-950/60 transition-colors duration-300">
                      <span className="px-4 text-center text-base sm:text-lg font-semibold text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {project.title}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          <p className="mt-4 text-center text-sm text-navy-600 dark:text-brand-200/70">
            Showing <span className="font-semibold text-navy-950 dark:text-white">{filteredProjects.length}</span> of{' '}
            <span className="font-semibold text-navy-950 dark:text-white">{projects.length}</span> projects
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
};
