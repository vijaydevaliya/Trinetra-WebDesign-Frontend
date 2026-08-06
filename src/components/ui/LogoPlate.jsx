import React, { useState } from 'react';

const LOGO_MAP = {
  trinetra: {
    src: '/logos/main_logo (1).png',
    alt: 'Trinetra Technoworld Pvt Ltd',
    title: 'TRINETRA TECHNOWORLD'
  },
  vasuki: {
    src: '/logos/vasuki-transparent.png',
    alt: 'Vasuki by Trinetra',
    title: 'VASUKI'
  },
  vishwakarma: {
    src: '/logos/vishwakarma-transparent.png',
    alt: 'Vishwakarma by Trinetra',
    title: 'VISHWAKARMA'
  },
  tribond: {
    src: '/logos/tribond-transparent.png',
    alt: 'Tribond by Trinetra',
    title: 'TRIBOND'
  }
};

const SIZE_CLASSES = {
  sm: 'h-8 sm:h-9',
  md: 'h-12 sm:h-14',
  lg: 'h-16 sm:h-20',
  xl: 'h-24 sm:h-32',
  '2xl': 'h-32 sm:h-44 md:h-52'
};

const IMG_HEIGHTS = {
  sm: 'max-h-7 sm:max-h-8 max-w-[130px]',
  md: 'max-h-10 sm:max-h-12 max-w-[200px]',
  lg: 'max-h-14 sm:max-h-18 max-w-[270px]',
  xl: 'max-h-20 sm:max-h-28 max-w-[340px] sm:max-w-[440px]',
  '2xl': 'max-h-28 sm:max-h-40 md:max-h-48 max-w-[400px] sm:max-w-[550px]'
};

export const LogoPlate = ({ logo = 'trinetra', size = 'md', className = '', onClick }) => {
  const [imgError, setImgError] = useState(false);
  const logoInfo = LOGO_MAP[logo] || LOGO_MAP.trinetra;

  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const imgHeight = IMG_HEIGHTS[size] || IMG_HEIGHTS.md;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${sizeClass} ${className}`}
    >
      {!imgError ? (
        <img
          src={logoInfo.src}
          alt={logoInfo.alt}
          onError={() => setImgError(true)}
          className={`object-contain ${imgHeight} w-auto transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_16px_rgba(79,192,232,0.65)] brightness-110`}
          loading="eager"
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold shadow-md">
            {logoInfo.title.charAt(0)}
          </div>
          <span className="text-navy-900 dark:text-white font-bold text-sm tracking-wider">
            {logoInfo.title}
          </span>
        </div>
      )}
    </div>
  );
};

