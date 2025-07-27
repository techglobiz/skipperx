import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all course categories
export async function GET() {
  try {
    const categories = await prisma.courseCategory.findMany({
      include: {
        courses: {
          where: { isPublished: true },
          select: { id: true }
        }
      },
      orderBy: { name: 'asc' }
    });
    
    // Add course count to each category
    const categoriesWithCount = categories.map(category => ({
      ...category,
      courseCount: category.courses.length,
      courses: undefined // Remove courses array from response
    }));
    
    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST create new category
export async function POST(request) {
  try {
    const { name, description, image, slug } = await request.json();
    
    // Check if slug already exists
    const existingCategory = await prisma.courseCategory.findUnique({
      where: { slug }
    });
    
    if (existingCategory) {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 });
    }
    
    const category = await prisma.courseCategory.create({
      data: {
        name,
        description,
        image,
        slug
      }
    });
    
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
