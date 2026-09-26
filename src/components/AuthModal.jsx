import React, { useState } from 'react';
import { X, User, Phone, Send, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { TASHKENT_DISTRICTS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [handleOrPhone, setHandleOrPhone] = useState('');
  const [district, setDistrict] = useState('Chilonzor');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("Iltimos, ism va familiyangizni kiriting");
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: `${firstName.trim()} ${lastName.trim()}`,
      handle: handleOrPhone.startsWith('@') ? handleOrPhone.trim() : (handleOrPhone ? `@${handleOrPhone.trim()}` : '@eco_activist'),
      phone: handleOrPhone.startsWith('+') ? handleOrPhone.trim() : '+998 90 000 00 00',
      district,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
      points: 150,
      trees: 15,
      cleanups: 2,
      badge: "🌱 Yashil Toshkent Qahramoni",
      joinedDate: new Date().toLocaleDateString('uz-UZ')
    };

    onLogin(newUser);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">TozaMakan Profiliga Kirish</h3>
          <p className="text-xs text-slate-400">
            Daraxt eking, hududlarni tozalang va ekologik ballar to'plang!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Ism *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Sardor"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Familiya *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Komilov"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Telefon yoki Telegram username
            </label>
            <div className="relative">
              <Send className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={handleOrPhone}
                onChange={(e) => setHandleOrPhone(e.target.value)}
                placeholder="@username yoki +998 90 123 45 67"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Yashash tumaningiz
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {TASHKENT_DISTRICTS.filter(d => d !== "Barcha tumanlar").map(d => (
                  <option key={d} value={d} className="bg-slate-900">{d} tumani</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-rose-400 text-xs font-medium">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              Hisobga Kirish / Ro'yxatdan o'tish
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
