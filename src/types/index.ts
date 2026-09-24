export type ProjectCategory = 
  | 'Reforestation'
  | 'Ocean Cleanup'
  | 'Solar Energy'
  | 'Urban Recycling'
  | 'Disaster Relief'
  | 'Biodiversity Protection';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  locationName: string;
  country: string;
}

export interface CloudinaryTransformation {
  type: 'raw' | 'smart_crop' | 'ai_enhance' | 'background_removed' | 'verified_watermark' | 'thermal_overlay';
  url: string;
  label: string;
}

export interface AIAnalysisResult {
  canopyDensityPercent?: number;
  wasteDetectedKg?: number;
  solarPanelCount?: number;
  healthScore: number; // 0 - 100
  trustScore: number; // 0 - 100
  exifVerified: boolean;
  satelliteLocationMatch: boolean;
  detectedObjects: string[];
  summary: string;
  co2OffsetTons: number;
  greenwashingRisk: 'Low' | 'Medium' | 'High';
}

export interface MediaAsset {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  category: ProjectCategory;
  uploadDate: string; // ISO format or formatted string
  coordinates: LocationCoordinates;
  originalUrl: string;
  cloudinaryPublicId: string;
  cloudinaryTransformations: CloudinaryTransformation[];
  mediaType: 'image' | 'video' | 'drone' | 'thermal';
  author: string;
  authorRole: string;
  aiAnalysis: AIAnalysisResult;
  exif: {
    device: string;
    exposure: string;
    iso: string;
    capturedAt: string;
    checksum: string;
  };
  tags: string[];
  beforeAfterPairId?: string;
  beforeAfterTimestamp?: 'before' | 'after';
}

export interface ESGProject {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  location: LocationCoordinates;
  startDate: string;
  targetCO2Tons: number;
  currentCO2Tons: number;
  totalMediaCount: number;
  trustRating: number; // percentage
  status: 'Active' | 'Verified' | 'Under Audit';
  leadOrg: string;
  heroImage: string;
}

export interface ImpactStory {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  executiveSummary: string;
  keyAchievements: string[];
  co2ImpactTotal: number;
  communityBeneficiaries: number;
  areaRestoredHectares: number;
  verifiedMediaIds: string[];
  author: string;
  publishedDate: string;
  pdfUrl?: string;
}
