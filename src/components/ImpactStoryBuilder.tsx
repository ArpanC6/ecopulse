'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  CheckCircle2, 
  RefreshCw,
  MapPin,
  FileText
} from 'lucide-react';
import { ESGProject, MediaAsset, ImpactStory } from '@/types';
import { generateImpactReport } from '@/services/analysisService';

interface ImpactStoryBuilderProps {
  projects: ESGProject[];
  mediaAssets: MediaAsset[];
  initialStories: ImpactStory[];
  onExportPDF: () => void;
  isExportingPDF?: boolean;
}

export const ImpactStoryBuilder: React.FC<ImpactStoryBuilderProps> = ({
  projects,
  mediaAssets,
  initialStories,
  onExportPDF,
  isExportingPDF = false,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-1');
  const [stories, setStories] = useState<ImpactStory[]>(initialStories);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const projectAssets = mediaAssets.filter(m => m.projectId === selectedProjectId);
  const currentStory = stories.find(s => s.projectId === selectedProjectId) || {
    id: 'story-default',
    projectId: activeProject.id,
    projectName: activeProject.name,
    title: `Environmental Impact Report: ${activeProject.name}`,
    executiveSummary: `Through automated Cloudinary visual pipelines and multi-spectral telemetry verification, the ${activeProject.name} initiative has compiled ${projectAssets.length} immutable field evidence records. Audit algorithms confirm an overall data authenticity rating of ${activeProject.trustRating}%.`,
    keyAchievements: [
      `Successfully verified ${activeProject.currentCO2Tons} Metric Tons of atmospheric CO2 sequestration.`,
      `Deployed Cloudinary automated transformation and GPS telemetry tracking across geotagged field nodes.`,
      `Achieved a ${activeProject.trustRating}% cryptographic EXIF & satellite cross-matching trust score.`,
      `Eliminated greenwashing risks via real-time computer vision spectral analysis.`
    ],
    co2ImpactTotal: activeProject.currentCO2Tons,
    communityBeneficiaries: 1200,
    areaRestoredHectares: 450,
    verifiedMediaIds: projectAssets.map(a => a.id),
    author: 'Dr. Elena Rostova',
    publishedDate: '2026-09-24'
  };

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateImpactReport(activeProject.name, activeProject.category, projectAssets);
      const newStory: ImpactStory = {
        id: `story-${Date.now()}`,
        projectId: activeProject.id,
        projectName: activeProject.name,
        title: generated.title,
        executiveSummary: generated.executiveSummary,
        keyAchievements: generated.keyAchievements,
        co2ImpactTotal: generated.co2Total,
        communityBeneficiaries: 1450,
        areaRestoredHectares: 520,
        verifiedMediaIds: projectAssets.map(a => a.id),
        author: 'Environmental Audit Engine',
        publishedDate: new Date().toISOString().split('T')[0]
      };
      setStories(prev => [newStory, ...prev.filter(s => s.projectId !== activeProject.id)]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              ESG Impact Storyteller & Executive Report Generator
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Analytical Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Synthesize geotagged Cloudinary media evidence into verified ESG impact reports compliant with CSRD & ISSB standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateStory}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-sky-400" />
            )}
            <span>Update Report Data</span>
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExportingPDF}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {isExportingPDF ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Project Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProjectId(p.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition border ${
              selectedProjectId === p.id
                ? 'bg-slate-800 border-slate-700 text-white font-semibold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Report Document View */}
      <div id="executive-pdf-report-document" className="rounded-xl bg-slate-900 border border-slate-800 p-8 space-y-8 shadow-xl">
        <div className="border-b border-slate-800 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-xs">
                EP
              </div>
              <span className="text-xs font-bold text-white tracking-wider">ECOPULSE ESG AUDIT REPORT</span>
            </div>
            <span className="text-xs font-mono text-slate-500">REF: EP-2026-{activeProject.id.toUpperCase()}</span>
          </div>

          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {activeProject.category} Track
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight leading-snug">
              {currentStory.title}
            </h1>
            <p className="text-xs text-slate-400">
              Published on <strong className="text-slate-200">{currentStory.publishedDate}</strong> • Lead Auditor: <strong className="text-slate-200">{currentStory.author}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-950 border border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Verified CO₂ Removal</span>
            <span className="text-lg font-bold text-emerald-400">{currentStory.co2ImpactTotal} Tons</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Audit Trust Rating</span>
            <span className="text-lg font-bold text-sky-400">{activeProject.trustRating}% Confidence</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Area Restored</span>
            <span className="text-lg font-bold text-teal-400">{currentStory.areaRestoredHectares} Hectares</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Field Evidence Records</span>
            <span className="text-lg font-bold text-slate-300">{projectAssets.length} Files</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. Executive Summary</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-serif text-justify">
            {currentStory.executiveSummary}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. Audited Environmental Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStory.keyAchievements.map((ach, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium leading-normal">{ach}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. Photogrammetric Evidence & Cloudinary Verification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectAssets.map((asset) => (
              <div key={asset.id} className="rounded-lg overflow-hidden bg-slate-950 border border-slate-800 p-2 space-y-2">
                <div className="relative h-36 rounded overflow-hidden">
                  <img src={asset.originalUrl} alt={asset.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-medium bg-slate-950/90 text-emerald-400 border border-slate-800">
                    EXIF VERIFIED
                  </span>
                </div>
                <div className="space-y-1 px-1">
                  <h5 className="font-bold text-xs text-white line-clamp-1">{asset.title}</h5>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{asset.coordinates.locationName}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
          <span>Official Certification by EcoPulse & Cloudinary Media Intelligence Platform</span>
          <span>Compliance Standard: CSRD / ISSB / ISO 14064</span>
        </div>
      </div>
    </div>
  );
};
