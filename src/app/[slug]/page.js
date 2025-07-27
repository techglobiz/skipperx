import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { generatePageMetadata } from '@/lib/metadata';

const prisma = new PrismaClient();

// Dynamic metadata generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const page = await prisma.page.findUnique({
      where: { slug, isPublished: true },
    });

    if (!page) {
      return {
        title: 'Page Not Found | SkipperX',
        description: 'The requested page could not be found.',
      };
    }

    return generatePageMetadata({
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      keywords: page.keywords || `${page.title}, SkipperX, tech education`,
      path: `/${slug}`,
      additionalMeta: {
        openGraph: {
          type: 'article',
          publishedTime: page.createdAt.toISOString(),
          modifiedTime: page.updatedAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error | SkipperX',
      description: 'An error occurred while loading this page.',
    };
  }
}

// Function to fetch page data directly from database
async function getPageData(slug) {
  try {
    const page = await prisma.page.findUnique({
      where: { 
        slug,
        isPublished: true
      }
    });
    
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = await getPageData(slug);
  
  if (!page) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {page.title}
            </h1>
            <div className="text-sm text-gray-500">
              Published on {new Date(page.createdAt).toLocaleDateString()}
              {page.updatedAt !== page.createdAt && (
                <span> • Updated {new Date(page.updatedAt).toLocaleDateString()}</span>
              )}
            </div>
          </header>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </div>
    </div>
  );
}
