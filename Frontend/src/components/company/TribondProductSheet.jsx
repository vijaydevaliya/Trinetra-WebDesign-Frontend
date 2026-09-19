import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, ShieldCheck, AlertTriangle, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImageUrl } from '../../lib/api';

const Section = ({ icon: Icon, title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
        <Icon className="w-3.5 h-3.5" />
        <span>{title}</span>
      </div>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-xs text-navy-700 dark:text-brand-200/80 leading-relaxed pl-1">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductCard = ({ prod, idx }) => {
  const images = prod.images || [];
  const [activeImage, setActiveImage] = useState(0);

  const goPrev = () => setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="rounded-3xl glass-card-light dark:glass-card-dark border border-brand-500/20 shadow-xl overflow-hidden flex flex-col md:flex-row md:min-h-[320px]"
    >
      <div className="p-6 space-y-4 order-2 md:order-1 md:w-3/5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h3 className="text-xl font-bold text-navy-950 dark:text-white">{prod.name}</h3>
            {prod.standard && (
              <p className="text-[11px] font-mono text-navy-500 dark:text-brand-200/60 mt-0.5">{prod.standard}</p>
            )}
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 whitespace-nowrap">
            {prod.type}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Section icon={MapPin} title="Area of Application" items={prod.areaOfApplication} />
          <Section icon={CheckCircle2} title="Benefits" items={prod.benefits} />
          <Section icon={ShieldCheck} title="Compliance" items={prod.compliance} />
          <Section icon={AlertTriangle} title="Precautions" items={prod.precautions} />
        </div>

        {prod.coverage && (
          <div className="flex items-start gap-2 pt-3 border-t border-brand-200 dark:border-navy-800 text-xs text-navy-700 dark:text-brand-200/80">
            <Ruler className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
            <span><span className="font-semibold text-navy-950 dark:text-white">Coverage: </span>{prod.coverage}</span>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="relative group md:w-2/5 md:flex-shrink-0 h-48 md:h-auto overflow-hidden order-1 md:order-2">
          <img src={resolveImageUrl(images[activeImage])} alt={prod.name} className="w-full h-full object-contain" />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-navy-950/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-navy-950/80"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-navy-950/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-navy-950/80"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeImage ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export const TribondProductSheet = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <p className="text-sm text-center text-navy-600 dark:text-brand-200/70">
        Product data sheets will appear here once added from the admin panel.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {products.map((prod, idx) => (
        <ProductCard key={prod._id} prod={prod} idx={idx} />
      ))}
    </div>
  );
};
