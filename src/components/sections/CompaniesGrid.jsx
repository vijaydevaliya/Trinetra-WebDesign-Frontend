import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { SectionHeading } from '../ui/SectionHeading';
import { SUBSIDIARIES } from '../../data/companies';

export const CompaniesGrid = () => {
  return (
    <section id="our-companies" className="py-24 bg-brand-50 dark:bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Subsidiary Portfolio"
          title="Three Pillar Specialisations"
          subtitle="Explore the specialized subsidiaries driving innovation in housing management, interior architecture, and construction materials."
        />

        <div className="space-y-16 mt-16">
          {SUBSIDIARIES.map((sub, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl glass-card-light dark:glass-card-dark p-8 md:p-12 border border-brand-500/20 shadow-xl"
              >
                {/* Logo & Visual Side - Borderless Clean Floating Logo */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex flex-col items-center justify-center p-6 text-center relative`}>
                  <div className="absolute w-48 h-48 bg-brand-400/20 blur-3xl rounded-full pointer-events-none" />
                  <LogoPlate logo={sub.id} size="lg" className="relative z-10 filter drop-shadow-[0_0_20px_rgba(79,192,232,0.7)]" />
                  <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 mt-5">
                    {sub.heroBadge}
                  </span>
                </div>

                {/* Description & Features Side */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-5`}>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                      {sub.fullName}
                    </h3>
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-300 italic mt-1">
                      "{sub.tagline}"
                    </p>
                  </div>

                  <p className="text-navy-800 dark:text-brand-200/90 text-base md:text-lg leading-relaxed">
                    {sub.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {sub.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-900 dark:text-brand-100">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      to={sub.route}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-gradient text-white font-semibold text-sm shadow-lg shadow-brand-500/20 hover:shadow-brand-500/35 hover:scale-105 transition-all duration-300"
                    >
                      <span>Explore {sub.name} Solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
