import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { LogoPlate } from '../components/ui/LogoPlate';
import { PARENT_COMPANY, SUBSIDIARIES } from '../data/companies';
import { ShieldCheck, Cpu, Target, Award, Users } from 'lucide-react';
import { CTABand } from '../components/sections/CTABand';

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us — Trinetra Technoworld Pvt Ltd</title>
        <meta
          name="description"
          content="Learn about Trinetra Technoworld Group corporate philosophy, leadership vision, and subsidiary synergy across society tech, interior architecture, and construction materials."
        />
      </Helmet>

      <div className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Header */}
          <SectionHeading
            badge="Corporate Overview"
            title="Discover Our Commitment to Smart Living"
            subtitle="Explore Our Comprehensive Range of Smart Home Services"
          />

          {/* Philosophy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                Our Corporate Vision
              </span>
              <h2 className="text-3xl font-bold text-navy-950 dark:text-white">
                Synergizing Software Automation & Physical Infrastructure
              </h2>
              <p className="text-navy-800 dark:text-brand-200/90 text-base leading-relaxed">
                Founded in 2018, Trinetra Technoworld began with a singular focus: replacing fragmented manual processes with automated software and structural engineering.
              </p>
              <p className="text-navy-800 dark:text-brand-200/90 text-base leading-relaxed">
                Today, our group operates three independent subsidiaries—<strong className="text-brand-600 dark:text-brand-300">Vasuki</strong> (Society Management Automation), <strong className="text-brand-600 dark:text-brand-300">Vishwakarma</strong> (Turnkey Interior Architecture), and <strong className="text-brand-600 dark:text-brand-300">Tribond</strong> (Construction Adhesives & Chemicals).
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="p-8 rounded-3xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-2xl space-y-6">
                <div className="flex items-center gap-4">
                  <LogoPlate logo="trinetra" size="lg" />
                  <div>
                    <h3 className="font-bold text-lg text-navy-950 dark:text-white">Trinetra Group HQ</h3>
                    <p className="text-xs text-brand-500 font-semibold">Incorporated 2018</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-navy-900 dark:text-brand-100 pt-2 border-t border-brand-200 dark:border-navy-800">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-400" />
                    <span>ISO 9001 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-400" />
                    <span>250+ Group Workforce</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-brand-400" />
                    <span>Proprietary Tech Stack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-400" />
                    <span>100% Quality SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subsidiaries Overview Cards */}
          <div>
            <SectionHeading
              badge="Organizational Structure"
              title="The Three Pillar Entities"
              subtitle="Each subsidiary operates autonomously while drawing from Trinetra Technoworld centralized R&D, tech stack, and corporate governance."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {SUBSIDIARIES.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-xl space-y-4"
                >
                  <LogoPlate logo={sub.id} size="md" />
                  <h3 className="text-xl font-bold text-navy-950 dark:text-white">{sub.fullName}</h3>
                  <p className="text-xs text-brand-500 font-semibold italic">"{sub.tagline}"</p>
                  <p className="text-sm text-navy-700 dark:text-brand-200/80 leading-relaxed">{sub.positioning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTABand />
    </>
  );
};
