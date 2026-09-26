import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Trees, Sparkles, MapPin, Calendar, User, ExternalLink, ThumbsUp } from 'lucide-react';

// Fix standard leaflet icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Tashkent map boundaries & initial center
const TASHKENT_CENTER = [41.2995, 69.2401];
const TASHKENT_BOUNDS = [
  [41.1500, 69.1000], // Southwest
  [41.4200, 69.4500]  // Northeast
];

// Create custom SVG HTML Icons for Leaflet
const createCustomIcon = (type, count, isSelected = false) => {
  const isTree = type === 'tree';
  const bgColor = isTree ? '#059669' : '#0284c7';
  const borderColor = isTree ? '#34d399' : '#38bdf8';
  const shadowColor = isTree ? 'rgba(16, 185, 129, 0.6)' : 'rgba(2, 132, 199, 0.6)';
  const pulseClass = isSelected ? 'ring-4 ring-white' : '';

  const iconSvg = isTree
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.4"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>`;

  const html = `
    <div class="relative group cursor-pointer">
      <div style="background-color: ${bgColor}; border: 2.5px solid ${borderColor}; box-shadow: 0 4px 14px ${shadowColor};" 
           class="w-10 h-10 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-200 ${pulseClass}">
        ${iconSvg}
      </div>
      ${count ? `
        <span class="absolute -top-2 -right-2 bg-slate-900 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full border border-emerald-400/80 shadow-md">
          ${count > 99 ? '99+' : count}
        </span>
      ` : ''}
      <div class="w-2 h-2 bg-emerald-400 rotate-45 mx-auto -mt-1 shadow-sm"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [40, 44],
    iconAnchor: [20, 44],
    popupAnchor: [0, -42]
  });
};

// Map click listener component
function MapEvents({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

// Controller for programmatic map flyTo
function MapController({ focusedCoords }) {
  const map = useMap();
  useEffect(() => {
    if (focusedCoords) {
      map.flyTo(focusedCoords, 15, {
        animate: true,
        duration: 1.2
      });
    }
  }, [focusedCoords, map]);
  return null;
}

export default function TashkentMap({
  initiatives,
  selectedInitiative,
  onSelectInitiative,
  onMapClickToAdd,
  focusedCoords,
  onOpenDetailModal
}) {
  const mapRef = useRef(null);

  return (
    <div className="w-full h-screen relative bg-slate-950">
      <MapContainer
        center={TASHKENT_CENTER}
        zoom={13}
        minZoom={11}
        maxZoom={18}
        maxBounds={TASHKENT_BOUNDS}
        maxBoundsViscosity={0.9}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        ref={mapRef}
      >
        {/* Free OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents onMapClick={onMapClickToAdd} />
        <MapController focusedCoords={focusedCoords} />

        {/* Render Action Markers */}
        {initiatives.map((item) => (
          <Marker
            key={item.id}
            position={item.coords}
            icon={createCustomIcon(item.type, item.count, selectedInitiative?.id === item.id)}
            eventHandlers={{
              click: () => onSelectInitiative(item)
            }}
          >
            <Popup className="tozamakan-popup" maxWidth={360} minWidth={300}>
              <div className="p-3.5 space-y-3 bg-slate-900 text-slate-100 rounded-xl">
                
                {/* Author & Tag Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={item.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        {item.author.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                        {item.district}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                    item.type === 'tree'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      : 'bg-sky-950/80 text-sky-300 border border-sky-500/30'
                  }`}>
                    {item.type === 'tree' ? (
                      <>
                        <Trees className="w-2.5 h-2.5 text-emerald-400" /> Daraxt
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-2.5 h-2.5 text-sky-400" /> Tozalash
                      </>
                    )}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-sm text-slate-100 line-clamp-2 leading-snug">
                  {item.title}
                </h4>

                {/* Embedded Interactive Before/After Slider */}
                <div className="rounded-lg overflow-hidden border border-slate-800 shadow-md">
                  <BeforeAfterSlider
                    beforeImage={item.images.before}
                    afterImage={item.images.after}
                    height="h-44"
                    showLabels={true}
                  />
                </div>

                {/* Impact Metric & Footer */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {item.impact || `${item.count} ${item.countUnit}`}
                  </div>
                  
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </div>
                </div>

                {/* Button to Open Full Details Modal */}
                <button
                  onClick={() => onOpenDetailModal(item)}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Batafsil ko'rish va qo'llab-quvvatlash
                </button>

              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Map Helper Badge */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
        <div className="glass-panel px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 border border-emerald-500/20 shadow-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Xaritadagi ixtiyoriy joyni bosib yangi tashabbus qo'shishingiz mumkin</span>
        </div>
      </div>
    </div>
  );
}
