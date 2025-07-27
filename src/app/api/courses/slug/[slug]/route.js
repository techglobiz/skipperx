import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET course by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const course = await prisma.course.findUnique({
      where: { 
        slug,
        isPublished: true
      },
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
