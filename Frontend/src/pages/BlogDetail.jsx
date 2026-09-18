import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CTABand } from '../components/sections/CTABand';
import { api, resolveImageUrl } from '../lib/api';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/api/blogs/slug/${slug}`)
      .then(setBlog)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (notFound) {
    return <Navigate to="/blogs" replace />;
  }

  if (loading || !blog) {
    return (
      <div className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950 min-h-screen flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const [coverImage, ...galleryImages] = blog.images;

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

          {coverImage && (
            <div className="mt-8 rounded-2xl overflow-hidden shadow-xl">
              <img src={resolveImageUrl(coverImage)} alt={blog.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="mt-10 space-y-5">
            {blog.content.map((paragraph, idx) => (
              <p key={idx} className="text-base text-navy-800 dark:text-brand-200/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div key={img} className="aspect-square rounded-xl overflow-hidden">
                  <img src={resolveImageUrl(img)} alt={blog.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      <CTABand />
    </>
  );
};
