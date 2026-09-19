import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { api, resolveImageUrl } from '../../../lib/api';
import { AdminTableSkeleton } from '../../../components/admin/AdminTableSkeleton';

const PAGE_SIZE = 10;

export const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [page, setPage] = useState(1);

  const load = (targetPage) => {
    setLoading(true);
    api
      .get(`/api/projects?page=${targetPage}&limit=${PAGE_SIZE}`)
      .then((res) => {
        setProjects(res.items);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await api.del(`/api/projects/${id}`);
      // If that was the last item on this page (and it isn't page 1), step
      // back a page; otherwise just reload the current page from the server.
      if (projects.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        load(page);
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Projects</h1>
          <p className="text-sm text-navy-600 dark:text-brand-200/70 mt-1">{total} total</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      <div className="rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-brand-50 dark:bg-navy-800 text-navy-700 dark:text-brand-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Image</th>
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-4 py-3 font-semibold">Category</th>
                <th className="text-left px-4 py-3 font-semibold">Images</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <AdminTableSkeleton columns={2} />
            ) : (
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-t border-brand-500/10">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-50 dark:bg-navy-800">
                      {project.images[0] && (
                        <img src={resolveImageUrl(project.images[0])} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy-950 dark:text-white">{project.title}</td>
                  <td className="px-4 py-3 text-navy-600 dark:text-brand-200/80">{project.category}</td>
                  <td className="px-4 py-3 text-navy-600 dark:text-brand-200/80">{project.images.length}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/projects/${project._id}`}
                        className="p-2 rounded-lg text-brand-600 dark:text-brand-300 hover:bg-brand-500/10"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={deletingId === project._id}
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
            )}
          </table>
          {!loading && projects.length === 0 && (
            <p className="p-6 text-center text-sm text-navy-600 dark:text-brand-200/70">No projects yet.</p>
          )}

          {!loading && total > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-brand-500/10">
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
