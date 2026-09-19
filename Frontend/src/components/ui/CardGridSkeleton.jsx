import React from 'react';

// Placeholder grid shown while a card-based listing (e.g. Projects, Products,
// Blogs) is loading, so the layout doesn't jump once real data arrives.
// Pass withLines to also render a couple of text-bar placeholders below the
// image block, for cards that show a title/excerpt (e.g. Blogs).
export const CardGridSkeleton = ({
  count = 6,
  columns = 'sm:grid-cols-2 lg:grid-cols-3',
  aspect = 'aspect-[4/3]',
  withLines = false,
}) => {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-6`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`rounded-2xl border border-brand-500/15 overflow-hidden ${withLines ? 'bg-white dark:bg-navy-900' : ''}`}
        >
          <div className={`${aspect} bg-brand-100 dark:bg-navy-800 animate-pulse`} />
          {withLines && (
            <div className="p-5 space-y-2.5">
              <div className="h-4 w-3/4 rounded bg-brand-100 dark:bg-navy-800 animate-pulse" />
              <div className="h-3.5 w-full rounded bg-brand-100 dark:bg-navy-800 animate-pulse" />
              <div className="h-3.5 w-2/3 rounded bg-brand-100 dark:bg-navy-800 animate-pulse" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
