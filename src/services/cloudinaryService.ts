import { CloudinaryTransformation } from '@/types';

// Default Cloudinary Cloud Name (uses official Cloudinary demo account or env variable)
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

/**
 * Builds a Cloudinary URL with applied image/video transformations
 */
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  transformation: 'raw' | 'smart_crop' | 'ai_enhance' | 'background_removed' | 'verified_watermark' | 'thermal_overlay'
): string {
  // If it's already a full HTTP URL not hosted on Cloudinary, wrap via Cloudinary fetch format
  let publicId = publicIdOrUrl;
  
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    if (publicIdOrUrl.includes('res.cloudinary.com')) {
      // Extract public ID if possible
      const parts = publicIdOrUrl.split('/upload/');
      if (parts.length > 1) {
        // Strip out existing transformations if present
        const subParts = parts[1].split('/');
        publicId = subParts.slice(subParts.length - 1).join('/');
      } else {
        return publicIdOrUrl;
      }
    } else {
      // Use Cloudinary fetch API
      publicId = encodeURIComponent(publicIdOrUrl);
    }
  }

  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image`;

  switch (transformation) {
    case 'smart_crop':
      return `${baseUrl}/upload/c_fill,g_auto,w_800,h_600,q_auto,f_auto/${publicId}`;
    case 'ai_enhance':
      return `${baseUrl}/upload/e_improve:outdoor:30,e_sharpen:100,q_auto,f_auto/${publicId}`;
    case 'background_removed':
      return `${baseUrl}/upload/e_background_removal,q_auto,f_auto/${publicId}`;
    case 'verified_watermark':
      return `${baseUrl}/upload/l_text:Inter_20_bold:VERIFIED%20ECOPULSE%20PROOF,g_south_east,x_20,y_20,co_rgb:10b981,b_rgb:064e3b_80,p_10,q_auto,f_auto/${publicId}`;
    case 'thermal_overlay':
      return `${baseUrl}/upload/e_tint:equal:100:green:00ff66:blue:0033cc,q_auto,f_auto/${publicId}`;
    case 'raw':
    default:
      return publicIdOrUrl.startsWith('http') 
        ? publicIdOrUrl 
        : `${baseUrl}/upload/q_auto,f_auto/${publicId}`;
  }
}

/**
 * Returns a complete suite of Cloudinary transformations for a media asset
 */
export function generateCloudinaryTransformations(publicIdOrUrl: string): CloudinaryTransformation[] {
  return [
    {
      type: 'raw',
      label: 'Original Source',
      url: buildCloudinaryUrl(publicIdOrUrl, 'raw')
    },
    {
      type: 'ai_enhance',
      label: 'Cloudinary AI Auto-Enhanced',
      url: buildCloudinaryUrl(publicIdOrUrl, 'ai_enhance')
    },
    {
      type: 'smart_crop',
      label: 'Cloudinary Smart Focus (800x600)',
      url: buildCloudinaryUrl(publicIdOrUrl, 'smart_crop')
    },
    {
      type: 'verified_watermark',
      label: 'Verified Audit Badge Overlay',
      url: buildCloudinaryUrl(publicIdOrUrl, 'verified_watermark')
    },
    {
      type: 'thermal_overlay',
      label: 'Spectral Canopy Analysis',
      url: buildCloudinaryUrl(publicIdOrUrl, 'thermal_overlay')
    }
  ];
}
