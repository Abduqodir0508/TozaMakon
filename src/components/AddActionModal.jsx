import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trees, 
  Sparkles, 
  MapPin, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Plus, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { TASHKENT_DISTRICTS, SAMPLE_PRESET_IMAGES } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function AddActionModal({
  isOpen,
  onClose,
  onSave,
  initialCoords,
  currentUser
}) {
  const [type, setType] = useState('tree'); // 'tree' | 'cleanup'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('Chilonzor');
  const [address, setAddress] = useState('');
  const [count, setCount] = useState('25');
  const [coords, setCoords] = useState(initialCoords || [41.2995, 69.2401]);
  
  // Author info
  const [authorName, setAuthorName] = useState(currentUser?.name || 'Komilov Sardor');
  const [authorHandle, setAuthorHandle] = useState(currentUser?.handle || '@tashkent_hero');
  const [authorPhone, setAuthorPhone] = useState(currentUser?.phone || '+998 90 123 45 67');

  // Images state
  const [beforeImage, setBeforeImage] = useState(SAMPLE_PRESET_IMAGES.tree.before[0].url);
  const [afterImage, setAfterImage] = useState(SAMPLE_PRESET_IMAGES.tree.after[0].url);
  const [showPresets, setShowPresets] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialCoords) {
      setCoords(initialCoords);
    }
  }, [initialCoords]);

  useEffect(() => {
    if (currentUser) {
      setAuthorName(currentUser.name);
      setAuthorHandle(currentUser.handle || '@eko_user');
      setAuthorPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  // Handle Type Change and switch default sample images
  const handleTypeChange = (newType) => {
    setType(newType);
    if (newType === 'tree') {
      setBeforeImage(SAMPLE_PRESET_IMAGES.tree.before[0].url);
      setAfterImage(SAMPLE_PRESET_IMAGES.tree.after[0].url);
      setCount('25');
    } else {
      setBeforeImage(SAMPLE_PRESET_IMAGES.cleanup.before[0].url);
      setAfterImage(SAMPLE_PRESET_IMAGES.cleanup.after[0].url);
      setCount('150');
    }
  };

  const handleFileUpload = (e, target) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'before') {
          setBeforeImage(reader.result);
        } else {
          setAfterImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Amal nomini kiriting";
    if (!description.trim()) errs.description = "Batafsil tavsif yozing";
    if (!authorName.trim()) errs.authorName = "Ism-familiyangizni kiriting";
    if (!beforeImage) errs.beforeImage = "Oldingi holat rasmini yuklang";
    if (!afterImage) errs.afterImage = "Keyingi holat rasmini yuklang";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newInitiative = {
      id: `init-${Date.now()}`,
      type,
      title: title.trim(),
      description: description.trim(),
      district,
      address: address.trim() || `${district} tumani hududi`,
      coords: [
        parseFloat(coords[0]) || 41.2995,
        parseFloat(coords[1]) || 69.2401
      ],
      count: parseInt(count, 10) || 10,
      countUnit: type === 'tree' ? 'daraxt' : 'kg chiqindi',
      author: {
        name: authorName.trim(),
        handle: authorHandle.trim(),
        phone: authorPhone.trim(),
        avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        badge: type === 'tree' ? "🌳 Daraxtbon Eko-Faol" : "✨ Toza Shahar Posboni"
      },
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      images: {
        before: beforeImage,
        after: afterImage
      },
      verified: true,
      impact: type === 'tree' ? `+${count} ta yangi nihol` : `${count} kg chiqindi olib chiqildi`
    };

    onSave(newInitiative);

    // Celebratory Confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">Yangi Eko-Amal Qo'shish</h3>
              <p className="text-xs text-slate-400">Toshkent tabiatiga qo'shgan hissangizni belgilang</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          
          {/* Category Selector Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Amal toifasi *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange('tree')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  type === 'tree'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trees className="w-5 h-5 text-emerald-400" />
                <span>🌳 Daraxt ekildi</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('cleanup')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  type === 'cleanup'
                    ? 'bg-sky-600/30 border-sky-500 text-sky-300 shadow-lg shadow-sky-500/20'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-5 h-5 text-sky-400" />
                <span>🧹 Chiqindi tozalandi</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Tashabbus nomi *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'tree' ? "Masalan: Chilonzor 9-mavzeda 40 ta chinor ekildi" : "Masalan: Anhor sohili ommaviy hashar bilan tozalandi"}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {errors.title && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.title}</p>}
          </div>

          {/* District & Quantity in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Toshkent tumani *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {TASHKENT_DISTRICTS.filter(d => d !== "Barcha tumanlar").map(d => (
                  <option key={d} value={d} className="bg-slate-900">{d} tumani</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                {type === 'tree' ? "Daraxtlar soni (tup)" : "Chiqindi miqdori (kg)"} *
              </label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Batafsil tavsif *
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Qanday ishlar amalga oshirildi, kimlar ishtirok etdi, sug'orish yoki saqlash rejasi..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {errors.description && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description}</p>}
          </div>

          {/* Address and Map Coordinates */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Manzil / Mo'ljal
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masalan: 14-maktab oldidagi bo'sh maydon yoki xiyobon"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>Koordinatalar: [{coords[0].toFixed(4)}, {coords[1].toFixed(4)}] (Xaritadagi joylashuv)</span>
            </div>
          </div>

          {/* Photos Upload Section: Oldin (Before) and Keyin (After) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Oldin va Keyin suratlari *
              </label>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer underline"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                {showPresets ? "Presetlarni yashirish" : "Namuna suratlardan tanlash"}
              </button>
            </div>

            {/* Quick Sample Presets Picker */}
            {showPresets && (
              <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-500/30 space-y-2">
                <div className="text-[11px] text-slate-300 font-medium">Tayyor namuna to'plamini tanlang:</div>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_PRESET_IMAGES[type].after.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setBeforeImage(SAMPLE_PRESET_IMAGES[type].before[idx].url);
                        setAfterImage(preset.url);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400 text-left transition-all cursor-pointer"
                    >
                      <img src={preset.url} alt="" className="w-full h-12 object-cover rounded-md mb-1" />
                      <div className="text-[10px] text-slate-300 truncate font-medium">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Two Upload Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* OLDIN (Before) */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase">1. Oldin (Boshlang'ich)</span>
                </div>
                <div className="relative h-28 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group">
                  {beforeImage ? (
                    <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                      <Upload className="w-6 h-6 mb-1" />
                      Rasm yuklang
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-opacity">
                    <Upload className="w-4 h-4 mr-1.5" />
                    O'zgartirish
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'before')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* KEYIN (After) */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase">2. Keyin (Natija)</span>
                </div>
                <div className="relative h-28 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group">
                  {afterImage ? (
                    <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                      <Upload className="w-6 h-6 mb-1" />
                      Rasm yuklang
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-opacity">
                    <Upload className="w-4 h-4 mr-1.5" />
                    O'zgartirish
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'after')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Author Details */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Muallif ma'lumotlari
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ism Familiya (Masalan: Sardor Komilov)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={authorHandle}
                  onChange={(e) => setAuthorHandle(e.target.value)}
                  placeholder="Telegram @username yoki telefon"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer hover:scale-[1.01] active:scale-98"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              Amalni Xaritada E'lon Qilish
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
