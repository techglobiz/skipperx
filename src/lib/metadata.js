// Utility function to generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  image = '/og-image.jpg',
  noIndex = false,
  additionalMeta = {}
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://skipperx.com';
  const fullTitle = `${title} | SkipperX`;
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords : (keywords ? keywords.split(', ') : []),
    canonical: url,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "SkipperX",
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
      ...additionalMeta.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${baseUrl}${image}`],
      creator: "@SkipperX",
      site: "@SkipperX",
      ...additionalMeta.twitter,
    },
    alternates: {
      canonical: url,
    },
    ...additionalMeta,
  };
}

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: "Future-Ready Tech Education - AR/VR, Drones, Robotics | SkipperX",
    description: "Transform your career with SkipperX's industry-relevant programs in AR/VR, Drone Technology, Robotics & Future Mobility. Project-based learning with real-world applications.",
    keywords: "AR VR education, drone technology courses, robotics training, future mobility, tech education, immersive learning, project-based learning, career transformation",
    path: "",
    image: "/assets/skipperx-hero.jpg"
  },
  about: {
    title: "About SkipperX - Building the Future of Tech Education",
    description: "SkipperX creates industry-relevant programs in AR/VR, Drone Technology, and Robotics. We design immersive, project-based learning experiences with top experts and engineers.",
    keywords: "about SkipperX, tech education platform, AR VR training, drone engineering, robotics education, immersive learning, future tech skills",
    path: "/about",
    image: "/assets/about-skipperx.jpg"
  },
  services: {
    title: "Tech Education Programs - AR/VR, Drones, Robotics | SkipperX",
    description: "Explore SkipperX's comprehensive tech education programs: AR/VR Development, Drone Engineering, Robotics, and Future Mobility. Industry-relevant skills for tomorrow's jobs.",
    keywords: "AR VR courses, drone engineering programs, robotics training, future mobility education, tech skills, immersive technology courses",
    path: "/services",
    image: "/assets/services-programs.jpg"
  },
  "ar-vr": {
    title: "AR/VR Development Program - Immersive Technology Training | SkipperX",
    description: "Master AR/VR development with SkipperX's comprehensive program. Learn immersive technology, virtual reality, augmented reality, and build real-world projects.",
    keywords: "AR VR development, augmented reality training, virtual reality courses, immersive technology, AR VR programming, mixed reality",
    path: "/ar-vr",
    image: "/assets/ar-vr-program.jpg"
  },
  "drone-engineering": {
    title: "Drone Engineering Program - UAV Technology & Applications | SkipperX",
    description: "Become a drone engineer with SkipperX's hands-on program. Learn UAV technology, flight systems, autonomous navigation, and commercial drone applications.",
    keywords: "drone engineering, UAV technology, drone programming, autonomous systems, flight control, commercial drones, drone applications",
    path: "/drone-engineering",
    image: "/assets/drone-engineering.jpg"
  },
  contact: {
    title: "Contact SkipperX - Start Your Tech Education Journey",
    description: "Contact SkipperX to learn about our AR/VR, Drone Engineering, and Robotics programs. Get personalized guidance for your tech education journey.",
    keywords: "contact SkipperX, tech education inquiry, AR VR program info, drone engineering consultation, career guidance",
    path: "/contact",
    image: "/assets/contact-skipperx.jpg"
  },
  testimonials: {
    title: "Student Success Stories - SkipperX Alumni Testimonials",
    description: "Read inspiring success stories from SkipperX alumni who transformed their careers through our AR/VR, Drone Engineering, and Robotics programs.",
    keywords: "SkipperX testimonials, student success stories, career transformation, AR VR success, drone engineering graduates, tech education reviews",
    path: "/testimonials",
    image: "/assets/testimonials.jpg"
  },
  "privacy-policy": {
    title: "Privacy Policy - SkipperX",
    description: "SkipperX privacy policy outlines how we collect, use, and protect your personal information when you use our tech education platform.",
    keywords: "SkipperX privacy policy, data protection, personal information, privacy rights",
    path: "/privacy-policy",
    noIndex: true
  },
  "terms-and-conditions": {
    title: "Terms and Conditions - SkipperX",
    description: "SkipperX terms and conditions for using our tech education platform, programs, and services.",
    keywords: "SkipperX terms, conditions of use, platform terms, education services terms",
    path: "/terms-and-conditions",
    noIndex: true
  },
  "refund-policy": {
    title: "Refund Policy - SkipperX",
    description: "SkipperX refund policy for our tech education programs and courses. Learn about our refund terms and conditions.",
    keywords: "SkipperX refund policy, course refund, program cancellation, refund terms",
    path: "/refund-policy",
    noIndex: true
  },
  login: {
    title: "Admin Login - SkipperX Dashboard",
    description: "Secure admin login portal for SkipperX dashboard. Access your admin panel to manage content, programs, and website settings.",
    keywords: "admin login, dashboard access, secure portal, content management, SkipperX admin",
    path: "/login",
    noIndex: true
  },
};
