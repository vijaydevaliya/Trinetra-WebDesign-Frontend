import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy-950 dark:text-white">
            Turnkey Transformation Reveal
          </h4>
        </div>
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-300">
          Drag slider horizontally to compare
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[360px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-brand-500/30 select-none cursor-ew-resize"
      >
        {/* AFTER Image Layer (Base Background) */}
        <div className="absolute inset-0 bg-navy-900 flex flex-col justify-end p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-navy-900 to-navy-950" />
          {/* Decorative luxury architectural render vector */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <svg className="w-full h-full p-8" viewBox="0 0 800 500" fill="none">
              <rect x="50" y="50" width="700" height="400" rx="20" stroke="#4FC0E8" strokeWidth="4" />
              <line x1="200" y1="50" x2="200" y2="450" stroke="#4FC0E8" strokeWidth="2" strokeDasharray="8 8" />
              <circle cx="500" cy="250" r="120" stroke="#2B9BE0" strokeWidth="4" />
              <path d="M 100 350 L 350 150 L 700 350" stroke="#1565C0" strokeWidth="6" />
            </svg>
          </div>

          <div className="relative z-10 space-y-2 text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white shadow-lg">
              AFTER (Vishwakarma Luxury Execution)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Bespoke Modern Living Room & Lighting
            </h3>
            <p className="text-xs text-brand-200/80 max-w-md">
              Custom marine-ply wood paneling, ambient LED cove ceiling, and Italian marble flooring.
            </p>
          </div>
        </div>

        {/* BEFORE Image Layer (Clipped Overlay) */}
        <div
          className="absolute top-0 bottom-0 left-0 overflow-hidden bg-navy-950"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 w-[800px] md:w-[1200px] h-full flex flex-col justify-end p-8 bg-slate-900"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            {/* Raw blueprint grid vector */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" width="100%" height="100%">
                <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#blueprint)" />
              </svg>
            </div>

            <div className="relative z-10 space-y-2 text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-700 text-slate-200">
                BEFORE (Raw Site Shell)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-300">
                Unfinished Concrete Structure
              </h3>
              <p className="text-xs text-slate-400 max-w-md">
                Raw brickwork, un-routed wiring, and bare concrete floor layout before spatial planning.
              </p>
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_#4FC0E8] cursor-ew-resize z-20 flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="w-10 h-10 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-2xl border-2 border-white transform -translate-x-1/2">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
