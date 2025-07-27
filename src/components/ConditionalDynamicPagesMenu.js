import { headers } from 'next/headers';
import DynamicPagesMenu from './DynamicPagesMenu';

export default async function ConditionalDynamicPagesMenu() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Don't show on admin pages or login page
  if (pathname.startsWith('/admin') || pathname === '/login') {
    return null;
  }
  
  return <DynamicPagesMenu />;
}
