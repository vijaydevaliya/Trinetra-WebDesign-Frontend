import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CompanyPage } from '../components/company/CompanyPage';
import { DashboardPreview } from '../components/company/DashboardPreview';
import { SUBSIDIARIES } from '../data/companies';

const VASUKI_FAQ = [
  {
    question: 'How fast can Vasuki onboard our housing society?',
    answer: 'Complete society onboarding—including resident database upload, maintenance billing setup, and guard app configuration—typically takes less than 48 hours with our dedicated onboarding specialist.'
  },
  {
    question: 'Is resident personal data secure on Vasuki?',
    answer: 'Yes. Vasuki uses 256-bit SSL encryption, SOC-2 compliant cloud storage, and strictly adheres to Indian data protection standards. Resident numbers are masked for gate staff.'
  },
  {
    question: 'How are maintenance payments collected and reconciled?',
    answer: 'Residents receive auto-generated invoices via WhatsApp/Email with single-click UPI/NetBanking payment links. Funds deposit directly into the society bank account with zero manual reconciliation.'
  },
  {
    question: 'Can guards operate the gate app without internet connection?',
    answer: 'Yes. The Vasuki Guard App features local offline synchronization, buffering gate logs and syncing automatically once connectivity restores.'
  }
];

export const Vasuki = () => {
  const company = SUBSIDIARIES.find((s) => s.id === 'vasuki');

  if (!company) return null;

  return (
    <>
      <Helmet>
        <title>Vasuki by Trinetra — Smarter Living for Every Society</title>
        <meta
          name="description"
          content="Vasuki is an end-to-end housing-society and apartment-complex management platform automating maintenance billing, visitor gate-pass, and accounting."
        />
      </Helmet>

      <CompanyPage
        company={company}
        customWidget={<DashboardPreview />}
        faqItems={VASUKI_FAQ}
      />
    </>
  );
};
