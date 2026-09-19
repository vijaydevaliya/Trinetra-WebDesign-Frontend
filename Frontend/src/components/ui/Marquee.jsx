import React from 'react';

export const Marquee = ({ items = [], speed = '25s' }) => {
  // Exactly two copies, paired with the -50% translateX in the marquee
  // keyframes (tailwind.config.js) — that's what makes the loop seamless.
  const doubledItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none group">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-50 dark:from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-50 dark:from-navy-950 to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: speed }}
      >
        {doubledItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card-light dark:glass-card-dark text-sm font-semibold text-navy-900 dark:text-brand-100 border border-brand-500/20 hover:border-brand-400 hover:scale-105 transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
