import React from 'react';
import { 
  X, 
  User, 
  Award, 
  Trees, 
  Sparkles, 
  MapPin, 
  LogOut, 
  CheckCircle2, 
  Calendar,
  Medal,
  ChevronRight
} from 'lucide-react';

export default function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  myInitiatives = [],
  onSelectInitiative
}) {
  if (!isOpen || !currentUser) return null;

  const BADGES = [
    { title: "Nihol Ekkan", desc: "Kamida 5 ta daraxt ekildi", icon: "🌱", unlocked: true },
    { title: "Toza Shahar", desc: "1 ta tozalash aksiyasi", icon: "✨", unlocked: true },
    { title: "Eko Faol", desc: "100+ ekologik ball", icon: "🌟", unlocked: (currentUser.points || 0) >= 100 },
    { title: "Toshkent Bog'boni", desc: "50+ daraxt ekildi", icon: "🌳", unlocked: (currentUser.trees || 0) >= 50 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base sm:text-lg text-white">Eko-Profil</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* User Hero Banner */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-tr from-slate-800/90 to-emerald-950/40 border border-emerald-500/20">
            <img
              src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-400 shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-extrabold text-white truncate">{currentUser.name}</h4>
              <p className="text-xs text-slate-400">{currentUser.handle || "@foydalanuvchi"}</p>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-emerald-400">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 font-bold text-[11px]">
                  {currentUser.badge || "Eko Faol"}
                </span>
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {currentUser.district} tumani
                </span>
              </div>
            </div>
          </div>

          {/* Stats Cards 3-column Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Eko-Ball</div>
              <div className="text-lg font-black text-emerald-400">{currentUser.points || 150}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Daraxtlar</div>
              <div className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1">
                <Trees className="w-4 h-4" />
                {currentUser.trees || 15}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Tozalash</div>
              <div className="text-lg font-black text-sky-400 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                {currentUser.cleanups || 2}
              </div>
            </div>
          </div>

          {/* Badges System */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Medal className="w-4 h-4 text-emerald-400" />
              Yutuqlar va Nishonlar
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BADGES.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                    b.unlocked 
                      ? 'bg-slate-800/60 border-emerald-500/30 text-white' 
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                  }`}
                >
                  <span className="text-xl">{b.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">{b.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User's Contributed Initiatives */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Mening hissam ({myInitiatives.length})</span>
            </div>

            {myInitiatives.length === 0 ? (
              <p className="text-xs text-slate-500 p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-center">
                Hozircha amallar qo'shmadingiz. "+ Yangi amal" tugmasi orqali xaritada belgilang!
              </p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {myInitiatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectInitiative(item);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`p-1.5 rounded-lg text-white ${
                        item.type === 'tree' ? 'bg-emerald-600/40 text-emerald-400' : 'bg-sky-600/40 text-sky-400'
                      }`}>
                        {item.type === 'tree' ? <Trees className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-200 truncate">{item.title}</div>
                        <div className="text-[10px] text-slate-400">{item.district} tumani &bull; {item.date}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Hisobdan chiqish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
