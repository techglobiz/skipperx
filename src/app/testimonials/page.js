'use client'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import Image from 'next/image';
import PageMetadata from '@/components/PageMetadata';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const router = useRouter();

  // Update page metadata for testimonials page
  useEffect(() => {
    document.title = "Client Testimonials - Success Stories | MyCo";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read what our satisfied clients say about our web development and digital marketing services. Discover success stories and project results.');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'client testimonials, success stories, web development reviews, digital marketing results, customer feedback');
    }
  }, []);

  const fetchTestimonials = async () => {
    const response = await fetch('/api/testimonials');
    const data = await response.json();
    setTestimonials(data);
  };

  return (
    <>
      <PageMetadata 
        title="Client Testimonials & Reviews - MyCo Success Stories"
        description="Read testimonials from satisfied clients who transformed their business with MyCo's web development, mobile app development, and digital marketing services."
        keywords="testimonials, client reviews, web development reviews, mobile app development testimonials, digital marketing success stories"
        path="/testimonials"
      />
      <div className="pt-20 bg-gray-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Real testimonials from businesses that have transformed their digital presence with MyCo&apos;s 
              expert web development, mobile app development, and digital marketing services.
            </p>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What Our Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  <div className="bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-100">
                      <p className="text-gray-700 text-lg italic mb-6">
                          &quot;MyCo delivered an exceptional website that perfectly captures our brand. Their attention to detail and communication were outstanding!&quot;
                      </p>
                      <div className="flex items-center">
                          <Image src="https://placehold.co/60x60/FFFBEB/f46d22?text=JD" alt="Client 1" className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-orange-200" width={60} height={60} />
                          <div>
                              <p className="font-semibold text-gray-900">Jane Doe</p>
                              <p className="text-gray-600 text-sm">CEO, Innovate Corp</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-100">
                      <p className="text-gray-700 text-lg italic mb-6">
                          &quot;The mobile app developed by MyCo has transformed our customer engagement. It&apos;s intuitive, fast, and exactly what we needed.&quot;
                      </p>
                      <div className="flex items-center">
                          <Image src="https://placehold.co/60x60/FFFBEB/f46d22?text=MS" alt="Client 2" className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-orange-200" width={60} height={60} />
                          <div>
                              <p className="font-semibold text-gray-900">Mark Smith</p>
                              <p className="text-gray-600 text-sm">Founder, Tech Solutions</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-100">
                      <p className="text-gray-700 text-lg italic mb-6">
                          &quot;Their online marketing strategies significantly boosted our online presence and sales. Highly recommend their expertise!&quot;
                      </p>
                      <div className="flex items-center">
                          <Image src="https://placehold.co/60x60/FFFBEB/f46d22?text=AL" alt="Client 3" className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-orange-200" width={60} height={60} />
                          <div>
                              <p className="font-semibold text-gray-900">Anna Lee</p>
                              <p className="text-gray-600 text-sm">Marketing Director, Global Goods</p>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
        </section>
      </div>
    </>
  );
}