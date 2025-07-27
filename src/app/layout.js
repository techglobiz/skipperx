import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import ErrorBoundary from "@/components/ErrorBoundary";
import Script from "next/script";
import { getSiteSettings } from "@/lib/siteSettings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Generate dynamic metadata
export async function generateMetadata() {
  const settings = await getSiteSettings();
  
  // Split keywords string into array
  const keywordsArray = settings.keywords ? 
    settings.keywords.split(',').map(k => k.trim()) : 
    ["AR VR education", "drone technology courses", "robotics training", "future mobility", "tech education"];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'https://skipperx.com'),
    title: {
      default: settings.metaTitle || settings.siteTitle,
      template: `%s | ${settings.siteTitle}`
    },
    description: settings.metaDescription || settings.siteDescription,
    keywords: keywordsArray,
    authors: [{ name: "SkipperX Team" }],
    creator: settings.siteTitle,
    publisher: settings.siteTitle,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_API_URL || 'https://skipperx.com',
      title: settings.ogTitle || settings.metaTitle || settings.siteTitle,
      description: settings.ogDescription || settings.metaDescription || settings.siteDescription,
      siteName: settings.siteTitle,
      images: [
        {
          url: settings.ogImage || "/assets/skipperx-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${settings.siteTitle} - Future-Ready Tech Education Platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.twitterTitle || settings.metaTitle || settings.siteTitle,
      description: settings.twitterDescription || settings.metaDescription || settings.siteDescription,
      images: [settings.twitterImage || "/assets/skipperx-twitter-image.jpg"],
      creator: "@SkipperX",
      site: "@SkipperX",
    },
    verification: {
      google: 'your-google-verification-code',
      // Add other verification codes as needed
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": settings.siteTitle,
    "description": settings.siteDescription,
    "url": process.env.NEXT_PUBLIC_API_URL || "https://skipperx.com",
    "logo": `${process.env.NEXT_PUBLIC_API_URL || "https://skipperx.com"}/assets/skipperx-logo.png`,
    "sameAs": Object.values(settings.socialLinks || {}),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings.contactPhone || "+91-9876543210",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Educational Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "AR/VR Development",
            "description": "Professional AR/VR development and immersive technology training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Drone Technology",
            "description": "Comprehensive drone technology and aerial robotics courses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Robotics Training",
            "description": "Advanced robotics and automation technology programs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Future Mobility",
            "description": "Next-generation transportation and mobility solutions training"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://myco.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <Script src="https://cdn.tailwindcss.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: 'Inter, sans-serif', scrollBehavior: 'smooth' }}
      >
        <ErrorBoundary>
          <ConditionalNavbar />
          {children}
          <ConditionalFooter />
        </ErrorBoundary>
      </body>
    </html>


 
    
    
  );
}
