import React from 'react';

// Placeholder rows shown while an admin list (Products/Projects/Blogs/Tribond
// Products) is loading. Renders as a <tbody> of real <tr>/<td> cells so it's
// valid to place directly inside a <table>, right after <thead> — a <div>
// there would be invalid HTML and get hoisted out of the table by the browser.
export const AdminTableSkeleton = ({ rows = 6, columns = 2 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="border-t border-brand-500/10 animate-pulse">
          <td className="px-4 py-3">
            <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-navy-800" />
          </td>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-3">
              <div
                className="h-3.5 rounded bg-brand-100 dark:bg-navy-800"
                style={{ width: colIdx === 0 ? '70%' : '45%' }}
              />
            </td>
          ))}
          <td className="px-4 py-3">
            <div className="flex items-center justify-end gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-navy-800" />
              <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-navy-800" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
