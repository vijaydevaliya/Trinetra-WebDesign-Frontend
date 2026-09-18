import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, FolderKanban, Newspaper, ArrowRight } from 'lucide-react';
import { api } from '../../lib/api';

const CARDS = [
  { key: 'products', label: 'Products', icon: Package, to: '/admin/products' },
  { key: 'projects', label: 'Projects', icon: FolderKanban, to: '/admin/projects' },
  { key: 'blogs', label: 'Blogs', icon: Newspaper, to: '/admin/blogs' },
];

export const Dashboard = () => {
  const [counts, setCounts] = useState({ products: null, projects: null, blogs: null });

  useEffect(() => {
    Promise.all([
      api.get('/api/products'),
      api.get('/api/projects'),
      api.get('/api/blogs'),
    ]).then(([products, projects, blogs]) => {
      setCounts({ products: products.length, projects: projects.length, blogs: blogs.length });
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Dashboard</h1>
        <p className="text-sm text-navy-600 dark:text-brand-200/70 mt-1">
          Overview of your site content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {CARDS.map(({ key, label, icon: Icon, to }) => (
          <Link
            key={key}
            to={to}
            className="group p-6 rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg hover:shadow-xl hover:border-brand-400/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-brand-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
            <p className="mt-4 text-3xl font-bold text-navy-950 dark:text-white">
              {counts[key] === null ? '—' : counts[key]}
            </p>
            <p className="text-sm text-navy-600 dark:text-brand-200/70">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
