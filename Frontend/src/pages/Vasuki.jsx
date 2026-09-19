import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Home, Users, ShieldCheck, CalendarCheck, Lock } from 'lucide-react';
import { CompanyPage } from '../components/company/CompanyPage';
import { DashboardPreview } from '../components/company/DashboardPreview';
import { MissionVisionValues } from '../components/company/MissionVisionValues';
import { FeatureCategories } from '../components/company/FeatureCategories';
import { PillList } from '../components/company/PillList';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SUBSIDIARIES } from '../data/companies';

const VASUKI_MISSION =
  'To digitize and simplify everyday society management, empowering residents, committees, and security teams with one unified, easy-to-use platform that saves time and builds trust.';

const VASUKI_VISION =
  "To become India's most trusted society management platform, enabling every gated community to run efficiently, transparently, and securely.";

const VASUKI_VALUES = [
  { title: 'Transparency', desc: 'Every transaction, invoice, and expense is visible and auditable to residents and committees.' },
  { title: 'Trust', desc: 'We safeguard resident data and financial records with bank-grade security.' },
  { title: 'Innovation', desc: 'Continuous investment in automation, IoT, and smart technology.' },
  { title: 'Community Focus', desc: 'Residents, managers, and guards are at the center of everything we build.' },
  { title: 'Reliability', desc: 'Built for 24/7 uptime so gate security and payments never stop.' },
];

const WHY_VASUKI = [
  'Automated WhatsApp & Email payment reminders',
  'Integrated UPI and NetBanking payment gateway',
  'Guard app with offline sync capability',
  'Smart-lock & IoT gate integration for keyless entry',
  'Multi-tower / multi-phase society support from one dashboard',
  '100% GDPR & data privacy compliant storage',
];

const WHO_WE_SERVE = [
  'Gated Residential Societies',
  'Apartment Complexes & Towers',
  'Villa Communities & Townships',
  'Commercial Complexes',
  'Mixed-Use Developments',
  'Builder & Developer Managed Projects',
];

const FEATURE_CATEGORIES = [
  {
    title: 'For Residents',
    icon: Home,
    items: [
      'Digital directory of owners, tenants, and family members per unit',
      'One-tap visitor approval via app notification — no gate calls needed',
      'Real-time delivery/courier tracking with a "leave-at-gate" option',
      'Auto-generated maintenance invoices with UPI/NetBanking one-click payment',
      'Raise and track complaints with photo attachments and live status',
      'Panic/SOS button connected directly to the security desk',
    ],
  },
  {
    title: 'For Managers & Committees',
    icon: Users,
    items: [
      'Society-wide dashboard for dues, collections, expenses, and occupancy',
      'Automated invoicing — flat-wise, area-wise, or slab-based billing',
      'Double-entry accounting with GST/TDS-ready reports and audit trails',
      'Vendor & AMC contract tracking with renewal reminders',
      'Staff payroll, attendance, and shift management for society employees',
      'Role-based access — admin, treasurer, auditor, manager, view-only',
    ],
  },
  {
    title: 'For Guards & Security',
    icon: ShieldCheck,
    items: [
      'Guard app with photo-based visitor entry and QR/OTP verification',
      'Offline-first mode — logs sync automatically once network returns',
      'Vehicle in/out logging for guests, cabs, and delivery vehicles',
      'Shift handover notes and duty roster management',
      'Multilingual guard interface for easy on-ground adoption',
    ],
  },
  {
    title: 'Amenities & Community',
    icon: CalendarCheck,
    items: [
      'Real-time slot booking for clubhouses, pools, and sports courts',
      'Configurable pricing, cancellation policies, and usage limits',
      'Event calendar with RSVPs and community engagement tools',
      'Resident marketplace for classifieds and local services',
    ],
  },
  {
    title: 'Accounting, Compliance & Security',
    icon: Lock,
    items: [
      'Bank-grade encryption and GDPR-compliant data storage',
      'UPI, NetBanking, and card payment gateway integration',
      'Automated bank reconciliation and defaulter tracking',
      'Smart-lock & IoT gate integration for keyless entry',
    ],
  },
];

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

  const customWidget = (
    <div className="space-y-20">
      {/* 1. Live Dashboard Preview */}
      <div>
        <DashboardPreview />
      </div>

      {/* 2. Mission, Vision & Core Values */}
      <div>
        <SectionHeading
          badge="Our Foundation"
          title="Mission, Vision & Core Values"
          subtitle="The principles that guide every feature we build."
        />
        <div className="mt-12">
          <MissionVisionValues mission={VASUKI_MISSION} vision={VASUKI_VISION} values={VASUKI_VALUES} />
        </div>
      </div>

      {/* 3. Why Vasuki */}
      <div>
        <SectionHeading
          badge="Differentiators"
          title="Why Vasuki?"
          subtitle="What sets our society management platform apart."
        />
        <div className="mt-10">
          <PillList items={WHY_VASUKI} />
        </div>
      </div>

      {/* 4. Who We Serve */}
      <div>
        <SectionHeading
          badge="Communities We Power"
          title="Who We Serve"
          subtitle="Built for every kind of managed community."
        />
        <div className="mt-10">
          <PillList items={WHO_WE_SERVE} />
        </div>
      </div>

      {/* 5. Role-wise Key Features */}
      <div>
        <SectionHeading
          badge="Complete Toolkit"
          title="Key Features for Every Stakeholder"
          subtitle="Purpose-built tools for residents, committees, and security teams."
        />
        <div className="mt-12">
          <FeatureCategories categories={FEATURE_CATEGORIES} />
        </div>
      </div>
    </div>
  );

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
        customWidget={customWidget}
        faqItems={VASUKI_FAQ}
      />
    </>
  );
};
