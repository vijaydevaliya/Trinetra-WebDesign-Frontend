import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../../lib/api';
import { useCategories } from '../../../hooks/useCategories';
import { ImageUploader } from '../../../components/admin/ImageUploader';

export const ProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories('project');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/api/projects/${id}`).then((p) => {
      setTitle(p.title);
      setCategory(p.category);
      setExistingImages(p.images || []);
      setLoading(false);
    });
  }, [id, isEdit]);

  // Default a new project to the first available category once it loads.
  useEffect(() => {
    if (!isEdit && !category && categories.length > 0) {
      setCategory(categories[0].name);
    }
  }, [isEdit, category, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('keepImages', JSON.stringify(existingImages));
      newFiles.forEach((file) => formData.append('images', file));

      if (isEdit) {
        await api.putForm(`/api/projects/${id}`, formData);
      } else {
        await api.postForm('/api/projects', formData);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-navy-600 dark:text-brand-200/70">Loading…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/admin/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <h1 className="text-2xl font-bold text-navy-950 dark:text-white">
        {isEdit ? 'Edit Project' : 'Add Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg">
        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-500/20 bg-brand-50 dark:bg-navy-800 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Category</label>
          {categoriesLoading ? (
            <p className="text-sm text-navy-500 dark:text-brand-200/60">Loading categories…</p>
          ) : categories.length === 0 ? (
            <p className="text-sm text-navy-500 dark:text-brand-200/60">
              No project categories yet.{' '}
              <Link to="/admin/categories" className="text-brand-600 dark:text-brand-300 font-semibold">
                Add one first
              </Link>
              .
            </p>
          ) : (
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-500/20 bg-brand-50 dark:bg-navy-800 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {categories.map((c) => (
                <option key={c._id} value={c.name}>{c.name}</option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Images</label>
          <ImageUploader
            existingImages={existingImages}
            onRemoveExisting={(url) => setExistingImages((prev) => prev.filter((i) => i !== url))}
            newFiles={newFiles}
            onAddFiles={(files) => setNewFiles((prev) => [...prev, ...files])}
            onRemoveNewFile={(idx) => setNewFiles((prev) => prev.filter((_, i) => i !== idx))}
          />
        </div>

        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={saving || categories.length === 0}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};
