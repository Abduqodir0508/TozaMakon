import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Trees, 
  Sparkles, 
  Heart, 
  Share2, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  MessageSquare
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import confetti from 'canvas-confetti';

export default function ActionDetailModal({
  initiative,
  onClose,
  isLiked,
  onToggleLike
}) {
  const [likesCount, setLikesCount] = useState(initiative?.likes || 0);
  const [hasLiked, setHasLiked] = useState(isLiked);
  const [comments, setComments] = useState([
    { id: 1, author: "Farhod Rahmonov", text: "Barakalla yoshlar! Mahalla ancha yashillandi.", time: "1 soat oldin", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" },
    { id: 2, author: "Madina Aliyeva", text: "Biz ham keyingi haftada qo'shilamiz, juda ajoyib tashabbus!", time: "3 soat oldin", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [copied, setCopied] = useState(false);

  if (!initiative) return null;

  const handleLike = () => {
    const nextState = !hasLiked;
    setHasLiked(nextState);
    setLikesCount(prev => nextState ? prev + 1 : prev - 1);
    onToggleLike(initiative.id);

    if (nextState) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#0284c7']
      });
    }
  };

  const handleShare = () => {
    const shareText = `Toshkentda ajoyib eko-tashabbus: "${initiative.title}". TozaMakan platformasida ko'ring!`;
    if (navigator.share) {
      navigator.share({
        title: initiative.title,
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        author: "Siz (Faol Foydalanuvchi)",
        text: newComment.trim(),
        time: "Hozirgina",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
      }
    ]);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className={`p-2 rounded-xl text-white ${
              initiative.type === 'tree' 
                ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30' 
                : 'bg-sky-600/30 text-sky-400 border border-sky-500/30'
            }`}>
              {initiative.type === 'tree' ? <Trees className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                {initiative.type === 'tree' ? "Daraxt Ekish Tashabbusi" : "Ommaviy Chiqindi Tozalash"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {initiative.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* High-res Before/After Interactive Comparison Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Oldin va Keyin suratlari taqqoslashi:
              </span>
              <span className="text-[11px] text-slate-400">
                Surish orqali o'zgarishni ko'ring
              </span>
            </div>
            <BeforeAfterSlider
              beforeImage={initiative.images.before}
              afterImage={initiative.images.after}
              height="h-64 sm:h-80"
              showLabels={true}
            />
          </div>

          {/* Author & District Banner */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={initiative.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
                alt={initiative.author.name}
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-400/60"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-100 text-sm">
                  {initiative.author.name}
                  <ShieldCheck className="w-4 h-4 text-emerald-400" title="Tasdiqlangan faol" />
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{initiative.author.handle || "@eko_toshkent"}</span>
                  <span className="text-emerald-400/80 font-medium">({initiative.author.badge || "Eko Faol"})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{initiative.district} tumani</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{initiative.date}</span>
              </div>
            </div>
          </div>

          {/* Description & Exact Location */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Batafsil ma'lumot</h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
              {initiative.description}
            </p>
            {initiative.address && (
              <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{initiative.address}</span>
              </div>
            )}
          </div>

          {/* Impact Metric & Quick Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-[11px] text-slate-400">Ekologik natija:</div>
                <div className="text-sm font-extrabold text-emerald-300">
                  {initiative.impact || `${initiative.count} ${initiative.countUnit}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Like / Cheer Button */}
              <button
                onClick={handleLike}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  hasLiked 
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'text-rose-400'}`} />
                <span>{likesCount} Tashakkur</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-sky-400" />
                <span>{copied ? "Nusxalandi!" : "Ulashish"}</span>
              </button>
            </div>
          </div>

          {/* Comments & Cheers Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Fikrlar va qo'llab-quvvatlashlar ({comments.length})
            </div>

            {/* Comments List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-2.5">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-7 h-7 rounded-full object-cover mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{comment.author}</span>
                      <span className="text-[10px] text-slate-500">{comment.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Minnatdorchilik yoki fikr bildiring..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Yuborish
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
