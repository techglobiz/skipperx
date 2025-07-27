import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET single course
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: {
          select: { name: true, slug: true }
        }
      }
    });
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    // Parse JSON strings back to objects
    const formattedCourse = {
      ...course,
      features: course.features ? JSON.parse(course.features) : [],
      curriculum: course.curriculum ? JSON.parse(course.curriculum) : [],
      requirements: course.requirements ? JSON.parse(course.requirements) : []
    };
    
    return NextResponse.json(formattedCourse);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

// PUT update course
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Check if slug already exists for other courses
    const existingCourse = await prisma.course.findFirst({
      where: { 
        slug: data.slug,
        NOT: { id: parseInt(id) }
      }
    });
    
    if (existingCourse) {
      return NextResponse.json({ error: 'Course with this slug already exists' }, { status: 400 });
    }
    
    const course = await prisma.course.update({
      where: { id: parseInt(id) },
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
        isPublished: data.isPublished,
        isFeatured: data.isFeatured,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription
      },
      include: {
        category: {
          select: { name: true, slug: true }
        }
      }
    });
    
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.course.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
