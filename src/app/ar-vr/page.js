import { generatePageMetadata, pageMetadata } from '@/lib/metadata';
import React from 'react';
import './page.css';
import ARVREngineering from '@/components/arvr/ARVREngineering';

// Generate metadata for this page
export async function generateMetadata() {
  return generatePageMetadata(pageMetadata['ar-vr']);
}

const ARVRPage = () => {
  return (
    <>
      <ARVREngineering />
    </>
  );
};

export default ARVRPage;