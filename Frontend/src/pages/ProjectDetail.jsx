import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { CTABand } from '../components/sections/CTABand';
import { Skeleton } from '../components/ui/Skeleton';
import { api, resolveImageUrl } from '../lib/api';

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Return to wherever the visitor actually came from; only fall back to the
  // Projects list when there's no browser history to go back to (e.g. a
  // direct link or a page refresh landed here first).
  const goBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/projects');
    }
  };

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setActiveImage(0);
    api
      .get(`/api/projects/${id}`)
      .then(setProject)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !project) {
    return (
      <section className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950 min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Project not found</h1>
        <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </section>
    );
  }

  const images = project.images || [];
  const descriptionParagraphs = (project.description || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{project.title} — Vishwakarma by Trinetra</title>
        <meta
          name="description"
          content={descriptionParagraphs[0] || `${project.title} — an interior design project by Vishwakarma.`}
        />
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-50 dark:bg-navy-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Image viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-brand-500/15 shadow-xl bg-brand-100/40 dark:bg-navy-900 aspect-[4/3]">
                {images[activeImage] && (
                  <img
                    src={resolveImageUrl(images[activeImage])}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="flex flex-wrap gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                        idx === activeImage ? 'border-brand-500' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={resolveImageUrl(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                  {project.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white">
                  {project.title}
                </h1>
              </div>

              {descriptionParagraphs.length > 0 ? (
                <div className="space-y-3 text-sm sm:text-base text-navy-700 dark:text-brand-200/85 leading-relaxed">
                  {descriptionParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-navy-500 dark:text-brand-200/60 italic">
                  Description coming soon for this project.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
};
