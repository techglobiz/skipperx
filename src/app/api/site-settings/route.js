import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { clearSiteSettingsCache } from '@/lib/siteSettings';

const prisma = globalThis.apiSiteSettingsPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.apiSiteSettingsPrisma = prisma;

// GET site settings
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    // If no settings exist, create default ones
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
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
          socialLinks: JSON.stringify({
            linkedin: "https://linkedin.com/company/skipperx",
            twitter: "https://twitter.com/skipperx",
            facebook: "https://facebook.com/skipperx",
            instagram: "https://instagram.com/skipperx"
          }),
          isActive: true
        }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

// POST/PUT update site settings
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Deactivate existing settings
    await prisma.siteSettings.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    });

    // Create new settings
    const settings = await prisma.siteSettings.create({
      data: {
        ...data,
        isActive: true
      }
    });

    // Clear cache to force fresh data on next request
    clearSiteSettingsCache();

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}

// PUT update existing settings
export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const settings = await prisma.siteSettings.update({
      where: { id },
      data: updateData
    });

    // Clear cache to force fresh data on next request
    clearSiteSettingsCache();

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
