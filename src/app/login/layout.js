import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

// Generate metadata using the utility
export const metadata = generatePageMetadata({
  ...pageMetadata.login,
  robots: {
    index: false, // Don't index login pages
    follow: false,
  },
});

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
