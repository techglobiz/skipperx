import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

// Generate metadata for this page
export async function generateMetadata() {
  return generatePageMetadata(pageMetadata.services);
}

export default function ServicesPage() {
  const services = [
    {
      icon: "fas fa-desktop",
      title: "Web Development",
      description: "Custom website development with modern frameworks, responsive design, and optimized performance for better user experience and search rankings.",
      features: ["Responsive Design", "SEO Optimization", "Fast Loading", "Mobile-First"],
      price: "Starting at $2,999"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile App Development",
      description: "Native iOS and Android mobile applications with intuitive user interfaces, secure backend integration, and app store optimization.",
      features: ["Native Development", "Cross-Platform", "App Store Optimization", "Backend Integration"],
      price: "Starting at $5,999"
    },
    {
      icon: "fas fa-shopping-cart",
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with secure payment processing, inventory management, and conversion optimization for maximum sales.",
      features: ["Secure Payments", "Inventory Management", "Analytics", "SEO Ready"],
      price: "Starting at $4,999"
    },
    {
      icon: "fas fa-chart-line",
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns including SEO, social media marketing, PPC advertising, and content marketing to drive growth.",
      features: ["SEO Services", "Social Media Marketing", "PPC Advertising", "Content Marketing"],
      price: "Starting at $1,999/month"
    }
  ];

  return (
    <div className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Digital Services for Your Business
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Transform your business with our comprehensive web development, mobile app development, 
            e-commerce solutions, and digital marketing services designed to drive growth and success.
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <article key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-orange-500 text-5xl mb-6 text-center">
                  <i className={service.icon}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500 mb-4">{service.price}</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Get Quote
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How long does it take to develop a website?</h3>
              <p className="text-gray-600">Typical website development takes 4-8 weeks depending on complexity, features, and client feedback cycles.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you provide ongoing maintenance?</h3>
              <p className="text-gray-600">Yes, we offer comprehensive maintenance packages including updates, security monitoring, and technical support.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What&apos;s included in your SEO services?</h3>
              <p className="text-gray-600">Our SEO services include keyword research, on-page optimization, content creation, link building, and monthly reporting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let&apos;s discuss how we can help grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
