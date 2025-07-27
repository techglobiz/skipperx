// Enhanced client-side metadata hook for dynamic content
'use client';

import { useEffect } from 'react';

export function useMetadata({ 
  title, 
  description, 
  keywords, 
  image,
  noIndex = false,
  path = '',
  additionalMeta = {} 
}) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://skipperx.com';
    
    // Update title
    if (title) {
      document.title = `${title} | SkipperX`;
    }

    // Update description
    if (description) {
      updateOrCreateMeta('name', 'description', description);
    }

    // Update keywords
    if (keywords) {
      const keywordsString = Array.isArray(keywords) 
        ? keywords.join(', ') 
        : keywords;
      updateOrCreateMeta('name', 'keywords', keywordsString);
    }

    // Update robots
    if (noIndex) {
      updateOrCreateMeta('name', 'robots', 'noindex, nofollow');
    } else {
      updateOrCreateMeta('name', 'robots', 'index, follow');
    }

    // Update canonical URL
    if (path) {
      updateOrCreateLink('canonical', `${baseUrl}${path}`);
    }

    // Update Open Graph tags
    if (title) {
      updateOrCreateMeta('property', 'og:title', `${title} | SkipperX`);
    }
    if (description) {
      updateOrCreateMeta('property', 'og:description', description);
    }
    if (path) {
      updateOrCreateMeta('property', 'og:url', `${baseUrl}${path}`);
    }
    if (image) {
      updateOrCreateMeta('property', 'og:image', `${baseUrl}${image}`);
    }
    updateOrCreateMeta('property', 'og:type', 'website');
    updateOrCreateMeta('property', 'og:site_name', 'SkipperX');

    // Update Twitter Card tags
    if (title) {
      updateOrCreateMeta('name', 'twitter:title', `${title} | SkipperX`);
    }
    if (description) {
      updateOrCreateMeta('name', 'twitter:description', description);
    }
    if (image) {
      updateOrCreateMeta('name', 'twitter:image', `${baseUrl}${image}`);
    }
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:site', '@SkipperX');

    // Additional structured data
    if (additionalMeta.structuredData) {
      updateStructuredData(additionalMeta.structuredData);
    }

  }, [title, description, keywords, image, noIndex, path, additionalMeta]);
}

// Helper function to update or create meta tags
function updateOrCreateMeta(attributeName, attributeValue, content) {
  let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

// Helper function to update or create link tags
function updateOrCreateLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

// Helper function to update structured data
function updateStructuredData(data) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Example usage for search results page
export function useSearchMetadata(searchQuery, resultsCount) {
  useMetadata({
    title: searchQuery 
      ? `Search Results for "${searchQuery}"` 
      : 'Search SkipperX Programs',
    description: searchQuery 
      ? `Found ${resultsCount} results for "${searchQuery}" on SkipperX. Explore our AR/VR, Drone Engineering, and Robotics programs.`
      : 'Search through SkipperX\'s comprehensive tech education programs in AR/VR, Drone Technology, Robotics, and Future Mobility.',
    keywords: searchQuery 
      ? [searchQuery, 'SkipperX', 'search', 'tech education']
      : ['search', 'tech programs', 'AR VR', 'drone engineering', 'robotics'],
    noIndex: true, // Don't index search result pages
    path: searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search',
    additionalMeta: {
      structuredData: {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": searchQuery ? `Search Results for "${searchQuery}"` : "Search",
        "description": "Search results from SkipperX tech education platform",
        "url": `${process.env.NEXT_PUBLIC_API_URL || 'https://skipperx.com'}/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`,
        "numberOfItems": resultsCount
      }
    }
  });
}

// Example usage for course/program pages
export function useProgramMetadata(program) {
  useMetadata({
    title: `${program.name} - ${program.category}`,
    description: `Learn ${program.name} with SkipperX. ${program.description}`,
    keywords: [program.name, program.category, 'SkipperX', 'tech education', ...program.tags],
    image: program.image,
    path: `/programs/${program.slug}`,
    additionalMeta: {
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": program.name,
        "description": program.description,
        "provider": {
          "@type": "Organization",
          "name": "SkipperX",
          "url": "https://skipperx.com"
        },
        "courseCode": program.code,
        "educationalLevel": program.level,
        "timeRequired": program.duration,
        "offers": {
          "@type": "Offer",
          "price": program.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    }
  });
}
