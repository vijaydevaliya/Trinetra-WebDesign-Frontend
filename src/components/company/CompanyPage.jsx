import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Star } from 'lucide-react';

import { CompanyHero } from './CompanyHero';
import { SectionHeading } from '../ui/SectionHeading';
import { FAQ } from './FAQ';
import { ContactForm } from './ContactForm';
import { SiblingCompanies } from './SiblingCompanies';

export const CompanyPage = ({ company, customWidget, faqItems = [] }) => {
  if (!company) return null;

  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <CompanyHero company={company} />

      {/* 2. Overview */}
      <section className="py-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                Core Positioning & Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white">
                Transforming Domain Operations with Engineering Excellence
              </h2>
              <p className="text-base sm:text-lg text-navy-800 dark:text-brand-200/90 leading-relaxed">
                {company.description}
              </p>
              <div className="space-y-3 pt-2">
                {(company.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-navy-900 dark:text-brand-100">
                    <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parallax Accent Shape Container */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md h-72 rounded-3xl glass-card-light dark:glass-card-dark p-8 border border-brand-500/20 shadow-2xl flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
                <ShieldCheck className="w-12 h-12 text-brand-400" />
                <div>
                  <h3 className="text-2xl font-bold text-navy-950 dark:text-white">
                    100% Guaranteed Standards
                  </h3>
                  <p className="text-xs text-navy-700 dark:text-brand-200/80 mt-1">
                    Backed by Trinetra Technoworld Pvt Ltd corporate quality assurance and SLAs.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>5-Star Industry Performance Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section id="services" className="py-20 bg-brand-100/20 dark:bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Service Portfolio"
            title={`Comprehensive ${company.name} Capabilities`}
            subtitle={`End-to-end solutions engineered for perfection.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {(company.services || []).map((serv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-lg group hover:border-brand-400/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-navy-950 dark:text-white group-hover:text-brand-400 transition-colors">
                    {serv.title}
                  </h4>
                  <p className="text-xs text-navy-700 dark:text-brand-200/80 leading-relaxed">
                    {serv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Custom Interactive Showcase Widget */}
      {customWidget && (
        <section className="py-20 bg-brand-50 dark:bg-navy-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {customWidget}
          </div>
        </section>
      )}

      {/* 5. FAQ Accordion */}
      <FAQ items={faqItems} />

      {/* 6. Contact Form */}
      <ContactForm companyName={company.fullName} />

      {/* 7. Sister Companies Strip */}
      <SiblingCompanies currentCompanyId={company.id} />
    </div>
  );
};
