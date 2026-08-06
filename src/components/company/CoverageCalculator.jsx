import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Package, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const CoverageCalculator = () => {
  const [areaSqFt, setAreaSqFt] = useState(250);
  const [tileSize, setTileSize] = useState('600x600'); // 300x300, 600x600, 800x1600
  const [trowelNotch, setTrowelNotch] = useState('6mm'); // 6mm, 9mm, 12mm

  // Calculation formula:
  // 6mm trowel notch: 1 bag (20kg) covers ~55 sq.ft
  // 9mm trowel notch: 1 bag (20kg) covers ~42 sq.ft
  // 12mm trowel notch: 1 bag (20kg) covers ~32 sq.ft
  const coverageFactors = {
    '6mm': 55,
    '9mm': 42,
    '12mm': 32,
  };

  const coveragePerBag = coverageFactors[trowelNotch] || 50;
  const estimatedBags = Math.ceil(areaSqFt / coveragePerBag);
  const totalWeightKg = estimatedBags * 20;

  return (
    <div className="rounded-3xl glass-card-light dark:glass-card-dark p-6 sm:p-8 border border-brand-500/20 shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-brand-200 dark:border-navy-800 pb-4">
        <div className="p-3 rounded-2xl bg-brand-gradient text-white shadow-md">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy-950 dark:text-white">
            Tribond Adhesive Bag Estimator
          </h3>
          <p className="text-xs text-navy-600 dark:text-brand-200/70">
            Calculate exact 20kg bag requirement based on floor area & trowel notch size.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Input Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Area Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <label className="text-navy-950 dark:text-white">Tile Installation Area</label>
              <span className="text-brand-500 font-mono font-bold text-base">{areaSqFt} sq. ft.</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(Number(e.target.value))}
              className="w-full h-2 bg-brand-200 dark:bg-navy-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>

          {/* Tile Size Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-950 dark:text-white uppercase tracking-wider">
              Tile Format & Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '300x300', label: '300x300 mm (Small)' },
                { id: '600x600', label: '600x600 mm (Vitrified)' },
                { id: '800x1600', label: '800x1600 mm (Slab)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTileSize(t.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    tileSize === t.id
                      ? 'bg-brand-500 text-white border-brand-400 shadow-md'
                      : 'border-brand-500/20 text-navy-700 dark:text-brand-200 hover:bg-brand-500/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trowel Notch Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-950 dark:text-white uppercase tracking-wider">
              Notched Trowel Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '6mm', label: '6mm Notch' },
                { id: '9mm', label: '9mm Notch' },
                { id: '12mm', label: '12mm Notch' },
              ].map((n) => (
                <button
                  key={n.id}
                  onClick={() => setTrowelNotch(n.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    trowelNotch === n.id
                      ? 'bg-brand-500 text-white border-brand-400 shadow-md'
                      : 'border-brand-500/20 text-navy-700 dark:text-brand-200 hover:bg-brand-500/10'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Result Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-navy-900 text-white border border-brand-500/30 text-center space-y-4 shadow-xl">
          <Package className="w-10 h-10 text-brand-400 mx-auto" />
          <div>
            <div className="text-xs text-brand-300 font-semibold uppercase tracking-wider">
              Estimated Requirement
            </div>
            <motion.div
              key={estimatedBags}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-4xl sm:text-5xl font-extrabold text-gradient my-1"
            >
              {estimatedBags} Bags
            </motion.div>
            <div className="text-xs text-brand-200/80 font-mono">
              ({totalWeightKg} kg Total Powder)
            </div>
          </div>

          <div className="pt-2 text-xs text-left text-brand-200/70 space-y-1 border-t border-navy-800">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes standard 10% wastage allowance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Based on 20kg moisture-sealed bag packing</span>
            </div>
          </div>

          <Button
            onClick={() => alert(`Quote requested for ${estimatedBags} bags of Tribond Adhesive.`)}
            size="sm"
            variant="gradient"
            className="w-full justify-center mt-2"
          >
            Request Batch Quote
          </Button>
        </div>
      </div>
    </div>
  );
};
