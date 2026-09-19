import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { api, resolveImageUrl } from '../lib/api';
import { useCategories } from '../hooks/useCategories';
import { CardGridSkeleton } from '../components/ui/CardGridSkeleton';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState(new Set());
  const { categories } = useCategories('product');

  useEffect(() => {
    api.get('/api/products').then(setProducts).finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <Helmet>
        <title>Smart Home Products — Trinetra Technoworld Pvt Ltd</title>
        <meta
          name="description"
          content="Discover Trinetra's range of smart home automation products — switches, lighting, security locks, sensors, curtains, hubs and more."
        />
      </Helmet>

      {/* Hero Band */}
      <section className="pt-32 pb-20 bg-brand-gradient text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Smart Home Products
          </h1>
          <p className="mt-3 text-brand-100 text-base sm:text-lg">
            Discover premium automation products for a smarter, safer home.
          </p>
        </div>
      </section>

      <section className="bg-brand-50 dark:bg-navy-950 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="-mt-10 relative z-10 rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-xl p-2 flex items-center gap-2 overflow-x-auto">
            {[{ _id: 'all', name: 'All' }, ...categories].map((cat) => {
              const value = cat._id === 'all' ? 'all' : cat.name;
              const isActive = activeCategory === value;
              return (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(value)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                      : 'text-navy-700 dark:text-brand-100 hover:bg-brand-500/10'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="mt-6">
              <CardGridSkeleton count={8} columns="sm:grid-cols-2 lg:grid-cols-4" aspect="aspect-square" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
              >
                {filteredProducts.map((product) => {
                  const isLiked = wishlist.has(product._id);

                  return (
                    <div
                      key={product._id}
                      className="group rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg hover:shadow-2xl hover:border-brand-400/40 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-square bg-brand-50 dark:bg-navy-800 flex items-center justify-center p-6">
                        {product.images[0] && (
                          <img
                            src={resolveImageUrl(product.images[0])}
                            alt={product.title}
                            loading="lazy"
                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <button
                          onClick={() => toggleWishlist(product._id)}
                          aria-label="Toggle wishlist"
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-navy-900/90 shadow-md border border-brand-500/10"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isLiked ? 'fill-brand-500 text-brand-500' : 'text-navy-500 dark:text-brand-200'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
                          {product.category}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-navy-950 dark:text-white">
                          {product.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-navy-600 dark:text-brand-200/70 leading-relaxed line-clamp-2 flex-1">
                          {product.description}
                        </p>
                        <Link
                          to="/contact"
                          className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Enquire</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
};
