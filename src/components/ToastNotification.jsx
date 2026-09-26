import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-xl ${
        isSuccess
          ? 'bg-emerald-950/90 border-emerald-500/50 text-white shadow-emerald-900/40'
          : 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-black/50'
      }`}>
        <div className={`p-1.5 rounded-xl ${isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'}`}>
          {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
        </div>
        <div>
          <div className="text-xs font-bold">{toast.title || "Bildirishnoma"}</div>
          <div className="text-[11px] text-slate-300">{toast.message}</div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
