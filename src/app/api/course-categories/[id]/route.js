import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single category
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const category = await prisma.courseCategory.findUnique({
      where: { id: parseInt(id) },
      include: {
        courses: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// PUT update category
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, description, image, slug, isActive } = await request.json();
    
    // Check if slug already exists for other categories
    const existingCategory = await prisma.courseCategory.findFirst({
      where: { 
        slug,
        NOT: { id: parseInt(id) }
      }
    });
    
    if (existingCategory) {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 });
    }
    
    const category = await prisma.courseCategory.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        image,
        slug,
        isActive
      }
    });
    
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Check if category has courses
    const courseCount = await prisma.course.count({
      where: { categoryId: parseInt(id) }
    });
    
    if (courseCount > 0) {
      return NextResponse.json({ error: 'Cannot delete category with courses' }, { status: 400 });
    }
    
    await prisma.courseCategory.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
