import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CTABand } from '../components/sections/CTABand';
import { api, resolveImageUrl } from '../lib/api';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/blogs').then(setBlogs).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog — Trinetra Technoworld Pvt Ltd</title>
        <meta
          name="description"
          content="Trends, guides, and expert insights on home automation, energy efficiency, and smart living from Trinetra."
        />
      </Helmet>

      {/* Hero Band */}
      <section className="pt-32 pb-20 bg-brand-gradient text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ideas that power modern smart homes
          </h1>
          <p className="mt-4 text-brand-100 text-base sm:text-lg">
            Discover trends, guides, and expert insights on home automation, energy efficiency, and smart living.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blogs/${blog.slug}`}
                    className="group rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg hover:shadow-2xl hover:border-brand-400/40 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-100 dark:bg-navy-800">
                      {blog.images[0] && (
                        <img
                          src={resolveImageUrl(blog.images[0])}
                          alt={blog.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-navy-900/90 text-xs font-semibold text-navy-800 dark:text-brand-100 shadow">
                        {blog.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-navy-950 dark:text-white leading-snug">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-sm text-navy-600 dark:text-brand-200/70 leading-relaxed flex-1">
                        {blog.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTABand />
    </>
  );
};
