import React from 'react';
import { Helmet } from 'react-helmet-async';
import { OrbitHero } from '../components/hero/OrbitHero';
import { WhoWeAre } from '../components/sections/WhoWeAre';
import { StatsCounter } from '../components/sections/StatsCounter';
import { CompaniesGrid } from '../components/sections/CompaniesGrid';
import { Marquee } from '../components/ui/Marquee';
import { Timeline } from '../components/sections/Timeline';
import { Testimonials } from '../components/sections/Testimonials';
import { CTABand } from '../components/sections/CTABand';

const CAPABILITIES = [
  'IoT Hardware Integration',
  'Process Automation',
  'Housing Society ERP',
  'Cloud Infrastructure',
  'Mobile Apps',
  'Data Analytics',
  'Smart Gated Community',
  'Turnkey Interior Design',
  'Tile Adhesives & Grouts',
  'Waterproofing Mortars',
  '3D Spatial Visualization',
  '24/7 Support Desk'
];

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Trinetra Technoworld Group — One Vision. Three Specialisations.</title>
        <meta
          name="description"
          content="Trinetra Technoworld Pvt Ltd — Parent company of Vasuki, Vishwakarma, and Tribond. Automation at the core, expertise at the edge."
        />
      </Helmet>

      {/* 1. Orbit -> Blast -> Reveal Hero */}
      <OrbitHero />

      {/* 2. Who We Are Section */}
      <WhoWeAre />

      {/* 3. Stats Counter */}
      <StatsCounter />

      {/* 4. Subsidiary Companies Grid */}
      <CompaniesGrid />

      {/* 5. Capability Strip Marquee */}
      <div className="py-8 bg-navy-950 border-y border-brand-500/20">
        <Marquee items={CAPABILITIES} />
      </div>

      {/* 6. Timeline */}
      <Timeline />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Call to Action Band */}
      <CTABand />
    </>
  );
};
