import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CTABand } from '../components/sections/CTABand';
import { BLOGS } from '../data/blogs';

export const BlogDetail = () => {
  const { slug } = useParams();
  const blog = BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} — Trinetra Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <article className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          <span className="mt-6 block text-xs font-bold uppercase tracking-wider text-brand-500">
            {blog.category}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-navy-950 dark:text-white">
            {blog.title}
          </h1>

          <div className="mt-8 rounded-2xl overflow-hidden shadow-xl">
            <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover" />
          </div>

          <div className="mt-10 space-y-5">
            {blog.content.map((paragraph, idx) => (
              <p key={idx} className="text-base text-navy-800 dark:text-brand-200/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <CTABand />
    </>
  );
};
