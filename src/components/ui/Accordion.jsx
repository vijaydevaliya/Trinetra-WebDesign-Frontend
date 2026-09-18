import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-brand-200 dark:border-navy-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 text-left flex items-center justify-between gap-4 font-semibold text-base md:text-lg text-navy-950 dark:text-brand-50 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-brand-500"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm md:text-base text-navy-700 dark:text-brand-200/80 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rounded-2xl glass-card-light dark:glass-card-dark p-6 md:p-8 divide-y divide-brand-200 dark:divide-navy-800">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.question}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
};
