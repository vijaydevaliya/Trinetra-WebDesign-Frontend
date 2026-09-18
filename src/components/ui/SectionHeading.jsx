import React from 'react';
import { Reveal } from './Reveal';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  center = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <Reveal y={12} delay={0.1}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 border border-brand-500/20 mb-4">
            {badge}
          </span>
        </Reveal>
      )}

      {title && (
        <Reveal y={20} delay={0.2}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950 dark:text-white">
            {title}
          </h2>
        </Reveal>
      )}

      {subtitle && (
        <Reveal y={20} delay={0.3}>
          <p className="mt-4 text-base md:text-lg text-navy-700 dark:text-brand-200/80 leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};
