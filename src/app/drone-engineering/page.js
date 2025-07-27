import { generatePageMetadata, pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import ClientDynamicPagesMenu from '@/components/ClientDynamicPagesMenu';
import DroneEngineering from '@/components/drone/DroneEngineering';

// Generate metadata for this page
export async function generateMetadata() {
  return generatePageMetadata(pageMetadata['drone-engineering']);
}

export default function DroneEngineeringPage() {
  return (
    <>
      <DroneEngineering />
    </>
  );
}
