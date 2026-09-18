import React from 'react';
import { motion } from 'framer-motion';
import { Download, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const ProductCards = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((prod, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -6 }}
          className="rounded-3xl glass-card-light dark:glass-card-dark p-6 border border-brand-500/20 shadow-xl flex flex-col justify-between group hover:border-brand-400/50 transition-all duration-300"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                {prod.badge}
              </span>
              <Layers className="w-5 h-5 text-brand-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white group-hover:text-brand-300 transition-colors">
                {prod.title}
              </h3>
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-1">
                {prod.category}
              </p>
            </div>

            <p className="text-sm text-navy-700 dark:text-brand-200/80 leading-relaxed">
              {prod.desc}
            </p>

            <div className="p-3 rounded-xl bg-brand-50 dark:bg-navy-900 border border-brand-500/15 text-xs font-mono text-navy-900 dark:text-brand-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{prod.specs}</span>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => alert(`Downloading Technical Data Sheet for ${prod.title}... (Stub)`)}
              size="sm"
              variant="outline"
              className="w-full justify-center"
              icon={Download}
            >
              Download TDS
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
