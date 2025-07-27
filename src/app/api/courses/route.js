import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all courses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    
    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (featured === 'true') where.isFeatured = true;
    
    const courses = await prisma.course.findMany({
      where,
      include: {
        category: {
          select: { name: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    });
    
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST create new course
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Check if slug already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug: data.slug }
    });
    
    if (existingCourse) {
      return NextResponse.json({ error: 'Course with this slug already exists' }, { status: 400 });
    }
    
    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        image: data.image,
        price: parseFloat(data.price),
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
        duration: data.duration,
        level: data.level,
        instructor: data.instructor,
        features: data.features ? JSON.stringify(data.features) : null,
        curriculum: data.curriculum ? JSON.stringify(data.curriculum) : null,
        requirements: data.requirements ? JSON.stringify(data.requirements) : null,
        categoryId: parseInt(data.categoryId),
        isPublished: data.isPublished || false,
        isFeatured: data.isFeatured || false,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription
      },
      include: {
        category: {
          select: { name: true, slug: true }
        }
      }
    });
    
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
