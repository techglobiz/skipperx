import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to fetch published pages directly from database
async function getPublishedPages() {
  try {
    const pages = await prisma.page.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return pages;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export default async function DynamicPagesMenu() {
  const pages = await getPublishedPages();
  
  if (pages.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-brand py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="text-sm font-medium text-white">Pages:</span>
          {pages.map((page) => (
            <Link 
              key={page.id} 
              href={`/${page.slug}`}
              className="text-sm text-white hover:text-gray-200 hover:underline"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
