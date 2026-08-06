import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { Button } from '../ui/Button';

export const CompanyHero = ({ company }) => {
  if (!company) return null;

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-navy-950 text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Back to Trinetra Group Pill */}
        <Link
          to="/"
          onClick={() => {
            try {
              sessionStorage.removeItem('brandBigBang.played');
            } catch (e) {}
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-brand-500/30 text-xs font-semibold text-brand-300 hover:text-white hover:border-brand-400 backdrop-blur-md transition-all duration-300 shadow-lg group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <LogoPlate logo="trinetra" size="sm" className="scale-75 origin-left" />
          <span>Back to Trinetra Group</span>
        </Link>

        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center py-2"
          >
            <div className="absolute w-48 h-48 bg-brand-400/20 blur-3xl rounded-full pointer-events-none" />
            <LogoPlate logo={company.id} size="xl" className="relative z-10 filter drop-shadow-[0_0_24px_rgba(79,192,232,0.7)]" />
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-300 border border-brand-500/20">
              {company.heroBadge}
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              <span className="text-gradient">{company.fullName}</span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-brand-300 italic">
              "{company.tagline}"
            </p>

            <p className="text-base sm:text-lg text-brand-200/80 leading-relaxed pt-2">
              {company.positioning}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button href="#services" size="lg" variant="gradient">
              Explore Services & Solutions
            </Button>
            <Button href="#inquiry" size="lg" variant="outline">
              Contact {company.name} Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
