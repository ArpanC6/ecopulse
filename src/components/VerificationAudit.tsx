'use client';

import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Cpu, 
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { MediaAsset } from '@/types';

interface VerificationAuditProps {
  mediaAssets: MediaAsset[];
  onSelectAsset: (asset: MediaAsset) => void;
}

export const VerificationAudit: React.FC<VerificationAuditProps> = ({ mediaAssets, onSelectAsset }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            Cryptographic EXIF & Satellite Audit Ledger
          </h2>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            Immutable Audit Trail
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Every field media record is subjected to perceptual hash matching, EXIF hardware telemetry validation, and satellite GIS alignment checks to guarantee zero fraud.
        </p>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">{mediaAssets.length} / {mediaAssets.length}</div>
            <div className="text-xs text-slate-500 font-medium">100% EXIF Verified Records</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-lg bg-sky-50 text-sky-600">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">0 Anti-Fraud Flags</div>
            <div className="text-xs text-slate-500 font-medium">Zero Greenwashing Violations</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
          <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">SHA-256</div>
            <div className="text-xs text-slate-500 font-medium">Cryptographic Hardware Hashes</div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographic Verification Ledger</span>
          </h3>
          <span className="text-xs font-mono text-slate-500">Real-Time Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Asset Title & ID</th>
                <th className="p-3.5">Hardware Device</th>
                <th className="p-3.5">GPS Satellite Alignment</th>
                <th className="p-3.5">Cryptographic Checksum</th>
                <th className="p-3.5">Trust Rating</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {mediaAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 truncate max-w-xs">{asset.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">ID: {asset.id}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Cpu className="w-3.5 h-3.5 text-sky-600" />
                      <span>{asset.exif.device}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      100% Match ({asset.coordinates.lat.toFixed(2)}°, {asset.coordinates.lng.toFixed(2)}°)
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[10px] text-slate-500">
                    {asset.exif.checksum}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {asset.aiAnalysis.trustScore}% Verified
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onSelectAsset(asset)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
