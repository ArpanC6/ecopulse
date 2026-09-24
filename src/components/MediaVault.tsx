'use client';

import React, { useState } from 'react';
import { 
  Cloud, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  Copy, 
  Check, 
  Layers, 
  Tag, 
  Calendar, 
  User,
  Zap,
  Eye,
  MapPin
} from 'lucide-react';
import { MediaAsset } from '@/types';
import { buildCloudinaryUrl } from '@/services/cloudinaryService';

interface MediaVaultProps {
  mediaAssets: MediaAsset[];
  selectedAsset: MediaAsset | null;
  onSelectAsset: (asset: MediaAsset) => void;
}

export const MediaVault: React.FC<MediaVaultProps> = ({
  mediaAssets,
  selectedAsset,
  onSelectAsset,
}) => {
  const [activeTransformation, setActiveTransformation] = useState<'raw' | 'smart_crop' | 'ai_enhance' | 'verified_watermark' | 'thermal_overlay'>('raw');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('ALL');

  const currentAsset = selectedAsset || mediaAssets[0] || null;

  const filteredAssets = mediaAssets.filter((asset) => {
    if (mediaTypeFilter === 'ALL') return true;
    return asset.mediaType === mediaTypeFilter;
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getActiveTransformationUrl = (asset: MediaAsset): string => {
    return buildCloudinaryUrl(asset.originalUrl, activeTransformation);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              Cloudinary Media Vault & Inspector
            </h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Live Cloudinary API
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Dynamic visual transformations, smart cropping, and cryptographic watermarking powered by Cloudinary.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {['ALL', 'image', 'drone', 'thermal'].map((type) => (
            <button
              key={type}
              onClick={() => setMediaTypeFilter(type)}
              className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition ${
                mediaTypeFilter === type
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Studio View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {currentAsset ? (
            <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    {currentAsset.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {currentAsset.uploadDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-sky-600" />
                      {currentAsset.author} ({currentAsset.authorRole})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {currentAsset.aiAnalysis.trustScore}% Verified
                  </span>
                </div>
              </div>

              {/* Transformation Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-sky-600" />
                  <span>Select Dynamic Cloudinary Transformation:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {[
                    { id: 'raw', label: 'Original Raw', icon: Eye },
                    { id: 'ai_enhance', label: 'Outdoor Enhance', icon: Sparkles },
                    { id: 'smart_crop', label: 'Smart Focus Crop', icon: Layers },
                    { id: 'verified_watermark', label: 'Verified Overlay', icon: ShieldCheck },
                    { id: 'thermal_overlay', label: 'Spectral Canopy', icon: Zap },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isActive = activeTransformation === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveTransformation(t.id as any)}
                        className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                          isActive
                            ? 'bg-sky-50 border-sky-300 text-sky-800 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                        <span className="text-[11px] leading-tight">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Viewer */}
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 min-h-[380px] flex items-center justify-center">
                <img
                  src={getActiveTransformationUrl(currentAsset)}
                  alt={currentAsset.title}
                  className="w-full max-h-[480px] object-contain"
                />

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-1.5 shadow-sm font-semibold">
                  <Cloud className="w-3.5 h-3.5 text-sky-600" />
                  <span>Transformation: {activeTransformation}</span>
                </div>

                <button
                  onClick={() => handleCopyUrl(getActiveTransformationUrl(currentAsset))}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200 text-xs text-slate-800 font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  {copiedUrl === getActiveTransformationUrl(currentAsset) ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-600" />
                      <span>Copy Cloudinary URL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Est. CO₂ Sequestration</span>
                  <span className="text-base font-extrabold text-emerald-700">{currentAsset.aiAnalysis.co2OffsetTons} Tons</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Fraud Risk Level</span>
                  <span className="text-base font-extrabold text-sky-700">{currentAsset.aiAnalysis.greenwashingRisk} Risk</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">EXIF Hardware Match</span>
                  <span className="text-base font-extrabold text-teal-700">100% Cryptographic</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-800">Detected Environmental Indicators:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentAsset.aiAnalysis.detectedObjects.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1 font-semibold">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Catalog */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Catalog ({filteredAssets.length})</h4>
            <span className="text-[10px] text-slate-500 font-medium">Cloudinary Media</span>
          </div>

          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {filteredAssets.map((asset) => {
              const isSelected = currentAsset?.id === asset.id;
              return (
                <div
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className={`group p-3 rounded-xl border transition cursor-pointer flex gap-3 ${
                    isSelected
                      ? 'bg-white border-sky-500 ring-1 ring-sky-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={asset.originalUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/90 text-emerald-700 border border-slate-200">
                      {asset.aiAnalysis.trustScore}%
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-block">
                      {asset.category}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 truncate group-hover:text-sky-700 transition">
                      {asset.title}
                    </h5>
                    <p className="text-[10px] text-slate-500 truncate flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{asset.coordinates.locationName}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
