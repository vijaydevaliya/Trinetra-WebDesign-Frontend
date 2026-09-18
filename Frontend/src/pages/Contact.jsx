import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactForm } from '../components/company/ContactForm';
import { LogoPlate } from '../components/ui/LogoPlate';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us — Trinetra Technoworld Group</title>
        <meta
          name="description"
          content="Contact Trinetra Technoworld corporate headquarters or reach out directly to Vasuki, Vishwakarma, or Tribond subsidiary teams."
        />
      </Helmet>

      <div className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            badge="Get in Touch"
            title="We Are Here to Power Your Next Project"
            subtitle="Reach out to our corporate headquarters or individual subsidiary specialists."
          />

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Corporate Headquarters', desc: 'Trinetra Technoworld HQ, Hinjewadi Phase 1, Pune, MH 411057', phone: '+91 (020) 6800-9000', email: 'info@trinetratechnoworld.com', icon: MapPin },
              { title: 'Vasuki Support & Sales', desc: 'Dedicated Society Onboarding & Gate App Helpdesk', phone: '+91 (020) 6800-9001', email: 'support@vasuki.trinetra.com', icon: Phone },
              { title: 'Vishwakarma & Tribond Enquiries', desc: 'Interior Architecture & Construction Chemical Orders', phone: '+91 (020) 6800-9002', email: 'orders@tribond.trinetra.com', icon: Mail },
            ].map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-xl space-y-4"
              >
                <div className="p-3 rounded-xl bg-brand-500/10 text-brand-500 w-max">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">{c.title}</h3>
                <p className="text-sm text-navy-700 dark:text-brand-200/80">{c.desc}</p>
                <div className="space-y-1 text-xs font-semibold text-brand-600 dark:text-brand-300 pt-2 border-t border-brand-200 dark:border-navy-800">
                  <div>{c.phone}</div>
                  <div>{c.email}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <ContactForm companyName="Trinetra Technoworld Group" />
        </div>
      </div>
    </>
  );
};
