import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { pageTransition } from './lib/motion';

import { Home } from './pages/Home';
import { Vasuki } from './pages/Vasuki';
import { Vishwakarma } from './pages/Vishwakarma';
import { Tribond } from './pages/Tribond';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Projects } from './pages/Projects';
import { Blogs } from './pages/Blogs';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Scroll to top helper component on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToTop />
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              className="w-full"
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/vasuki" element={<Vasuki />} />
                <Route path="/vishwakarma" element={<Vishwakarma />} />
                <Route path="/tribond" element={<Tribond />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
