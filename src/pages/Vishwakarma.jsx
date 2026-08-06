import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CompanyPage } from '../components/company/CompanyPage';
import { BeforeAfterSlider } from '../components/company/BeforeAfterSlider';
import { SUBSIDIARIES } from '../data/companies';

const VISHWAKARMA_FAQ = [
  {
    question: 'What is the typical timeline for a 3BHK turnkey interior project?',
    answer: 'Standard residential execution takes 45 to 60 days from final 3D design freeze and BOQ sign-off. We provide fixed completion guarantees with daily photo updates.'
  },
  {
    question: 'How do 3D walkthrough previews match the actual finished output?',
    answer: 'Our architects construct 3D renders using exact CAD dimensions and actual material textures (veneers, tiles, laminates) sourced from verified vendors, achieving over 95% visual accuracy.'
  },
  {
    question: 'What warranty is provided on modular woodworks?',
    answer: 'Vishwakarma provides a comprehensive 10-year warranty against manufacturing defects, termite infestation, and hardware malfunctions on all modular kitchen and wardrobe cabinetry.'
  },
  {
    question: 'Do you handle commercial and office fit-outs?',
    answer: 'Yes. We design and execute corporate office interiors, retail flagship stores, and hospitality spaces with integrated HVAC, acoustic treatment, and electrical layouts.'
  }
];

export const Vishwakarma = () => {
  const company = SUBSIDIARIES.find((s) => s.id === 'vishwakarma');

  if (!company) return null;

  return (
    <>
      <Helmet>
        <title>Vishwakarma by Trinetra — Spaces Designed with Intent</title>
        <meta
          name="description"
          content="Vishwakarma delivers full-service interior design, 3D walkthroughs, modular kitchens, and turnkey execution for residential and commercial spaces."
        />
      </Helmet>

      <CompanyPage
        company={company}
        customWidget={<BeforeAfterSlider />}
        faqItems={VISHWAKARMA_FAQ}
      />
    </>
  );
};
