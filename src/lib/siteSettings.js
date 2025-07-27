import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma client for this module
const prisma = globalThis.siteSettingsPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.siteSettingsPrisma = prisma;

// Cache for site settings to avoid frequent database calls
let cachedSettings = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getSiteSettings() {
  const now = Date.now();
  
  // Return cached settings if they're still fresh
  if (cachedSettings && (now - lastFetch) < CACHE_DURATION) {
    return cachedSettings;
  }

  try {
    // Ensure prisma is available
    if (!prisma || !prisma.siteSettings) {
      console.warn('Prisma client not available, returning default settings');
      return getDefaultSettings();
    }

    let settings = await prisma.siteSettings.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    // If no settings exist, return default settings
    if (!settings) {
      settings = getDefaultSettings();
    }

    // Parse social links if it's a string
    if (typeof settings.socialLinks === 'string') {
      try {
        settings.socialLinks = JSON.parse(settings.socialLinks);
      } catch {
        settings.socialLinks = {};
      }
    }

    // Update cache
    cachedSettings = settings;
    lastFetch = now;

    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    
    // Return default settings on error
    return getDefaultSettings();
  }
}

function getDefaultSettings() {
  return {
    siteTitle: "SkipperX",
    siteDescription: "Future-ready tech education platform offering industry-relevant programs in AR/VR, Drone Technology, Robotics & Future Mobility",
    metaTitle: "SkipperX - Future-Ready Tech Education in AR/VR, Drones & Robotics",
    metaDescription: "Transform your career with SkipperX's industry-relevant programs in AR/VR, Drone Technology, Robotics & Future Mobility. Project-based learning with real-world applications.",
    keywords: "AR VR education, drone technology courses, robotics training, future mobility, tech education, immersive learning, project-based learning, career transformation",
    ogTitle: "SkipperX - Future-Ready Tech Education in AR/VR, Drones & Robotics",
    ogDescription: "Transform your career with SkipperX's industry-relevant programs in AR/VR, Drone Technology, Robotics & Future Mobility. Project-based learning with real-world applications.",
    ogImage: "/assets/skipperx-og-image.jpg",
    twitterTitle: "SkipperX - Future-Ready Tech Education in AR/VR, Drones & Robotics",
    twitterDescription: "Transform your career with SkipperX's industry-relevant programs in AR/VR, Drone Technology, Robotics & Future Mobility.",
    twitterImage: "/assets/skipperx-twitter-image.jpg",
    contactEmail: "info@skipperx.com",
    contactPhone: "+91-9876543210",
    socialLinks: {
      linkedin: "https://linkedin.com/company/skipperx",
      twitter: "https://twitter.com/skipperx",
      facebook: "https://facebook.com/skipperx",
      instagram: "https://instagram.com/skipperx"
    }
  };
}

export function clearSiteSettingsCache() {
  cachedSettings = null;
  lastFetch = 0;
}
