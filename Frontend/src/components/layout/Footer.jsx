import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUpRight } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { PARENT_COMPANY, SUBSIDIARIES } from '../../data/companies';

export const Footer = () => {
  return (
    <footer className="relative bg-brand-50 dark:bg-navy-950 text-navy-900 dark:text-white pt-20 pb-12 border-t border-brand-500/15 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Group Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <LogoPlate logo="trinetra" size="lg" />
            </Link>
            <p className="text-sm text-navy-600 dark:text-brand-200/80 leading-relaxed max-w-sm">
              {PARENT_COMPANY.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-brand-100/60 dark:bg-navy-900 border border-brand-500/20 text-brand-600 dark:text-brand-300 hover:text-navy-950 dark:hover:text-white hover:bg-brand-500/20 hover:scale-[1.15] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Group Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-6">
              Group Navigation
            </h3>
            <ul className="space-y-3.5 text-sm text-navy-600 dark:text-brand-200/80">
              <li>
                <Link to="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">Group Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-navy-950 dark:hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-navy-950 dark:hover:text-white transition-colors">Contact Group</Link>
              </li>
              <li>
                <a href="#who-we-are" className="hover:text-navy-950 dark:hover:text-white transition-colors">Our Vision</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-navy-950 dark:hover:text-white transition-colors">Milestones</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Subsidiary Companies */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-6">
              Subsidiaries
            </h3>
            <ul className="space-y-3 text-sm">
              {SUBSIDIARIES.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={sub.route}
                    className="group inline-flex items-center gap-1.5 text-navy-600 dark:text-brand-200/80 hover:text-navy-950 dark:hover:text-white transition-colors"
                  >
                    <span>{sub.fullName}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-6">
              Corporate Office
            </h3>
            <ul className="space-y-4 text-sm text-navy-600 dark:text-brand-200/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-1" />
                <span>Trinetra Technoworld HQ, Tech Park Towers, Hinjewadi Phase 1, Pune, Maharashtra 411057</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="tel:+912068009000" className="hover:text-navy-950 dark:hover:text-white transition-colors">+91 (020) 6800-9000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="mailto:info@trinetratechnoworld.com" className="hover:text-navy-950 dark:hover:text-white transition-colors">info@trinetratechnoworld.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-brand-500/15 dark:border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-navy-500 dark:text-brand-200/60 gap-4">
          <p>© {new Date().getFullYear()} Trinetra Technoworld Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-navy-950 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-navy-950 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-navy-950 dark:hover:text-white transition-colors">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
