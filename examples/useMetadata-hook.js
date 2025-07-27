// Custom hook for client-side metadata updates
// File: src/hooks/useMetadata.js

import { useEffect } from 'react';

export function useMetadata({ title, description, keywords, noIndex = false }) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      const keywordsString = Array.isArray(keywords) 
        ? keywords.join(', ') 
        : keywords;
      metaKeywords.setAttribute('content', keywordsString);
    }

    // Update robots
    if (noIndex) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.name = 'robots';
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }

    // Cleanup function to restore original metadata if needed
    return () => {
      // Optionally restore original values
    };
  }, [title, description, keywords, noIndex]);
}

// Example usage in a component:
/*
import { useMetadata } from '@/hooks/useMetadata';

function MyComponent({ userData }) {
  useMetadata({
    title: `${userData.name} - User Profile | MyCo`,
    description: `View ${userData.name}'s profile and information.`,
    keywords: ['user profile', 'member', userData.name],
    noIndex: true,
  });

  return <div>User content...</div>;
}
*/
