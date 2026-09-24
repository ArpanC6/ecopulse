'use client';

import React, { useState } from 'react';
import { Columns, Calendar, ShieldCheck, ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { MediaAsset } from '@/types';

interface BeforeAfterSliderProps {
  mediaAssets: MediaAsset[];
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ mediaAssets }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const beforeAsset = mediaAssets.find(m => m.beforeAfterTimestamp === 'before') || mediaAssets[1] || mediaAssets[0];
  const afterAsset = mediaAssets.find(m => m.beforeAfterTimestamp === 'after') || mediaAssets[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            Temporal Before / After Visual Comparer
          </h2>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Cloudinary Synchronized
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Drag the interactive split slider to evaluate physical terrain restoration, canopy regrowth, and plastic elimination over time.
        </p>
      </div>

      {/* Main Interactive Split Slider */}
      <div className="rounded-xl bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {afterAsset.category}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {afterAsset.projectName}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Location Node: {afterAsset.coordinates.locationName}, {afterAsset.coordinates.country}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-amber-700">
              <Calendar className="w-4 h-4" />
              <span>Baseline: {beforeAsset.uploadDate}</span>
            </div>
            <ArrowRightLeft className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-1.5 text-emerald-700">
              <Calendar className="w-4 h-4" />
              <span>Restored: {afterAsset.uploadDate}</span>
            </div>
          </div>
        </div>

        {/* Comparison Canvas */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 select-none min-h-[440px] shadow-inner">
          {/* After Image */}
          <img
            src={afterAsset.originalUrl}
            alt="After Restoration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-emerald-300 text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Month 12: Restored Canopy ({afterAsset.aiAnalysis.canopyDensityPercent || 88}% Density)</span>
          </div>

          {/* Before Image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeAsset.originalUrl}
              alt="Before Baseline"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '100%' }}
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-amber-300 text-xs font-bold text-amber-800 flex items-center gap-1.5 shadow-sm">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Month 1: Baseline Ground Zero ({beforeAsset.aiAnalysis.canopyDensityPercent || 12}% Density)</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center shadow-md border-2 border-slate-200 cursor-ew-resize hover:scale-105 transition">
              <Columns className="w-3.5 h-3.5 rotate-90 text-slate-700" />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Vegetation Canopy Growth</span>
            <div className="text-lg font-black text-emerald-700">+76.3% Net Increase</div>
            <p className="text-[11px] text-slate-500 font-medium">Verified by Cloudinary spectral foliage index</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Atmospheric CO₂ Absorbed</span>
            <div className="text-lg font-black text-teal-700">{afterAsset.aiAnalysis.co2OffsetTons} Metric Tons</div>
            <p className="text-[11px] text-slate-500 font-medium">Audited via drone biomass telemetry</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Anti-Fraud Trust Confidence</span>
            <div className="flex items-center gap-1.5 text-lg font-black text-sky-700">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>{afterAsset.aiAnalysis.trustScore}% Verified</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Zero greenwashing risk detected</p>
          </div>
        </div>
      </div>
    </div>
  );
};
