import { MediaAsset, ESGProject, ImpactStory } from '@/types';
import { generateCloudinaryTransformations } from '@/services/cloudinaryService';

export const INITIAL_PROJECTS: ESGProject[] = [
  {
    id: 'proj-1',
    name: 'Amazon Rainforest Canopy Restoration',
    category: 'Reforestation',
    description: 'Autonomous drone tracking and AI computer vision monitoring canopy growth, biomass accumulation, and biodiversity density in Manaus sector.',
    location: { lat: -3.119, lng: -60.0217, locationName: 'Manaus, Amazonas', country: 'Brazil' },
    startDate: '2025-01-15',
    targetCO2Tons: 1250,
    currentCO2Tons: 842.5,
    totalMediaCount: 42,
    trustRating: 98,
    status: 'Verified',
    leadOrg: 'BioShield Amazonia Foundation',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-2',
    name: 'Pacific Barrier Reef & Ocean Cleanup',
    category: 'Ocean Cleanup',
    description: 'Satellite & drone media intelligence tagging floating microplastic concentrations and verifying automated barrier collection yields.',
    location: { lat: 21.3069, lng: -157.8583, locationName: 'Oahu Marine Zone', country: 'United States' },
    startDate: '2025-03-01',
    targetCO2Tons: 500,
    currentCO2Tons: 390.2,
    totalMediaCount: 28,
    trustRating: 96,
    status: 'Active',
    leadOrg: 'CleanOcean Robotics Alliance',
    heroImage: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-3',
    name: 'Thar Desert Microgrid & Solar Expansion',
    category: 'Solar Energy',
    description: 'Photovoltaic cluster thermal analysis and automated dust-occlusion inspection via high-altitude aerial imagery.',
    location: { lat: 26.9157, lng: 70.9083, locationName: 'Jaisalmer, Rajasthan', country: 'India' },
    startDate: '2024-11-20',
    targetCO2Tons: 3000,
    currentCO2Tons: 2410.0,
    totalMediaCount: 56,
    trustRating: 99,
    status: 'Verified',
    leadOrg: 'SuryaVanguard Energy',
    heroImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-4',
    name: 'Sundarbans Mangrove Bio-Shield',
    category: 'Biodiversity Protection',
    description: 'Coastal tidal wetland monitoring using thermal drone media and Cloudinary AI spectral foliage index verification.',
    location: { lat: 21.9497, lng: 88.9224, locationName: 'Sundarbans Biosphere', country: 'India' },
    startDate: '2025-02-10',
    targetCO2Tons: 850,
    currentCO2Tons: 615.8,
    totalMediaCount: 35,
    trustRating: 97,
    status: 'Active',
    leadOrg: 'Delta Guard International',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'media-101',
    title: 'Manaus Sector A4 - Dense Canopy Orthomosaic',
    description: 'High-resolution aerial drone capture showing native hardwood tree canopy regeneration after 12 months of restoration.',
    projectId: 'proj-1',
    projectName: 'Amazon Rainforest Canopy Restoration',
    category: 'Reforestation',
    uploadDate: '2026-09-10',
    coordinates: { lat: -3.119, lng: -60.0217, locationName: 'Sector A4, Manaus', country: 'Brazil' },
    originalUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    cloudinaryPublicId: 'amazon_canopy_sector_a4',
    cloudinaryTransformations: generateCloudinaryTransformations('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80'),
    mediaType: 'drone',
    author: 'Dr. Elena Rostova',
    authorRole: 'Chief Environmental Scientist',
    aiAnalysis: {
      canopyDensityPercent: 88.4,
      healthScore: 94,
      trustScore: 99,
      exifVerified: true,
      satelliteLocationMatch: true,
      detectedObjects: ['Dense Hardwood Canopy', 'Biomass Foliage', 'Natural Moisture Retention', 'Zero Deforestation Index'],
      summary: 'Computer vision analysis verifies 88.4% foliage closure with zero sign of illegal logging within 5km radius.',
      co2OffsetTons: 42.8,
      greenwashingRisk: 'Low'
    },
    exif: {
      device: 'DJI Matrice 300 RTK',
      exposure: '1/1250s at f/2.8',
      iso: '100',
      capturedAt: '2026-09-10 09:42:15 UTC',
      checksum: 'sha256:8f43a9b1c0e294...'
    },
    tags: ['Drone', 'Canopy', 'Amazon', 'Verified', 'High Density'],
    beforeAfterPairId: 'pair-amazon-1',
    beforeAfterTimestamp: 'after'
  },
  {
    id: 'media-102',
    title: 'Manaus Sector A4 - Baseline Deforested Grid (Month 1)',
    description: 'Baseline field photo taken during initial ground zero survey prior to sapling planting.',
    projectId: 'proj-1',
    projectName: 'Amazon Rainforest Canopy Restoration',
    category: 'Reforestation',
    uploadDate: '2025-01-20',
    coordinates: { lat: -3.119, lng: -60.0217, locationName: 'Sector A4, Manaus', country: 'Brazil' },
    originalUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    cloudinaryPublicId: 'amazon_baseline_month1',
    cloudinaryTransformations: generateCloudinaryTransformations('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'),
    mediaType: 'image',
    author: 'Dr. Elena Rostova',
    authorRole: 'Chief Environmental Scientist',
    aiAnalysis: {
      canopyDensityPercent: 12.1,
      healthScore: 45,
      trustScore: 97,
      exifVerified: true,
      satelliteLocationMatch: true,
      detectedObjects: ['Degraded Soil', 'Sparse Sapling Grid', 'Exposed Substrate'],
      summary: 'Baseline image shows severely degraded soil structure requiring active bio-char enrichment.',
      co2OffsetTons: 2.1,
      greenwashingRisk: 'Low'
    },
    exif: {
      device: 'Sony Alpha 7 IV',
      exposure: '1/500s at f/4.0',
      iso: '200',
      capturedAt: '2025-01-20 14:15:00 UTC',
      checksum: 'sha256:1a82d093e44b...'
    },
    tags: ['Baseline', 'Before', 'Ground Survey'],
    beforeAfterPairId: 'pair-amazon-1',
    beforeAfterTimestamp: 'before'
  },
  {
    id: 'media-103',
    title: 'Oahu Barrier Net 3 - Plastic Interception',
    description: 'Underwater ROV footage snapshot of macro-plastic debris intercepted before entering fragile coral lagoon ecosystem.',
    projectId: 'proj-2',
    projectName: 'Pacific Barrier Reef & Ocean Cleanup',
    category: 'Ocean Cleanup',
    uploadDate: '2026-09-18',
    coordinates: { lat: 21.3069, lng: -157.8583, locationName: 'Oahu Marine Zone', country: 'United States' },
    originalUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80',
    cloudinaryPublicId: 'oahu_barrier_net_3',
    cloudinaryTransformations: generateCloudinaryTransformations('https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80'),
    mediaType: 'image',
    author: 'Captain Marcus Vance',
    authorRole: 'Operations Director',
    aiAnalysis: {
      wasteDetectedKg: 420,
      healthScore: 91,
      trustScore: 98,
      exifVerified: true,
      satelliteLocationMatch: true,
      detectedObjects: ['HDPE Container', 'Ghost Fishing Net', 'Polymer Micro-Fragments', 'Clear Water Barrier'],
      summary: 'AI object counter detected approximately 420kg of synthetic debris in barrier trap cluster.',
      co2OffsetTons: 18.4,
      greenwashingRisk: 'Low'
    },
    exif: {
      device: 'GoPro Hero 12 Black',
      exposure: '1/800s at f/2.8',
      iso: '100',
      capturedAt: '2026-09-18 11:20:44 UTC',
      checksum: 'sha256:92cb71a4f009...'
    },
    tags: ['Ocean', 'Plastic Removal', 'Barrier Net', 'ROV']
  },
  {
    id: 'media-104',
    title: 'Jaisalmer Array B - Photovoltaic Efficiency Inspection',
    description: 'Thermal infrared aerial image analyzing solar module surface temperature uniformity and dust accumulation.',
    projectId: 'proj-3',
    projectName: 'Thar Desert Microgrid & Solar Expansion',
    category: 'Solar Energy',
    uploadDate: '2026-09-21',
    coordinates: { lat: 26.9157, lng: 70.9083, locationName: 'Jaisalmer Cluster B', country: 'India' },
    originalUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    cloudinaryPublicId: 'jaisalmer_solar_array_b',
    cloudinaryTransformations: generateCloudinaryTransformations('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'),
    mediaType: 'thermal',
    author: 'Aarav Sharma',
    authorRole: 'Lead Renewable Engineer',
    aiAnalysis: {
      solarPanelCount: 144,
      healthScore: 97,
      trustScore: 100,
      exifVerified: true,
      satelliteLocationMatch: true,
      detectedObjects: ['Monocrystalline PV Module', 'Zero Hotspot Anomalies', 'Uniform Thermal Gradient'],
      summary: 'Thermal AI scan detects 100% operational module connectivity with optimal 24.2% cell conversion rate.',
      co2OffsetTons: 64.2,
      greenwashingRisk: 'Low'
    },
    exif: {
      device: 'FLIR Zenmuse H20T Thermal',
      exposure: '1/2000s',
      iso: '100',
      capturedAt: '2026-09-21 07:10:00 UTC',
      checksum: 'sha256:77fa8901ccb...'
    },
    tags: ['Solar', 'Thermal', 'Renewable', 'India', 'Clean Energy']
  },
  {
    id: 'media-105',
    title: 'Sundarbans Tidal Zone 2 - Mangrove Bio-Barrier',
    description: 'Field photo of newly established mangrove prop-root matrix preventing coastal erosion and absorbing storm surges.',
    projectId: 'proj-4',
    projectName: 'Sundarbans Mangrove Bio-Shield',
    category: 'Biodiversity Protection',
    uploadDate: '2026-09-22',
    coordinates: { lat: 21.9497, lng: 88.9224, locationName: 'Zone 2, Sundarbans', country: 'India' },
    originalUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    cloudinaryPublicId: 'sundarbans_mangrove_zone2',
    cloudinaryTransformations: generateCloudinaryTransformations('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'),
    mediaType: 'image',
    author: 'Priya Banerjee',
    authorRole: 'Eco-System Auditor',
    aiAnalysis: {
      canopyDensityPercent: 76.2,
      healthScore: 89,
      trustScore: 96,
      exifVerified: true,
      satelliteLocationMatch: true,
      detectedObjects: ['Rhizophora Mangrove Root', 'Silt Accumulation Layer', 'Benthic Ecosystem'],
      summary: 'Root density analysis reveals 3.4x soil retention increase compared to un-vegetated mudflats.',
      co2OffsetTons: 29.5,
      greenwashingRisk: 'Low'
    },
    exif: {
      device: 'Canon EOS R5',
      exposure: '1/400s at f/5.6',
      iso: '100',
      capturedAt: '2026-09-22 10:05:33 UTC',
      checksum: 'sha256:33bd9021a8...'
    },
    tags: ['Mangrove', 'Sundarbans', 'Coastal Shield', 'Bio-Protection']
  }
];

export const INITIAL_IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'story-1',
    projectId: 'proj-1',
    projectName: 'Amazon Rainforest Canopy Restoration',
    title: 'Restoring 450 Hectares of Primary Amazonian Hardwood Canopy',
    executiveSummary: 'Leveraging Cloudinary automated visual media pipelines and AI multi-spectral drone imagery, the BioShield Amazonia team has verified 842.5 tons of carbon sequestration while documenting an 88.4% foliage density recovery across Sector A4.',
    keyAchievements: [
      'Verified 842.5 Metric Tons of CO2 atmospheric removal.',
      'Deployed Cloudinary AI image optimization for low-bandwidth satellite upload nodes.',
      'Cryptographically verified 42 high-resolution drone field captures against ground GPS.',
      'Achieved zero greenwashing risk score audited by automated computer vision.'
    ],
    co2ImpactTotal: 842.5,
    communityBeneficiaries: 1200,
    areaRestoredHectares: 450,
    verifiedMediaIds: ['media-101', 'media-102'],
    author: 'Dr. Elena Rostova',
    publishedDate: '2026-09-23'
  }
];
