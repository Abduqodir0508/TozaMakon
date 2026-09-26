import React from 'react';
import { 
  Trees, 
  Sparkles, 
  Search, 
  MapPin, 
  PlusCircle, 
  User, 
  SlidersHorizontal,
  Award,
  ChevronDown
} from 'lucide-react';
import { TASHKENT_DISTRICTS } from '../data/mockData';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedDistrict,
  setSelectedDistrict,
  selectedType,
  setSelectedType,
  totalTrees,
  totalCleanups,
  onOpenAddModal,
  onOpenAuthModal,
  onOpenProfileModal,
  currentUser,
  toggleSidebar,
  isSidebarOpen
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-2 sm:p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        
        {/* Main Floating Glass Bar */}
        <div className="glass-panel rounded-2xl p-2 sm:p-3 px-3 sm:px-5 flex items-center justify-between shadow-2xl pointer-events-auto border border-emerald-500/20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/30 group cursor-pointer hover:scale-105 transition-all">
              <Trees className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-xl tracking-tight text-white flex items-center">
                  Toza<span className="text-emerald-400">Makan</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 hidden sm:inline-block">
                  Toshkent
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Yashillik va Tozalik Xaritasi</p>
            </div>
          </div>

          {/* Quick Counter Banner (Center Desktop) */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <div className="flex items-center gap-2 px-2 border-r border-slate-800">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Trees className="w-4 h-4" />
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 leading-tight">Ekilgan daraxtlar</div>
                <div className="text-sm font-black text-emerald-400 leading-tight">{totalTrees.toLocaleString()} <span className="text-xs font-normal text-slate-400">tup</span></div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 leading-tight">Tozalangan hududlar</div>
                <div className="text-sm font-black text-sky-400 leading-tight">{totalCleanups.toLocaleString()} <span className="text-xs font-normal text-slate-400">joy</span></div>
              </div>
            </div>
          </div>

          {/* Actions Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* New Action Button */}
            <button
              id="add-action-btn"
              onClick={onOpenAddModal}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span className="hidden xs:inline">+ Yangi amal</span>
              <span className="xs:hidden">Qo'shish</span>
            </button>

            {/* User Profile / Sign In */}
            {currentUser ? (
              <button
                onClick={onOpenProfileModal}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-emerald-500/30 text-white transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-400"
                />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <Award className="w-3 h-3" /> {currentUser.points || 120} ball
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer hover:border-slate-500"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Kirish</span>
              </button>
            )}

            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                isSidebarOpen 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Faollik tasmasi va Reyting"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel-light rounded-xl p-2 sm:p-2.5 flex flex-wrap sm:flex-nowrap items-center gap-2 shadow-xl pointer-events-auto border border-white/10">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidiruv (nomi, tuman, manzil)..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* District Dropdown Selector */}
          <div className="relative min-w-[150px]">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-lg pl-8 pr-7 py-1.5 text-xs sm:text-sm text-slate-200 appearance-none focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              {TASHKENT_DISTRICTS.map((district) => (
                <option key={district} value={district} className="bg-slate-900 text-slate-200">
                  {district}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Type Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hammasi
            </button>
            <button
              onClick={() => setSelectedType('tree')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
                selectedType === 'tree'
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              <Trees className="w-3 h-3 text-emerald-400" />
              Daraxtlar
            </button>
            <button
              onClick={() => setSelectedType('cleanup')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
                selectedType === 'cleanup'
                  ? 'bg-sky-500/30 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-sky-300'
              }`}
            >
              <Sparkles className="w-3 h-3 text-sky-400" />
              Tozalashlar
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
