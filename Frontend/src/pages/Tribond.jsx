import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CompanyPage } from '../components/company/CompanyPage';
import { MissionVisionValues } from '../components/company/MissionVisionValues';
import { PillList } from '../components/company/PillList';
import { TribondProductSheet } from '../components/company/TribondProductSheet';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CardGridSkeleton } from '../components/ui/CardGridSkeleton';
import { api } from '../lib/api';
import { SUBSIDIARIES } from '../data/companies';

const TRIBOND_FAQ = [
  {
    question: 'What standards do Tribond adhesives comply with?',
    answer: 'Tribond tile adhesives are manufactured to meet IS 15477:2019 and EN 12004 standards, with ANSI A118.4 shear bond strength classifications (C1T, C2T, C2TE or C2TES1 depending on the product type).'
  },
  {
    question: 'Which Tribond adhesive is suitable for vitrified tiles and natural stone?',
    answer: 'TRI T2 is designed for medium to large format ceramic tiles, vitrified tiles, marble, and natural stone on both floors and walls.'
  },
  {
    question: 'Can Tribond adhesives be used in swimming pools or wet areas?',
    answer: 'TRI T3 and TRI T4 are suitable for high-performance and high-moisture areas, including swimming pools and other wet zones.'
  },
  {
    question: 'How much coverage does a 20 kg bag provide?',
    answer: 'Coverage is approximately 25-30 sq. ft. per 20 kg bag at 3-5 mm thickness, and can vary depending on notch trowel size and site conditions.'
  },
  {
    question: 'How should Tribond adhesive powder be mixed?',
    answer: 'Always add the powder to water, not water to the powder, and avoid exceeding the recommended water quantity for the correct consistency.'
  }
];

export const Tribond = () => {
  const company = SUBSIDIARIES.find((s) => s.id === 'tribond');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/tribond-products')
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  if (!company) return null;

  const customWidget = (
    <div className="space-y-20">
      {/* 1. Mission, Vision & Core Values */}
      <div>
        <SectionHeading
          badge="About Tribond"
          title="Mission, Vision & Core Values"
          subtitle="Strong Bond. Stronger Trust."
        />
        <div className="mt-12">
          <MissionVisionValues mission={company.mission} vision={company.vision} values={company.values} />
        </div>
      </div>

      {/* 2. Industries We Serve */}
      <div>
        <SectionHeading
          badge="Where We're Used"
          title="Industries We Serve"
          subtitle="Bonding solutions trusted across a wide range of applications."
        />
        <div className="mt-10">
          <PillList items={company.industries} />
        </div>
      </div>

      {/* 3. Product Data Sheets */}
      <div>
        <SectionHeading
          badge="Product Range"
          title="Tribond Tile Adhesives"
          subtitle="Technical data sheets for our certified adhesive formulations."
        />
        <div className="mt-12">
          {productsLoading ? (
            <CardGridSkeleton count={4} columns="" aspect="aspect-[16/6]" />
          ) : (
            <TribondProductSheet products={products} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Tribond by Trinetra — Strong Bond. Stronger Trust.</title>
        <meta
          name="description"
          content="Tribond manufactures high-performance tile adhesives certified to IS 15477:2019 and EN 12004 standards, for construction, industrial, and household bonding needs."
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
