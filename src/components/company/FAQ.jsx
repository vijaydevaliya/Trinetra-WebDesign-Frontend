import React from 'react';
import { Accordion } from '../ui/Accordion';
import { SectionHeading } from '../ui/SectionHeading';

export const FAQ = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-brand-50 dark:bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Clear Answers to Your Queries"
          subtitle="Everything you need to know about implementation, technical specifications, and group warranties."
        />

        <div className="mt-10">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
};
