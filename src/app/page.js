'use client';

import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ClientDynamicPagesMenu from '@/components/ClientDynamicPagesMenu';
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import EngineeringPrograms from "@/components/EngineeringPrograms";
import SuperStack from "@/components/SuperStack";
import CareerFormSection from "@/components/CareerFormSection";
import SkippersAdvantage from "@/components/SkippersAdvantage";
import LaunchSection from "@/components/LaunchSection";
import BackedByBest from "@/components/BackedByBest";
import WhyTrustUs from "@/components/WhyTrustUs";

export default function Home() {
  const [products, setProducts] = useState([
    { id: 1, name: 'AR/VR Development', description: 'Immersive technology training with hands-on projects in augmented and virtual reality development.' },
    { id: 2, name: 'Drone Engineering', description: 'Complete UAV technology program covering flight systems, autonomous navigation, and commercial applications.' },
    { id: 3, name: 'Robotics & Automation', description: 'Advanced robotics training with real-world automation projects and industry-relevant skills.' },
    { id: 4, name: 'Future Mobility', description: 'Next-generation transportation technology including autonomous vehicles and smart mobility solutions.' }
  ]);

  return (
    <>
      {/* <ClientDynamicPagesMenu /> */}
      <Hero />
      <TrustSection />
      <TestimonialCarousel />
      <EngineeringPrograms />
      <SuperStack />
      <CareerFormSection />
      <SkippersAdvantage />
      <LaunchSection />
      <BackedByBest />
      <WhyTrustUs />
    </>
  );
}
