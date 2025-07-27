// Example: Dynamic metadata for a blog post or product page
// File: src/app/blog/[slug]/page.js

import { generatePageMetadata } from '@/lib/metadata';
import { prisma } from '@/lib/prisma';

// Dynamic metadata generation based on blog post data
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // Fetch blog post data from database
  const post = await prisma.page.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: 'Post Not Found | MyCo',
      description: 'The requested blog post could not be found.',
    };
  }

  // Generate metadata using the utility
  return generatePageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.content.substring(0, 160),
    keywords: post.keywords || 'blog, article, MyCo',
    path: `/blog/${slug}`,
    image: post.image || '/default-blog-image.jpg',
  });
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const post = await prisma.page.findUnique({
    where: { slug },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Generate static params for all blog posts (optional, for static generation)
export async function generateStaticParams() {
  const posts = await prisma.page.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
