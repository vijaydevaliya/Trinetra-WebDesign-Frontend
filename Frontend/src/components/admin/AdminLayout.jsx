import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FolderKanban, Newspaper, Tags, LogOut, Globe, Layers, Settings } from 'lucide-react';
import { LogoPlate } from '../ui/LogoPlate';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/blogs', label: 'Blogs', icon: Newspaper },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/tribond-products', label: 'Tribond Products', icon: Layers },
  { to: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export const AdminLayout = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
        : 'text-navy-700 dark:text-brand-100 hover:bg-brand-500/10'
    }`;

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-navy-950 flex flex-col md:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto border-r border-brand-500/10 bg-white dark:bg-navy-900 p-5">
        <Link to="/admin" className="flex items-center gap-3 mb-8">
          <LogoPlate logo="trinetra" size="md" />
          <span className="font-bold text-navy-950 dark:text-white">Admin</span>
        </Link>

        <nav className="flex-1 space-y-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClasses}>
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 border-t border-brand-500/10 space-y-1.5">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-navy-700 dark:text-brand-100 hover:bg-brand-500/10 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Topbar (mobile) */}
      <header className="md:hidden sticky top-0 z-20 bg-white dark:bg-navy-900 border-b border-brand-500/10 p-3">
        <div className="flex items-center justify-between mb-3">
          <Link to="/admin" className="flex items-center gap-2">
            <LogoPlate logo="trinetra" size="sm" />
            <span className="font-bold text-navy-950 dark:text-white text-sm">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <nav className="flex items-center gap-2 overflow-x-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) =>
              `flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-navy-700 dark:text-brand-100 bg-brand-500/5'
              }`
            }>
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="hidden md:flex items-center justify-end gap-4 px-8 py-4 border-b border-brand-500/10 bg-white dark:bg-navy-900">
          <span className="text-sm text-navy-600 dark:text-brand-200/70">
            Signed in as <span className="font-semibold text-navy-950 dark:text-white">{admin?.email}</span>
          </span>
          <ThemeToggle />
        </div>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
};
