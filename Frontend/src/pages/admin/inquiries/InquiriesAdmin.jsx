import React, { useEffect, useState } from 'react';
import { Mail, Phone, Trash2, ChevronLeft, ChevronRight, CircleDot } from 'lucide-react';
import { api } from '../../../lib/api';
import { Skeleton } from '../../../components/ui/Skeleton';

const PAGE_SIZE = 10;

export const InquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const load = (targetPage) => {
    setLoading(true);
    api
      .get(`/api/inquiries?page=${targetPage}&limit=${PAGE_SIZE}`)
      .then((res) => {
        setInquiries(res.items);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleMarkRead = async (inquiry) => {
    if (inquiry.status === 'read') return;
    await api.put(`/api/inquiries/${inquiry._id}/read`);
    setInquiries((prev) => prev.map((i) => (i._id === inquiry._id ? { ...i, status: 'read' } : i)));
  };

  const handleDelete = async (inquiry) => {
    if (!window.confirm(`Delete inquiry from "${inquiry.name}"?`)) return;
    await api.del(`/api/inquiries/${inquiry._id}`);
    if (inquiries.length === 1 && page > 1) {
      setPage((p) => p - 1);
    } else {
      load(page);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Inquiries</h1>
        <p className="text-sm text-navy-600 dark:text-brand-200/70 mt-1">
          Messages submitted through the contact forms across the site.
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg divide-y divide-brand-500/10">
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <p className="p-6 text-sm text-navy-600 dark:text-brand-200/70">No inquiries yet.</p>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq._id}
              onClick={() => handleMarkRead(inq)}
              className="p-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-brand-500/5"
            >
              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  {inq.status === 'new' && (
                    <CircleDot className="w-3 h-3 text-brand-500 flex-shrink-0" aria-label="New" />
                  )}
                  <span className="font-semibold text-navy-950 dark:text-white">{inq.name}</span>
                  {inq.companyName && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300">
                      {inq.companyName}
                    </span>
                  )}
                  <span className="text-xs text-navy-500 dark:text-brand-200/60">
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-600 dark:text-brand-200/80">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {inq.email}
                  </span>
                  {inq.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {inq.phone}
                    </span>
                  )}
                </div>
                <p className="text-sm text-navy-700 dark:text-brand-100 whitespace-pre-wrap">{inq.message}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(inq);
                }}
                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 flex-shrink-0"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
