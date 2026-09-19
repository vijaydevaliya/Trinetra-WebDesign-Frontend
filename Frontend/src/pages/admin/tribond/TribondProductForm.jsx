import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../../lib/api';
import { ImageUploader } from '../../../components/admin/ImageUploader';
import { AdminFormSkeleton } from '../../../components/admin/AdminFormSkeleton';

const toLines = (arr) => (arr || []).join('\n');

export const TribondProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [standard, setStandard] = useState('');
  const [areaOfApplication, setAreaOfApplication] = useState('');
  const [benefits, setBenefits] = useState('');
  const [compliance, setCompliance] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [coverage, setCoverage] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/api/tribond-products/${id}`).then((p) => {
      setName(p.name);
      setType(p.type);
      setStandard(p.standard || '');
      setAreaOfApplication(toLines(p.areaOfApplication));
      setBenefits(toLines(p.benefits));
      setCompliance(toLines(p.compliance));
      setPrecautions(toLines(p.precautions));
      setCoverage(p.coverage || '');
      setExistingImages(p.images || []);
      setLoading(false);
    });
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
      formData.append('standard', standard);
      formData.append('areaOfApplication', areaOfApplication);
      formData.append('benefits', benefits);
      formData.append('compliance', compliance);
      formData.append('precautions', precautions);
      formData.append('coverage', coverage);
      formData.append('keepImages', JSON.stringify(existingImages));
      newFiles.forEach((file) => formData.append('images', file));

      if (isEdit) {
        await api.putForm(`/api/tribond-products/${id}`, formData);
      } else {
        await api.postForm('/api/tribond-products', formData);
      }
      navigate('/admin/tribond-products');
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminFormSkeleton fields={7} />;
  }

  const textareaClasses =
    'w-full px-4 py-2.5 rounded-xl border border-brand-500/20 bg-brand-50 dark:bg-navy-800 text-navy-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500';

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/admin/tribond-products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
        <ArrowLeft className="w-4 h-4" />
        Back to Tribond Products
      </Link>

      <h1 className="text-2xl font-bold text-navy-950 dark:text-white">
        {isEdit ? 'Edit Tribond Product' : 'Add Tribond Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl bg-white dark:bg-navy-900 border border-brand-500/10 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. TRI T1"
              className={textareaClasses}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Type</label>
            <input
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. Type 1 / C1T"
              className={textareaClasses}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Standard</label>
          <input
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            placeholder="e.g. IS 15477:2019 & EN 12004"
            className={textareaClasses}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">
            Area of Application <span className="font-normal text-navy-500 dark:text-brand-200/60">(one point per line)</span>
          </label>
          <textarea rows={3} value={areaOfApplication} onChange={(e) => setAreaOfApplication(e.target.value)} className={textareaClasses} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">
            Benefits <span className="font-normal text-navy-500 dark:text-brand-200/60">(one point per line)</span>
          </label>
          <textarea rows={3} value={benefits} onChange={(e) => setBenefits(e.target.value)} className={textareaClasses} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">
            Compliance <span className="font-normal text-navy-500 dark:text-brand-200/60">(one point per line)</span>
          </label>
          <textarea rows={2} value={compliance} onChange={(e) => setCompliance(e.target.value)} className={textareaClasses} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">
            Precautions <span className="font-normal text-navy-500 dark:text-brand-200/60">(one point per line)</span>
          </label>
          <textarea rows={3} value={precautions} onChange={(e) => setPrecautions(e.target.value)} className={textareaClasses} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-700 dark:text-brand-100 mb-1.5">Coverage</label>
          <input
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            placeholder="e.g. 25-30 sq. ft. per 20 kg bag at 3-5 mm thickness"
            className={textareaClasses}
          />
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
          disabled={saving}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
        >
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};
