import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
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

import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProductsAdmin } from './pages/admin/products/ProductsAdmin';
import { ProductForm } from './pages/admin/products/ProductForm';
import { ProjectsAdmin } from './pages/admin/projects/ProjectsAdmin';
import { ProjectForm } from './pages/admin/projects/ProjectForm';
import { BlogsAdmin } from './pages/admin/blogs/BlogsAdmin';
import { BlogForm } from './pages/admin/blogs/BlogForm';
import { CategoriesAdmin } from './pages/admin/categories/CategoriesAdmin';

// Scroll to top helper component on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const withAdminLayout = (element) => (
  <ProtectedRoute>
    <AdminLayout>{element}</AdminLayout>
  </ProtectedRoute>
);

const AdminApp = () => (
  <AuthProvider>
    <ScrollToTop />
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={withAdminLayout(<Dashboard />)} />
      <Route path="/admin/products" element={withAdminLayout(<ProductsAdmin />)} />
      <Route path="/admin/products/new" element={withAdminLayout(<ProductForm />)} />
      <Route path="/admin/products/:id" element={withAdminLayout(<ProductForm />)} />
      <Route path="/admin/projects" element={withAdminLayout(<ProjectsAdmin />)} />
      <Route path="/admin/projects/new" element={withAdminLayout(<ProjectForm />)} />
      <Route path="/admin/projects/:id" element={withAdminLayout(<ProjectForm />)} />
      <Route path="/admin/blogs" element={withAdminLayout(<BlogsAdmin />)} />
      <Route path="/admin/blogs/new" element={withAdminLayout(<BlogForm />)} />
      <Route path="/admin/blogs/:id" element={withAdminLayout(<BlogForm />)} />
      <Route path="/admin/categories" element={withAdminLayout(<CategoriesAdmin />)} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </AuthProvider>
);

const MarketingApp = () => {
  const location = useLocation();

  return (
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
  );
};

export function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <HelmetProvider>
      <ThemeProvider>
        {isAdmin ? <AdminApp /> : <MarketingApp />}
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
