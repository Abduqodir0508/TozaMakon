import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  height = "h-64 sm:h-72",
  showLabels = true,
  className = ""
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  const handleContainerClick = (e) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative select-none overflow-hidden rounded-xl bg-slate-950 shadow-inner group cursor-ew-resize ${height} ${className}`}
    >
      {/* "AFTER" (KEYIN) Image - Background Layer (Revealed on the Right) */}
      <img
        src={afterImage || "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800"}
        alt="Keyingi holat (After)"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />

      {/* "BEFORE" (OLDIN) Image - Clipped Overlay Layer (Revealed on the Left) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage || "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800"}
          alt="Oldingi holat (Before)"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%'
          }}
          loading="lazy"
        />
      </div>

      {/* Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        {/* Handle Button */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 border-2 border-emerald-400 shadow-xl flex items-center justify-center text-white backdrop-blur-md pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform"
        >
          <ChevronsLeftRight className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Badges / Labels */}
      {showLabels && (
        <>
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Oldin
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Keyin
            </span>
          </div>

          {/* Hint Overlay (Only at first glance) */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none z-10">
            <span className="text-[11px] font-medium text-white/80 bg-black/60 px-3 py-0.5 rounded-full backdrop-blur-sm border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
              Taqqoslash uchun suring ↔
            </span>
          </div>
        </>
      )}
    </div>
  );
}
