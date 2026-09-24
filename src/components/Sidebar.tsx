'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Images, 
  Columns, 
  BookOpen, 
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export type ActiveTab = 'overview' | 'map' | 'vault' | 'slider' | 'story' | 'audit';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  totalAssetsCount: number;
  totalVerifiedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  totalAssetsCount,
  totalVerifiedCount
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Geospatial Intelligence', icon: MapPin },
    { id: 'vault', label: 'Cloudinary Vault', icon: Images, badge: `${totalAssetsCount}` },
    { id: 'slider', label: 'Before/After Comparer', icon: Columns },
    { id: 'story', label: 'Impact Storyteller', icon: BookOpen },
    { id: 'audit', label: 'EXIF Cryptographic Audit', icon: ShieldCheck, badge: `${totalVerifiedCount} Verified` },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 shadow-xs">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Platform Navigation
          </p>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-indigo-700 font-bold border border-slate-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isActive ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-sky-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            <span>Cloudinary Media Engine</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Real-time visual processing via Cloudinary dynamic transformations, smart cropping, and spectral EXIF verification.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>System Status: Operational</span>
        </div>
      </div>
    </aside>
  );
};
