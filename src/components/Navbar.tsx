'use client';

import React from 'react';
import { Cloud, Upload, ShieldCheck, Download, Search, RefreshCw, Layers } from 'lucide-react';
import { ESGProject } from '@/types';

interface NavbarProps {
  projects: ESGProject[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenUploadModal: () => void;
  onExportPDFReport: () => void;
  isExportingPDF?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  searchQuery,
  onSearchChange,
  onOpenUploadModal,
  onExportPDFReport,
  isExportingPDF = false,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold shadow-xs">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              EcoPulse <span className="text-slate-500 font-normal text-sm">Platform</span>
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              <Cloud className="w-3 h-3 text-sky-600" />
              Cloudinary Powered
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Environmental Media Intelligence & ESG Verification</p>
        </div>
      </div>

      {/* Search & Project Selector */}
      <div className="flex items-center flex-1 max-w-xl gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search field assets by location, tags, GPS coordinates..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition"
          />
        </div>

        <select
          value={selectedProjectId}
          onChange={(e) => onSelectProject(e.target.value)}
          aria-label="Filter ESG Project"
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="ALL">All Projects ({projects.length})</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Processing Engine: Active</span>
        </div>

        <button
          onClick={onExportPDFReport}
          disabled={isExportingPDF}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition disabled:opacity-50 cursor-pointer"
        >
          {isExportingPDF ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
          ) : (
            <Download className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>Export ESG Report</span>
        </button>

        <button
          onClick={onOpenUploadModal}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Ingest Evidence</span>
        </button>
      </div>
    </header>
  );
};
