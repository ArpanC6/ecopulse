'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar, ActiveTab } from '@/components/Sidebar';
import { OverviewDashboard } from '@/components/OverviewDashboard';
import { GeospatialMap } from '@/components/GeospatialMap';
import { MediaVault } from '@/components/MediaVault';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { ImpactStoryBuilder } from '@/components/ImpactStoryBuilder';
import { VerificationAudit } from '@/components/VerificationAudit';
import { UploadModal } from '@/components/UploadModal';

import { INITIAL_PROJECTS, INITIAL_MEDIA_ASSETS, INITIAL_IMPACT_STORIES } from '@/data/mockData';
import { ESGProject, MediaAsset, ImpactStory } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [projects, setProjects] = useState<ESGProject[]>(INITIAL_PROJECTS);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(INITIAL_MEDIA_ASSETS);
  const [stories, setStories] = useState<ImpactStory[]>(INITIAL_IMPACT_STORIES);

  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(INITIAL_MEDIA_ASSETS[0] || null);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const filteredAssets = mediaAssets.filter(asset => {
    const matchesProject = selectedProjectId === 'ALL' || asset.projectId === selectedProjectId;
    const matchesSearch = 
      searchQuery === '' ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.coordinates.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesProject && matchesSearch;
  });

  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setActiveTab('vault');
  };

  const handleUploadSuccess = (newAsset: MediaAsset) => {
    setMediaAssets(prev => [newAsset, ...prev]);
    setSelectedAsset(newAsset);
    setActiveTab('vault');
  };

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      if (activeTab !== 'story') {
        setActiveTab('story');
        await new Promise(r => setTimeout(r, 400));
      }

      const reportEl = document.getElementById('executive-pdf-report-document');
      if (reportEl) {
        const canvas = await html2canvas(reportEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`EcoPulse-ESG-Executive-Report-${Date.now()}.pdf`);
      }
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Report exported successfully to PDF!');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const verifiedAssetsCount = mediaAssets.filter(m => m.aiAnalysis.exifVerified).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUploadModal={() => setIsUploadOpen(true)}
        onExportPDFReport={handleExportPDF}
        isExportingPDF={isExportingPDF}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          totalAssetsCount={mediaAssets.length}
          totalVerifiedCount={verifiedAssetsCount}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <OverviewDashboard
                projects={projects}
                mediaAssets={filteredAssets}
                onSelectTab={setActiveTab}
                onSelectAsset={handleSelectAsset}
              />
            )}

            {activeTab === 'map' && (
              <GeospatialMap
                projects={projects}
                mediaAssets={filteredAssets}
                selectedProjectId={selectedProjectId}
                onSelectAsset={handleSelectAsset}
              />
            )}

            {activeTab === 'vault' && (
              <MediaVault
                mediaAssets={filteredAssets}
                selectedAsset={selectedAsset}
                onSelectAsset={setSelectedAsset}
              />
            )}

            {activeTab === 'slider' && (
              <BeforeAfterSlider
                mediaAssets={filteredAssets}
              />
            )}

            {activeTab === 'story' && (
              <ImpactStoryBuilder
                projects={projects}
                mediaAssets={filteredAssets}
                initialStories={stories}
                onExportPDF={handleExportPDF}
                isExportingPDF={isExportingPDF}
              />
            )}

            {activeTab === 'audit' && (
              <VerificationAudit
                mediaAssets={filteredAssets}
                onSelectAsset={handleSelectAsset}
              />
            )}
          </div>
        </main>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        projects={projects}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
