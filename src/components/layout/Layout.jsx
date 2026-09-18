import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { BackToTop } from '../ui/BackToTop';
import { Loader } from '../ui/Loader';

export const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-brand-50 dark:bg-navy-950 text-navy-900 dark:text-brand-50 transition-colors duration-300">
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};
