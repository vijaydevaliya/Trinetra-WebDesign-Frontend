import React from 'react';
import { motion } from 'framer-motion';
import { LogoPlate } from '../ui/LogoPlate';

export const OrbitSatellite = ({
  company,
  angleDeg = 0,
  orbitRadius = 210,
  index = 0,
  blastKey = 1,
  isBlasting = false,
}) => {
  // Polar coordinates for 120° position on orbit circle
  const rad = (angleDeg * Math.PI) / 180;
  const targetX = Math.sin(rad) * orbitRadius;
  const targetY = -Math.cos(rad) * orbitRadius;

  return (
    <motion.div
      key={`satellite-${company.id}-${blastKey}`}
      className="absolute top-1/2 left-1/2 pointer-events-none z-20"
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={
        isBlasting
          ? {
              x: [0, targetX * 1.35, targetX],
              y: [0, targetY * 1.35, targetY],
              scale: [0, 1.6, 1],
              opacity: [0, 1, 1],
              filter: [
                'drop-shadow(0 0 60px #4FC0E8) brightness(2.5)',
                'drop-shadow(0 0 35px #4FC0E8) brightness(1.6)',
                'drop-shadow(0 0 16px rgba(79,192,232,0.85)) brightness(1.1)',
              ],
            }
          : {
              x: targetX,
              y: targetY,
              scale: 1,
              opacity: 1,
              filter: 'drop-shadow(0 0 16px rgba(79,192,232,0.85)) brightness(1.1)',
            }
      }
      transition={{
        duration: isBlasting ? 1.4 : 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: isBlasting ? 0.1 + index * 0.1 : 0,
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        {/* Counter-rotate inner logo so it remains upright and horizontal during 360° orbit */}
        <motion.div
          animate={isBlasting ? { rotate: 0 } : { rotate: -360 }}
          transition={
            isBlasting
              ? { duration: 0.2, ease: 'easeOut' }
              : { duration: 32, repeat: Infinity, ease: 'linear' }
          }
        >
          <LogoPlate
            logo={company.id}
            size="md"
            className="hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};


