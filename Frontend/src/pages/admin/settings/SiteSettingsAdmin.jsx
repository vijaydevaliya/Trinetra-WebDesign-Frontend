import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { api, resolveImageUrl } from '../../../lib/api';
import { useSiteSettings } from '../../../context/SiteSettingsContext';

const UploadSlot = ({ label, hint, currentUrl, file, onPick }) => {
  const previewUrl = file ? URL.createObjectURL(file) : currentUrl ? resolveImageUrl(currentUrl) : null;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100">{label}</label>
      <p className="text-xs text-navy-500 dark:text-brand-200/60">{hint}</p>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl border border-brand-500/15 bg-brand-50 dark:bg-navy-800 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt={label} className="max-w-full max-h-full object-contain" />
          ) : (
            <span className="text-xs text-navy-400 dark:text-brand-200/40">None</span>
          )}
        </div>
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-brand-500/30 text-brand-500 cursor-pointer hover:bg-brand-500/5 transition-colors text-sm font-semibold">
          <ImagePlus className="w-4 h-4" />
          <span>{file ? 'Change file' : 'Upload new'}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/x-icon,image/svg+xml"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] || null)}
          />
        </label>
      </div>
    </div>
  );
};

export const SiteSettingsAdmin = () => {
  const { logo, favicon, loading, refetch } = useSiteSettings();
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile && !faviconFile) return;
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const formData = new FormData();
      if (logoFile) formData.append('logo', logoFile);
      if (faviconFile) formData.append('favicon', faviconFile);
      await api.putForm('/api/settings', formData);
      await refetch();
      setLogoFile(null);
      setFaviconFile(null);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-navy-600 dark:text-brand-200/70">Loading…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Site Settings</h1>
        <p className="text-sm text-navy-600 dark:text-brand-200/70 mt-1">
          Manage the brand logo shown in the header and footer, and the browser tab favicon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg">
        <UploadSlot
          label="Header & Footer Logo"
          hint="Used in the navigation bar, mobile menu, and footer across the site."
          currentUrl={logo}
          file={logoFile}
          onPick={setLogoFile}
        />

        <UploadSlot
          label="Favicon"
          hint="Shown as the browser tab icon. A square image works best."
          currentUrl={favicon}
          file={faviconFile}
          onPick={setFaviconFile}
        />

        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        {saved && <p className="text-sm text-emerald-500 font-medium">Saved — changes are live now.</p>}

        <button
          type="submit"
          disabled={saving || (!logoFile && !faviconFile)}
          className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};
