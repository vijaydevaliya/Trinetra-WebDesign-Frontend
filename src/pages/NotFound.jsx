import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LogoPlate } from '../components/ui/LogoPlate';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Trinetra Technoworld Group</title>
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-50 dark:bg-navy-950 text-navy-900 dark:text-white text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-md"
        >
          <LogoPlate logo="trinetra" size="xl" className="mx-auto shadow-2xl" />

          <h1 className="text-7xl font-extrabold text-gradient font-mono">
            404
          </h1>

          <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
            Page Not Found
          </h2>

          <p className="text-sm text-navy-600 dark:text-brand-200/80 leading-relaxed">
            The page or resource you are looking for has moved or does not exist in the Trinetra Technoworld directory.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Button to="/" variant="gradient" size="md" icon={Home}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
