import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, Droplets, Layers, ShieldCheck, Box } from 'lucide-react';

const APPLICATION_STEPS = [
  { step: '01', title: 'Surface Preparation', desc: 'Ensure substrate is clean, dry, structural, and free from oil or loose mortar particles.', icon: Wrench },
  { step: '02', title: 'Mortar Slurry Mixing', desc: 'Mix 20kg Tribond powder with 5-6L clean water using high-torque mechanical stirrer until smooth lump-free paste.', icon: Droplets },
  { step: '03', title: 'Notch-Trowel Application', desc: 'Spread mortar using flat side of trowel, then comb with notched edge at 45° angle to create uniform adhesive ribs.', icon: Layers },
  { step: '04', title: 'Tile Positioning & Pressing', desc: 'Place tiles into wet adhesive bed with firm twisting pressure. Tap with rubber mallet to ensure 100% bed coverage.', icon: Box },
  { step: '05', title: 'Grouting & Final Curing', desc: 'Allow adhesive 24 hours setting time before applying Tribond Stainproof Epoxy Grout to joints.', icon: ShieldCheck },
];

export const ProcessSteps = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {APPLICATION_STEPS.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 rounded-2xl glass-card-light dark:glass-card-dark border border-brand-500/20 relative group hover:border-brand-400/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gradient font-mono">
                  {s.step}
                </span>
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                  <s.icon className="w-5 h-5" />
                </div>
              </div>

              <h4 className="text-base font-bold text-navy-950 dark:text-white mb-2">
                {s.title}
              </h4>
              <p className="text-xs text-navy-700 dark:text-brand-200/70 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-brand-200 dark:border-navy-800 flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
              <span>IS 15477 Compliant</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
