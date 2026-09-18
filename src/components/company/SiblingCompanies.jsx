import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { SUBSIDIARIES } from '../../data/companies';

export const SiblingCompanies = ({ currentCompanyId }) => {
  const siblings = SUBSIDIARIES.filter((s) => s.id !== currentCompanyId);

  return (
    <section className="py-20 bg-brand-50 dark:bg-navy-950 border-t border-brand-500/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">
            More From Trinetra Group
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
            Explore Sister Companies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siblings.map((sub) => (
            <Link
              key={sub.id}
              to={sub.route}
              className="group p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 hover:border-brand-400/50 transition-all duration-300 flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-4">
                <LogoPlate logo={sub.id} size="md" />
                <div>
                  <h4 className="font-bold text-base text-navy-950 dark:text-white group-hover:text-brand-400 transition-colors">
                    {sub.fullName}
                  </h4>
                  <p className="text-xs text-navy-600 dark:text-brand-200/70">
                    {sub.heroBadge}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-full bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
