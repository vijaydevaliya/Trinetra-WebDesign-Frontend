import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CompanyPage } from '../components/company/CompanyPage';
import { ProductCards } from '../components/company/ProductCards';
import { ProcessSteps } from '../components/company/ProcessSteps';
import { CoverageCalculator } from '../components/company/CoverageCalculator';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SUBSIDIARIES } from '../data/companies';

const TRIBOND_FAQ = [
  {
    question: 'Which adhesive grade should be used for large format vitrified tiles?',
    answer: 'For vitrified tiles and slabs exceeding 600x600mm or high-rise exterior cladding, we recommend Tribond ProGrip T2 or FlexMax T3 (IS 15477:2019 Type 2 / Type 3).'
  },
  {
    question: 'Can Tribond adhesives be applied directly over existing old tiles?',
    answer: 'Yes. Tribond FlexMax T3 is engineered with high-polymer flex modifiers specifically designed for tile-on-tile applications without requiring old tile chipping.'
  },
  {
    question: 'Are Tribond products certified under Indian National Standards?',
    answer: 'All Tribond formulations are manufactured in our ISO 9001:2015 certified plant and exceed IS 15477:2019 Type 1, Type 2, and Type 3 performance criteria.'
  },
  {
    question: 'What is the shelf life and packaging size?',
    answer: 'Tribond adhesives are packed in heavy-duty 20kg moisture-resistant bags with a guaranteed 12-month shelf life when stored in dry conditions.'
  }
];

export const Tribond = () => {
  const company = SUBSIDIARIES.find((s) => s.id === 'tribond');

  if (!company) return null;

  const customWidget = (
    <div className="space-y-20">
      {/* 1. Product Cards */}
      <div>
        <SectionHeading
          badge="Product Catalog"
          title="Engineered Construction Chemicals"
          subtitle="Polymer-modified mortars, tile adhesives, epoxy grouts, and waterproofing membranes."
        />
        <ProductCards products={company.products || []} />
      </div>

      {/* 2. Application Process Steps */}
      <div>
        <SectionHeading
          badge="Application Standard"
          title="5-Step Standardized Installation Protocol"
          subtitle="Following correct surface prep and notch troweling ensures 100% debonding resistance."
        />
        <ProcessSteps />
      </div>

      {/* 3. Coverage Calculator */}
      <div>
        <SectionHeading
          badge="Interactive Tool"
          title="Project Bag Estimator"
          subtitle="Accurately calculate 20kg bag requirement for your floor or wall area."
        />
        <CoverageCalculator />
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Tribond by Trinetra — Bonded to Last (Tile Adhesives & Chemicals)</title>
        <meta
          name="description"
          content="Tribond manufactures construction-grade tile adhesives, epoxy grouts, waterproofing compounds, and wall putty certified to IS 15477 standards."
        />
      </Helmet>

      <CompanyPage
        company={company}
        customWidget={customWidget}
        faqItems={TRIBOND_FAQ}
      />
    </>
  );
};
