import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="py-24 relative overflow-hidden bg-brand-50 dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Trinetra Technoworld"
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
                  <LogoPlate logo="trinetra-full" size="xl" className="filter drop-shadow-none dark:drop-shadow-[0_0_24px_rgba(79,192,232,0.7)]" />
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Intro + Feature Blocks + Stat Bars */}
          <div className="lg:col-span-7 space-y-6 text-navy-800 dark:text-brand-200/90 leading-relaxed text-base md:text-lg">
            <Reveal y={20} delay={0.1}>
              <p>
                At <strong className="text-brand-700 dark:text-brand-300 font-semibold">Trinetra Technoworld Pvt Ltd</strong>, we don't just automate operations — we engineer ecosystems. From intelligent housing-society software (<span className="text-brand-600 dark:text-brand-400 font-medium">Vasuki</span>) to bespoke interiors (<span className="text-brand-600 dark:text-brand-400 font-medium">Vishwakarma</span>) and advanced construction adhesives (<span className="text-brand-600 dark:text-brand-400 font-medium">Tribond</span>), our subsidiaries operate under one unified vision of automation, precision, and lasting value.
              </p>
            </Reveal>

            <Reveal y={20} delay={0.2}>
              <div className="space-y-5 pt-2">
                {[
                  {
                    icon: Cpu,
                    title: 'Cross-Domain Engineering',
                    desc: 'Deep expertise across software, design, and manufacturing—delivering solutions built for real-world reliability.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Unified Support & Delivery',
                    desc: 'From onboarding to after-sales service, every subsidiary holds the same standard of responsiveness and accountability.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-brand-100/50 dark:bg-navy-900 border border-brand-500/20">
                      <item.icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-950 dark:text-white text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-navy-600 dark:text-brand-200/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal y={20} delay={0.3}>
              <div className="space-y-4 pt-4 border-t border-brand-500/15 dark:border-brand-400/15">
                {[
                  { label: 'Client Satisfaction', pct: 96 },
                  { label: 'On-Time Delivery', pct: 98 },
                ].map((bar, i) => (
                  <div key={i} className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-sm font-semibold text-navy-950 dark:text-white">
                      <span>{bar.label}</span>
                      <span className="text-brand-600 dark:text-brand-400">{bar.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-brand-100/60 dark:bg-navy-900 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                        className="h-full rounded-full bg-brand-gradient"
                      />
                    </div>
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
