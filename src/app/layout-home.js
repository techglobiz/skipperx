import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

// Generate metadata for homepage
export const metadata = generatePageMetadata(pageMetadata.home);

export default function RootLayout({ children }) {
  return children;
}
