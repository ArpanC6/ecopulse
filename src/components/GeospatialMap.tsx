'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Tag 
} from 'lucide-react';
import { ESGProject, MediaAsset, ProjectCategory } from '@/types';

interface GeospatialMapProps {
  projects: ESGProject[];
  mediaAssets: MediaAsset[];
  selectedProjectId: string;
  onSelectAsset: (asset: MediaAsset) => void;
}

export const GeospatialMap: React.FC<GeospatialMapProps> = ({
  projects,
  mediaAssets,
  selectedProjectId,
  onSelectAsset,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeAsset, setActiveAsset] = useState<MediaAsset | null>(mediaAssets[0] || null);

  const filteredAssets = mediaAssets.filter((asset) => {
    const matchesProject = selectedProjectId === 'ALL' || asset.projectId === selectedProjectId;
    const matchesCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
    return matchesProject && matchesCategory;
  });

  const categories: ProjectCategory[] = [
    'Reforestation',
    'Ocean Cleanup',
    'Solar Energy',
    'Biodiversity Protection',
    'Urban Recycling',
    'Disaster Relief'
  ];

  return (
    <div className="space-y-4 h-[calc(100vh-140px)] flex flex-col">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Geospatial GIS Telemetry Map</span>
          <span className="text-xs font-normal text-slate-500">({filteredAssets.length} Pins Geotagged)</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Tracks
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Interactive Preview Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Map Canvas View */}
        <div className="lg:col-span-2 relative rounded-xl bg-slate-900 border border-slate-200 overflow-hidden flex flex-col shadow-xs">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 shadow-sm font-semibold">
            <Layers className="w-4 h-4 text-sky-600" />
            <span>Map Layer: Environmental Telemetry</span>
          </div>

          <div className="relative w-full flex-1 bg-slate-950 overflow-hidden flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 w-full h-full max-w-4xl max-h-[500px] flex items-center justify-center">
              {filteredAssets.map((asset) => {
                const isActive = activeAsset?.id === asset.id;
                const topPct = 30 + ((asset.coordinates.lat + 90) % 50);
                const leftPct = 20 + ((asset.coordinates.lng + 180) % 65);

                return (
                  <div
                    key={asset.id}
                    onClick={() => setActiveAsset(asset)}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-md transition-all ${
                      isActive 
                        ? 'bg-emerald-600 text-white font-bold scale-105 ring-2 ring-emerald-400' 
                        : 'bg-white text-slate-900 border border-slate-200 hover:scale-105 font-medium'
                    }`}>
                      <MapPin className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                      <span className="text-[11px] whitespace-nowrap">{asset.title.split('-')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Telemetry Drawer */}
        <div className="rounded-xl bg-white border border-slate-200 p-5 overflow-y-auto space-y-4 flex flex-col justify-between shadow-xs">
          {activeAsset ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeAsset.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  ID: {activeAsset.id}
                </span>
              </div>

              <div className="relative h-44 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                <img 
                  src={activeAsset.originalUrl} 
                  alt={activeAsset.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-xs text-white">{activeAsset.title}</h4>
                    <p className="text-[10px] text-slate-200">Location: {activeAsset.coordinates.locationName}, {activeAsset.coordinates.country}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">LATITUDE</span>
                  <span className="font-mono text-slate-800 font-semibold">{activeAsset.coordinates.lat.toFixed(4)}° N</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">LONGITUDE</span>
                  <span className="font-mono text-slate-800 font-semibold">{activeAsset.coordinates.lng.toFixed(4)}° W</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Environmental Field Analysis</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {activeAsset.aiAnalysis.trustScore}% Score
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeAsset.aiAnalysis.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {activeAsset.aiAnalysis.detectedObjects.map((obj) => (
                    <span key={obj} className="px-2 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-700 flex items-center gap-1 font-semibold">
                      <Tag className="w-2.5 h-2.5 text-emerald-600" />
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>EXIF Hardware Audit</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1">
                  <div>Device: <span className="text-slate-900 font-semibold">{activeAsset.exif.device}</span></div>
                  <div>Captured: <span className="text-slate-900 font-mono">{activeAsset.exif.capturedAt}</span></div>
                  <div>Checksum: <span className="text-slate-500 font-mono text-[10px]">{activeAsset.exif.checksum}</span></div>
                </div>
              </div>

              <button
                onClick={() => onSelectAsset(activeAsset)}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Inspect in Cloudinary Vault</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12 text-xs">
              Select a pin on the map to inspect geotagged telemetry
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
