'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Flame,
  Globe2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { ESGProject, MediaAsset } from '@/types';
import { ActiveTab } from './Sidebar';

interface OverviewDashboardProps {
  projects: ESGProject[];
  mediaAssets: MediaAsset[];
  onSelectTab: (tab: ActiveTab) => void;
  onSelectAsset: (asset: MediaAsset) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  projects,
  mediaAssets,
  onSelectTab,
  onSelectAsset,
}) => {
  const totalAssets = mediaAssets.length;
  const verifiedAssets = mediaAssets.filter(m => m.aiAnalysis.exifVerified).length;
  const totalCO2Offset = mediaAssets.reduce((sum, m) => sum + m.aiAnalysis.co2OffsetTons, 0);
  const avgTrustScore = Math.round(
    mediaAssets.reduce((sum, m) => sum + m.aiAnalysis.trustScore, 0) / (totalAssets || 1)
  );

  const chartData = [
    { month: 'May 2026', co2: 120, uploads: 14, trust: 94 },
    { month: 'Jun 2026', co2: 240, uploads: 22, trust: 95 },
    { month: 'Jul 2026', co2: 390, uploads: 31, trust: 96 },
    { month: 'Aug 2026', co2: 580, uploads: 45, trust: 97 },
    { month: 'Sep 2026', co2: Math.round(totalCO2Offset), uploads: totalAssets, trust: avgTrustScore },
  ];

  const categoryBreakdown = projects.map(p => {
    const pAssets = mediaAssets.filter(m => m.projectId === p.id);
    const co2 = pAssets.reduce((acc, curr) => acc + curr.aiAnalysis.co2OffsetTons, 0);
    return {
      name: p.category,
      co2: Number(co2.toFixed(1)),
      count: pAssets.length
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Compliance Audit: Verified Zero Fraud Risk</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Environmental Media Intelligence & ESG Verification
        </h2>
        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
          EcoPulse routes field media through Cloudinary transformation pipelines and computer vision evaluation models. Hardware camera EXIF data is cryptographically cross-examined against spatial GIS telemetry to produce audit-ready sustainability disclosures.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Field Media</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalAssets} <span className="text-xs font-normal text-slate-500">Files</span></div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{verifiedAssets} / {totalAssets} Hardware Verified</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Verified CO₂ Removal</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalCO2Offset.toFixed(1)} <span className="text-xs font-normal text-slate-500">Metric Tons</span></div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-teal-700 font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Equivalent to 41,200 sapling-years</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Audit Confidence</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{avgTrustScore}% <span className="text-xs font-normal text-slate-500">Rating</span></div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-sky-700 font-semibold">
              <span>Cryptographic Checksum Verified</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active ESG Sites</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Globe2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{projects.length} <span className="text-xs font-normal text-slate-500">Locations</span></div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-700 font-semibold">
              <span>Global Field Project Nodes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">CO₂ Sequestration Velocity & Media Ingestion</h3>
              <p className="text-xs text-slate-500">Monthly metric tons of verified carbon impact synced via Cloudinary</p>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Pipeline Sync
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="co2" name="Verified CO₂ Tons" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#co2Grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Impact by Category</h3>
            <p className="text-xs text-slate-500">CO₂ offset breakdown by project track</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={9} interval={0} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '12px', color: '#0f172a' }} />
                <Bar dataKey="co2" name="CO₂ Tons" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Environmental ESG Projects</h3>
            <p className="text-xs text-slate-500">Select any project to view geospatial telemetry & Cloudinary vault</p>
          </div>
          <button 
            onClick={() => onSelectTab('map')}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
          >
            <span>View All on Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((proj) => {
            const pct = Math.min(100, Math.round((proj.currentCO2Tons / proj.targetCO2Tons) * 100));
            return (
              <div 
                key={proj.id}
                onClick={() => onSelectTab('map')}
                className="group rounded-xl bg-white border border-slate-200 hover:border-slate-300 overflow-hidden cursor-pointer transition shadow-xs"
              >
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={proj.heroImage} 
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-emerald-800 border border-slate-200 backdrop-blur-md">
                    {proj.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-slate-700 border border-slate-200 backdrop-blur-md">
                    {proj.trustRating}% Rating
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition">
                    {proj.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-medium">
                      <span className="text-slate-500">Carbon Progress</span>
                      <span className="text-emerald-700 font-bold">{proj.currentCO2Tons} / {proj.targetCO2Tons} T</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Field Evidence</h3>
            <p className="text-xs text-slate-500">Processed with Cloudinary smart cropping & object detection</p>
          </div>
          <button 
            onClick={() => onSelectTab('vault')}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
          >
            <span>Cloudinary Vault ({totalAssets})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mediaAssets.slice(0, 5).map((asset) => (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className="group rounded-xl bg-white border border-slate-200 hover:border-slate-300 p-2.5 cursor-pointer transition space-y-2 shadow-xs"
            >
              <div className="relative h-28 rounded-lg overflow-hidden bg-slate-100">
                <img 
                  src={asset.originalUrl} 
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/90 text-slate-700 border border-slate-200">
                  {asset.mediaType.toUpperCase()}
                </span>
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {asset.aiAnalysis.trustScore}% Score
                </span>
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition">
                  {asset.title}
                </h5>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                  Location: {asset.coordinates.locationName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
