'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClientDynamicPagesMenu() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch('/api/pages');
        if (res.ok) {
          const data = await res.json();
          setPages(data.filter(page => page.isPublished));
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading || pages.length === 0) {
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
