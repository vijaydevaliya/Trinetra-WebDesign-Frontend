import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { Button } from '../ui/Button';
import { SUBSIDIARIES } from '../../data/companies';
import { MobileNav } from './MobileNav';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileNavOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Companies', path: '#companies', isDropdown: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-brand-50/80 dark:bg-navy-950/85 backdrop-blur-md border-b border-brand-500/15 shadow-lg shadow-navy-950/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Parent Logo Plate */}
          <Link to="/" className="group flex items-center gap-3">
            <LogoPlate logo="trinetra" size="md" />
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-brand-100/40 dark:bg-navy-900/60 p-1.5 rounded-full border border-brand-500/15 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.isDropdown && SUBSIDIARIES.some(s => s.route === location.pathname));

              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`relative px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'text-brand-600 dark:text-brand-300'
                          : 'text-navy-700 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-300'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-brand-500/10 dark:bg-brand-500/20 rounded-full -z-10 border border-brand-500/20"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Companies Dropdown Menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 sm:w-96"
                        >
                          <div className="p-3 rounded-2xl glass-card-light dark:glass-card-dark shadow-2xl border border-brand-500/20 space-y-2">
                            {SUBSIDIARIES.map((sub) => (
                              <Link
                                key={sub.id}
                                to={sub.route}
                                className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-brand-500/10 dark:hover:bg-brand-500/15 transition-all duration-200"
                              >
                                <LogoPlate logo={sub.id} size="sm" className="mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-navy-950 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-300 transition-colors">
                                      {sub.fullName}
                                    </h4>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-400" />
                                  </div>
                                  <p className="text-xs text-navy-600 dark:text-brand-200/70 line-clamp-1 mt-0.5">
                                    {sub.tagline}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-navy-700 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-300'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-brand-500/10 dark:bg-brand-500/20 rounded-full -z-10 border border-brand-500/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            <Button to="/contact" size="sm" variant="gradient">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-xl border border-brand-500/20 bg-brand-100/50 dark:bg-navy-800 text-navy-900 dark:text-brand-50"
            >
              {mobileNavOpen ? <X className="w-6 h-6 text-brand-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        subsidiaries={SUBSIDIARIES}
      />
    </>
  );
};
