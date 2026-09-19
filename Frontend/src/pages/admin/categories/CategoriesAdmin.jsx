import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../../lib/api';
import { Skeleton } from '../../../components/ui/Skeleton';

const TABS = [
  { type: 'product', label: 'Products' },
  { type: 'project', label: 'Projects' },
  { type: 'blog', label: 'Blogs' },
];

const PAGE_SIZE = 10;

export const CategoriesAdmin = () => {
  const [activeType, setActiveType] = useState('product');
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const load = (type, targetPage) => {
    setLoading(true);
    api
      .get(`/api/categories?type=${type}&page=${targetPage}&limit=${PAGE_SIZE}`)
      .then((res) => {
        setCategories(res.items);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(activeType, page);
  }, [activeType, page]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setError('');
    try {
      await api.post('/api/categories', { name: newName.trim(), type: activeType });
      setNewName('');
      load(activeType, page);
    } catch (err) {
      setError(err.message || 'Failed to add category');
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = async (id) => {
    if (!editingName.trim()) return;
    setError('');
    try {
      await api.put(`/api/categories/${id}`, { name: editingName.trim() });
      cancelEdit();
      load(activeType, page);
    } catch (err) {
      setError(err.message || 'Failed to rename category');
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    setError('');
    try {
      await api.del(`/api/categories/${cat._id}`);
      if (categories.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        load(activeType, page);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete category');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Categories</h1>
        <p className="text-sm text-navy-600 dark:text-brand-200/70 mt-1">
          Manage the category options shown across Products, Projects and Blogs.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.type}
            onClick={() => {
              setActiveType(tab.type);
              setPage(1);
              cancelEdit();
              setError('');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeType === tab.type
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                : 'bg-white dark:bg-navy-900 text-navy-700 dark:text-brand-100 border border-brand-500/10 hover:bg-brand-500/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleAdd} className="flex items-center gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={`New ${TABS.find((t) => t.type === activeType)?.label.toLowerCase()} category`}
          className="flex-1 px-4 py-2.5 rounded-xl border border-brand-500/20 bg-white dark:bg-navy-800 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </form>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      <div className="rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg divide-y divide-brand-500/10">
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-1">
                <Skeleton className="h-4 w-40" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="p-6 text-sm text-navy-600 dark:text-brand-200/70">No categories yet — add one above.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat._id} className="flex items-center justify-between px-4 py-3">
              {editingId === cat._id ? (
                <input
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 mr-3 px-3 py-1.5 rounded-lg border border-brand-500/20 bg-brand-50 dark:bg-navy-800 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              ) : (
                <span className="text-sm font-semibold text-navy-950 dark:text-white">{cat.name}</span>
              )}

              <div className="flex items-center gap-1.5">
                {editingId === cat._id ? (
                  <>
                    <button onClick={() => saveEdit(cat._id)} className="p-2 rounded-lg text-green-600 hover:bg-green-500/10" aria-label="Save">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={cancelEdit} className="p-2 rounded-lg text-navy-500 hover:bg-navy-500/10" aria-label="Cancel">
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(cat)} className="p-2 rounded-lg text-brand-600 dark:text-brand-300 hover:bg-brand-500/10" aria-label="Rename">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cat)} className="p-2 rounded-lg text-red-500 hover:bg-red-500/10" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}

        {total > 0 && (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-xs text-navy-600 dark:text-brand-200/70">
              Page <span className="font-semibold text-navy-950 dark:text-white">{page}</span> of{' '}
              <span className="font-semibold text-navy-950 dark:text-white">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg text-navy-700 dark:text-brand-100 hover:bg-brand-500/10 disabled:opacity-40 disabled:hover:bg-transparent"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg text-navy-700 dark:text-brand-100 hover:bg-brand-500/10 disabled:opacity-40 disabled:hover:bg-transparent"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
