import React from 'react';
import { motion } from 'framer-motion';

export const Shockwave = ({ trigger = true, blastKey = 1 }) => {
  if (!trigger || blastKey === 0) return null;

  // Generate 16 radial explosion spark particles
  const sparkParticles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 360) / 16;
    const rad = (angle * Math.PI) / 180;
    const dist = 320 + (i % 3) * 60;
    return {
      id: i,
      x: Math.sin(rad) * dist,
      y: -Math.cos(rad) * dist,
      size: 4 + (i % 4) * 2,
    };
  });

  return (
    <div key={`shockwave-${blastKey}`} className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-visible">
      {/* Supernova Central Flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 2.8, 5.5], opacity: [1, 0.9, 0] }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-48 h-48 rounded-full bg-white shadow-[0_0_120px_#4FC0E8,0_0_200px_#2B9BE0] filter blur-sm"
      />

      {/* Radiant Cyan Core Glow Burst */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 3.5, 6], opacity: [1, 0.7, 0] }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-64 h-64 rounded-full bg-gradient-radial from-brand-300 via-brand-500/80 to-transparent shadow-[0_0_100px_rgba(79,192,232,0.9)]"
      />

      {/* Expanding Concentric Shockwave Rings */}
      {[0, 80, 180, 280, 400].map((delayMs, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 2.5 + idx * 0.4, 5 + idx * 0.5], opacity: [1, 0.6, 0] }}
          transition={{
            duration: 1.1,
            delay: delayMs / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute rounded-full border-2 border-brand-300 shadow-[0_0_50px_#4FC0E8]"
          style={{ width: '200px', height: '200px' }}
        />
      ))}

      {/* 360° Radial Explosion Particles/Sparks */}
      {sparkParticles.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: spark.x,
            y: spark.y,
            scale: [0, 1.8, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15,
          }}
          className="absolute rounded-full bg-brand-300 shadow-[0_0_15px_#4FC0E8]"
          style={{ width: `${spark.size}px`, height: `${spark.size}px` }}
        />
      ))}
    </div>
  );
};

