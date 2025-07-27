import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single page
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

// PUT update page
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, slug, content, metaTitle, metaDescription, isPublished } = await request.json();
    
    // Check if slug already exists for other pages
    const existingPage = await prisma.page.findFirst({
      where: { 
        slug,
        NOT: { id: parseInt(id) }
      }
    });
    
    if (existingPage) {
      return NextResponse.json({ error: 'Page with this slug already exists' }, { status: 400 });
    }
    
    const page = await prisma.page.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        content,
        metaTitle,
        metaDescription,
        isPublished
      }
    });
    
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

// DELETE page
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.page.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
