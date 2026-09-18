import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Calendar, Award, Building, Rocket, Shield } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    year: '2018',
    title: 'Group Inception & Trinetra Technoworld Founded',
    desc: 'Established as an automation-first technology entity focusing on smart infrastructure and software systems.',
    icon: Rocket,
  },
  {
    year: '2020',
    title: 'Launch of Vasuki Society Management Platform',
    desc: 'Rolled out cloud-native apartment management solution serving over 100+ residential societies in Maharashtra.',
    icon: Building,
  },
  {
    year: '2021',
    title: 'Vishwakarma Interior Design Division Created',
    desc: 'Expanded into luxury turnkey interior architecture, custom woodworking, and commercial fit-outs.',
    icon: Award,
  },
  {
    year: '2023',
    title: 'Tribond Construction Adhesives Factory Operational',
    desc: 'Commissioned ISO 9001 certified chemical manufacturing plant producing high-performance tile adhesives & grouts.',
    icon: Shield,
  },
  {
    year: '2026+',
    title: 'Cross-Domain Synergy & Multi-State Expansion',
    desc: 'Crossing 1,250+ delivered projects across 45+ cities, setting new benchmarks in integrated automation & infrastructure.',
    icon: Calendar,
  },
];

export const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="timeline" ref={containerRef} className="py-24 bg-brand-100/20 dark:bg-navy-900/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Group Journey"
          title="Milestones of Innovation"
          subtitle="Tracing our progression from a technology initiative to a multi-industry corporate powerhouse."
        />

        <div className="relative mt-20">
          {/* Animated SVG Path Drawing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(43, 155, 224, 0.2)"
                strokeWidth="4"
              />
              <motion.line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="#4FC0E8"
                strokeWidth="4"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-16">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Box */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-lg relative group hover:border-brand-400/50 transition-colors">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-300 mb-2">
                        {event.year}
                      </span>
                      <h4 className="text-lg font-bold text-navy-950 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-navy-700 dark:text-brand-200/80 mt-2 leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  </div>

                  {/* Node Circle */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg z-10 border-4 border-brand-50 dark:border-navy-950">
                    <event.icon className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
