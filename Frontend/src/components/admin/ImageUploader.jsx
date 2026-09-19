import React, { useEffect, useState } from 'react';
import { X, ImagePlus } from 'lucide-react';
import { resolveImageUrl } from '../../lib/api';

// Controlled multi-image picker: shows existing (already-uploaded) images
// with a remove button, plus newly-picked files (previewed locally) with
// their own remove button. Parent owns the state; this only emits events.
export const ImageUploader = ({ existingImages, onRemoveExisting, newFiles, onAddFiles, onRemoveNewFile }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [newFiles]);

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      onAddFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {existingImages.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden border border-brand-500/15 bg-brand-50 dark:bg-navy-800">
            <img src={resolveImageUrl(url)} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveExisting(url)}
              className="absolute top-1 right-1 p-1 rounded-full bg-navy-950/70 text-white hover:bg-red-500 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {previews.map((url, idx) => (
          <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden border border-brand-400/40 bg-brand-50 dark:bg-navy-800">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-brand-500 text-white text-[10px] font-semibold">
              New
            </span>
            <button
              type="button"
              onClick={() => onRemoveNewFile(idx)}
              className="absolute top-1 right-1 p-1 rounded-full bg-navy-950/70 text-white hover:bg-red-500 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <label className="w-24 h-24 rounded-xl border-2 border-dashed border-brand-500/30 flex flex-col items-center justify-center gap-1 text-brand-500 cursor-pointer hover:bg-brand-500/5 transition-colors">
          <ImagePlus className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Add</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      <p className="mt-2 text-xs text-navy-500 dark:text-brand-200/60">
        JPG, PNG, WEBP, GIF or AVIF. You can add multiple images.
      </p>
    </div>
  );
};
