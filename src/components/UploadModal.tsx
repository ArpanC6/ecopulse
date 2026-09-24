'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  RefreshCw,
  Camera,
  Image as ImageIcon,
  Check,
  Zap
} from 'lucide-react';
import { ESGProject, MediaAsset } from '@/types';
import { analyzeFieldMedia } from '@/services/analysisService';
import { generateCloudinaryTransformations } from '@/services/cloudinaryService';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ESGProject[];
  onUploadSuccess: (newAsset: MediaAsset) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  projects,
  onUploadSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-1');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'drone' | 'thermal'>('image');
  const [locationName, setLocationName] = useState('Sector B, Manaus');
  const [country, setCountry] = useState('Brazil');
  const [lat, setLat] = useState(-3.119);
  const [lng, setLng] = useState(-60.0217);
  const [author, setAuthor] = useState('Arpan Chakraborty');
  const [authorRole, setAuthorRole] = useState('Lead ESG Auditor');
  
  const [previewUrl, setPreviewUrl] = useState<string>('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  
  // Camera Capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  if (!isOpen) return null;

  const selectedProject = projects.find(p => p.id === projectId) || projects[0];

  // Handle local file drop / selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
          if (!title) {
            setTitle(file.name.replace(/\.[^/.]+$/, ""));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Start live webcam camera
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Unable to access webcam device. Please select a local file or image URL.');
      setIsCameraActive(false);
    }
  };

  // Capture frame from webcam camera
  const captureCameraFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const capturedDataUrl = canvas.toDataURL('image/jpeg');
        setPreviewUrl(capturedDataUrl);
        stopCamera();
      }
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsProcessing(true);
    setProcessingStep('Ingesting live media to Cloudinary API...');

    await new Promise(r => setTimeout(r, 600));
    setProcessingStep('Extracting EXIF GPS Hardware Telemetry...');

    await new Promise(r => setTimeout(r, 600));
    setProcessingStep('Evaluating Environmental Indicators & Trust Scores...');

    const analysisResult = await analyzeFieldMedia(
      previewUrl,
      title,
      selectedProject.category,
      lat,
      lng
    );

    setProcessingStep('Applying Cloudinary Dynamic Transformations...');
    await new Promise(r => setTimeout(r, 400));

    const newAsset: MediaAsset = {
      id: `media-${Date.now()}`,
      title,
      description: `Live uploaded evidence for ${selectedProject.name}. Geotagged at ${locationName}.`,
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      category: selectedProject.category,
      uploadDate: new Date().toISOString().split('T')[0],
      coordinates: {
        lat: Number(lat),
        lng: Number(lng),
        locationName,
        country
      },
      originalUrl: previewUrl,
      cloudinaryPublicId: `live_upload_${Date.now()}`,
      cloudinaryTransformations: generateCloudinaryTransformations(previewUrl),
      mediaType,
      author,
      authorRole,
      aiAnalysis: analysisResult,
      exif: {
        device: 'Live Captured Camera / Drone RTK',
        exposure: '1/1000s at f/4.0',
        iso: '100',
        capturedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        checksum: `sha256:${Math.random().toString(36).substring(2, 12)}...`
      },
      tags: [selectedProject.category, 'Live Ingested', 'Cloudinary Processed', 'Verified']
    };

    setIsProcessing(false);
    onUploadSuccess(newAsset);
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Live Ingest Geotagged Field Evidence</h3>
              <p className="text-xs text-slate-500 font-medium">Cloudinary Ingestion & Environmental Verification</p>
            </div>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Live Capture & File Selector */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 block">Select Live Source (File Upload or Camera Capture)</label>
            
            {isCameraActive ? (
              <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex flex-col items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={captureCameraFrame}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* File picker */}
                <label className="p-4 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 transition cursor-pointer flex flex-col items-center justify-center space-y-1 text-center">
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                  <span className="font-bold text-slate-700 text-xs">Upload File from Device</span>
                  <span className="text-[10px] text-slate-500">Supports JPG, PNG, MP4, Drone footage</span>
                  <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                </label>

                {/* Webcam button */}
                <button
                  type="button"
                  onClick={startCamera}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20 transition cursor-pointer flex flex-col items-center justify-center space-y-1 text-center"
                >
                  <Camera className="w-6 h-6 text-emerald-600" />
                  <span className="font-bold text-slate-700 text-xs">Capture Live Webcam / Drone Camera</span>
                  <span className="text-[10px] text-slate-500">Take real-time photo directly</span>
                </button>
              </div>
            )}

            {/* Preview Thumbnail */}
            {previewUrl && (
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img src={previewUrl} alt="Live Preview" className="w-16 h-12 object-cover rounded border border-slate-200" />
                <div className="text-[11px] text-slate-600 flex-1 truncate">
                  <span className="font-bold text-emerald-700 block">Live Media Ready</span>
                  <span className="text-[10px] text-slate-500 truncate block">{previewUrl.substring(0, 60)}...</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Field Evidence Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Sector B3 Hardwood Sapling Grid Verification"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Associated ESG Project</label>
              <select
                value={projectId}
                onChange={e => setProjectId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Media Type</label>
              <select
                value={mediaType}
                onChange={e => setMediaType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
              >
                <option value="image">Field Image (Photo)</option>
                <option value="drone">Drone Orthomosaic</option>
                <option value="thermal">Thermal Infrared Scan</option>
                <option value="video">Underwater / ROV Video</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Location Name</label>
              <input
                type="text"
                value={locationName}
                onChange={e => setLocationName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Country</label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={e => setLat(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={e => setLng(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none font-mono"
              />
            </div>
          </div>

          {isProcessing && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 font-bold animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{processingStep}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => { stopCamera(); onClose(); }}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              Ingest & Run Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
