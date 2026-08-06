import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="py-24 relative overflow-hidden bg-brand-50 dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Automation-First Tech Group"
          title="Engineered for Tomorrow's Infrastructure"
          subtitle="Trinetra Technoworld Pvt Ltd bridges technology automation and real-world domain expertise."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          {/* Left Column: Floating Parent Logo Plate with Rotating Dashed Accent Ring */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Reveal y={30}>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Outer rotating dashed accent ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/30 dark:border-brand-400/30 animate-spin-slow" />

                {/* Ambient glow behind logo */}
                <div className="absolute w-48 h-48 bg-brand-500/20 blur-[80px] rounded-full pointer-events-none" />

                {/* Floating parent logo clean borderless */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex items-center justify-center p-4"
                >
                  <LogoPlate logo="trinetra" size="xl" className="filter drop-shadow-[0_0_24px_rgba(79,192,232,0.7)]" />
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3 Paragraphs + Feature Pills */}
          <div className="lg:col-span-7 space-y-6 text-navy-800 dark:text-brand-200/90 leading-relaxed text-base md:text-lg">
            <Reveal y={20} delay={0.1}>
              <p>
                At <strong className="text-brand-700 dark:text-brand-300 font-semibold">Trinetra Technoworld Pvt Ltd</strong>, we operate on a foundational principle: engineering systems should eliminate friction, automate routine tasks, and deliver absolute structural reliability.
              </p>
            </Reveal>

            <Reveal y={20} delay={0.2}>
              <p>
                From intelligent housing-society administration software (<span className="text-brand-600 dark:text-brand-400 font-medium">Vasuki</span>) to bespoke interior spaces (<span className="text-brand-600 dark:text-brand-400 font-medium">Vishwakarma</span>) and advanced construction adhesives (<span className="text-brand-600 dark:text-brand-400 font-medium">Tribond</span>), our subsidiaries execute with domain mastery.
              </p>
            </Reveal>

            <Reveal y={20} delay={0.3}>
              <p>
                We consolidate technology, operational architecture, and manufacturing under one unified vision—ensuring every project delivers scalable efficiency and lasting value.
              </p>
            </Reveal>

            <Reveal y={20} delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Cpu, title: 'Smart IoT & Automation' },
                  { icon: ShieldCheck, title: 'Uncompromising Quality' },
                  { icon: Zap, title: 'Turnkey Reliability' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-brand-100/50 dark:bg-navy-900 border border-brand-500/20 text-navy-950 dark:text-white text-xs font-semibold"
                  >
                    <item.icon className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
