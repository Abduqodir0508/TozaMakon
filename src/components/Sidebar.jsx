import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Flame, 
  Trees, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Award, 
  Target, 
  Calendar,
  Users
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  initiatives,
  leaderboard,
  onSelectInitiative
}) {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'leaderboard'

  // Calculate Tashkent city progress towards 100,000 trees goal
  const totalTrees = initiatives.reduce((sum, item) => item.type === 'tree' ? sum + item.count : sum, 0);
  const targetGoal = 10000;
  const progressPercent = Math.min(100, ((totalTrees / targetGoal) * 100)).toFixed(1);

  return (
    <aside
      className={`fixed top-20 bottom-4 right-2 sm:right-4 z-30 w-full max-w-[360px] sm:max-w-[400px] glass-panel rounded-2xl shadow-2xl flex flex-col transition-all duration-300 pointer-events-auto border border-white/10 ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0 pointer-events-none'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between">
        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Faollik Tasmasi
          </button>
          
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Eko-Qahramonlar
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Progress Bar Widget */}
      <div className="p-3.5 mx-3 mt-3 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/25">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            Toshkent Yashil Rejasi 2026
          </span>
          <span className="font-extrabold text-emerald-400">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>{totalTrees} ekilgan</span>
          <span>Maqsad: {targetGoal.toLocaleString()} tup</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        
        {/* TAB 1: Activity Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
              <span>So'nggi harakatlar ({initiatives.length})</span>
              <span className="text-[10px] text-emerald-400 font-normal">Real vaqt</span>
            </div>

            {initiatives.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectInitiative(item)}
                className="glass-card p-3 rounded-xl cursor-pointer hover:scale-[1.01] transition-all group border border-slate-800 hover:border-emerald-500/40"
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-slate-700">
                    <img
                      src={item.images.after || item.images.before}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className={`absolute bottom-0 inset-x-0 text-[8px] font-extrabold text-center py-0.5 text-white ${
                      item.type === 'tree' ? 'bg-emerald-600/90' : 'bg-sky-600/90'
                    }`}>
                      {item.type === 'tree' ? 'DARAXT' : 'TOZALASH'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-100 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span className="flex items-center gap-1 font-medium text-slate-300">
                        <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                        {item.district}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        +{item.count} {item.countUnit}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 self-center transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Leaderboard Top 10 */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
              <span>Eng faol eko-qahramonlar</span>
              <span className="text-[10px] text-amber-400 flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Top Reyting
              </span>
            </div>

            {leaderboard.map((user, idx) => {
              const isTop3 = idx < 3;
              const rankColor = idx === 0 
                ? 'from-amber-400 to-yellow-600 text-slate-950 font-black' 
                : idx === 1 
                ? 'from-slate-300 to-slate-500 text-slate-950 font-black' 
                : idx === 2 
                ? 'from-amber-700 to-amber-900 text-amber-100 font-black' 
                : 'bg-slate-800 text-slate-400';

              return (
                <div
                  key={user.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isTop3 
                      ? 'bg-slate-800/80 border-amber-500/30 shadow-md' 
                      : 'bg-slate-900/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank badge */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs bg-gradient-to-tr ${rankColor} shadow-sm shrink-0`}>
                      {idx + 1}
                    </div>

                    {/* Avatar */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-emerald-400/50 shrink-0"
                    />

                    {/* User info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white truncate">{user.name}</span>
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1 shrink-0">
                          <Award className="w-3 h-3" /> {user.points} ball
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span className="truncate">{user.badge}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">🌳 {user.trees}</span>
                          <span className="text-sky-400">✨ {user.cleanups}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800/80 text-center bg-slate-900/80 rounded-b-2xl">
        <p className="text-[11px] text-slate-400">
          🌱 Har bir harakat Toshkentni yashilroq qiladi!
        </p>
      </div>
    </aside>
  );
}
