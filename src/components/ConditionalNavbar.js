'use client';

import { usePathname } from 'next/navigation';
import FrontendNavbar from './FrontendNavbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show frontend navbar on admin pages or login page
  if (pathname === '/login' || pathname.startsWith('/admin')) {
    return null;
  }
  
  return <FrontendNavbar />;
}
