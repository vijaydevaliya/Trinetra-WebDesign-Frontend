import React from 'react';

// Generic shimmer placeholder block. Pass sizing/shape via className,
// e.g. <Skeleton className="h-4 w-40" /> or <Skeleton className="w-12 h-12 rounded-full" />.
export const Skeleton = ({ className = '' }) => {
  return <div className={`bg-brand-100 dark:bg-navy-800 rounded animate-pulse ${className}`} />;
};
