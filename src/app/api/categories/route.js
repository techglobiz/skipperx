import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/upload';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('❌ GET Categories Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch categories' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const imageFile = formData.get('image');

    if (!name || !name.trim()) {
      return NextResponse.json({ 
        error: 'Category name is required' 
      }, { status: 400 });
    }

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadFile(imageFile);
    }

    const newCategory = await prisma.category.create({
      data: { 
        name: name.trim(),
        image: imagePath 
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('❌ POST Category Error:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'Category name already exists' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create category' 
    }, { status: 500 });
  }
}
