import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { api, resolveImageUrl } from '../../../lib/api';

export const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/api/blogs').then(setBlogs).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.del(`/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Blogs</h1>
          <p className="text-sm text-navy-600 dark:text-brand-200/70 mt-1">{blogs.length} total</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-navy-600 dark:text-brand-200/70">Loading…</p>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-brand-50 dark:bg-navy-800 text-navy-700 dark:text-brand-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Image</th>
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-4 py-3 font-semibold">Category</th>
                <th className="text-left px-4 py-3 font-semibold">Featured</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t border-brand-500/10">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-50 dark:bg-navy-800">
                      {blog.images[0] && (
                        <img src={resolveImageUrl(blog.images[0])} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy-950 dark:text-white">{blog.title}</td>
                  <td className="px-4 py-3 text-navy-600 dark:text-brand-200/80">{blog.category}</td>
                  <td className="px-4 py-3">
                    {blog.featured && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/blogs/${blog._id}`}
                        className="p-2 rounded-lg text-brand-600 dark:text-brand-300 hover:bg-brand-500/10"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        disabled={deletingId === blog._id}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && (
            <p className="p-6 text-center text-sm text-navy-600 dark:text-brand-200/70">No blog posts yet.</p>
          )}
        </div>
      )}
    </div>
  );
};
