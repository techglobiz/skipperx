import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clearSiteSettingsCache } from '@/lib/siteSettings';

export async function POST() {
  try {
    // Clear the site settings cache
    clearSiteSettingsCache();
    
    // Revalidate the home page and layout to refresh metadata
    revalidatePath('/');
    revalidatePath('/layout');
    
    return NextResponse.json({ message: 'Metadata revalidated successfully' });
  } catch (error) {
    console.error('Failed to revalidate metadata:', error);
    return NextResponse.json({ error: 'Failed to revalidate metadata' }, { status: 500 });
  }
}
