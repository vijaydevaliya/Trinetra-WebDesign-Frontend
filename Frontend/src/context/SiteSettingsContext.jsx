import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, resolveImageUrl } from '../lib/api';

const SiteSettingsContext = createContext();

const DEFAULT_FAVICON = '/logos/main-icon-light.png';

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ logo: '', favicon: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/settings')
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Swap the browser tab's favicon at runtime once an admin-uploaded one is
  // available — index.html only ships a static default.
  useEffect(() => {
    const href = settings.favicon ? resolveImageUrl(settings.favicon) : DEFAULT_FAVICON;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [settings.favicon]);

  const refetch = () => {
    setLoading(true);
    return api.get('/api/settings').then(setSettings).finally(() => setLoading(false));
  };

  return (
    <SiteSettingsContext.Provider value={{ ...settings, loading, refetch }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
