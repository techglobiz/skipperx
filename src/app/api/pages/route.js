import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all pages
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

// POST create new page
export async function POST(request) {
  try {
    const { title, slug, content, metaTitle, metaDescription, isPublished } = await request.json();
    
    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug }
    });
    
    if (existingPage) {
      return NextResponse.json({ error: 'Page with this slug already exists' }, { status: 400 });
    }
    
    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        metaTitle,
        metaDescription,
        isPublished: isPublished || false
      }
    });
    
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
