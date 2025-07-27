import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET page by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const page = await prisma.page.findUnique({
      where: { 
        slug,
        isPublished: true // Only return published pages
      }
    });
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}
