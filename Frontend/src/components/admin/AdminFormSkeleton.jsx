import React from 'react';
import { Skeleton } from '../ui/Skeleton';

// Placeholder shown while an admin edit form is fetching the record to
// edit, so the page doesn't just flash "Loading…" text.
export const AdminFormSkeleton = ({ fields = 4 }) => {
  return (
    <div className="max-w-2xl space-y-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-8 w-56" />

      <div className="space-y-5 p-6 rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg">
        {Array.from({ length: fields }).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}

        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20" />
          <div className="flex gap-3">
            <Skeleton className="w-24 h-24 rounded-xl" />
            <Skeleton className="w-24 h-24 rounded-xl" />
          </div>
        </div>

        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
};
