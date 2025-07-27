'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Update page metadata for contact page
  useEffect(() => {
    document.title = "Contact Us - Get Your Project Started | MyCo";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact MyCo for a free consultation on your web development or digital marketing project. Let\'s discuss how we can help grow your business.');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'contact us, web development consultation, digital marketing quote, project discussion, business growth');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    router.push('/thank-you');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Contact Us</h1>
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Get in Touch</h2>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <form id="contact-form">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                        <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f46d22] transition duration-200" placeholder="Your Name" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f46d22] transition duration-200" placeholder="your.email@example.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">Subject</label>
                        <input type="text" id="subject" name="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f46d22] transition duration-200" placeholder="Subject of your message" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
                        <textarea id="message" name="message" rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f46d22] transition duration-200" placeholder="Your message..." required></textarea>
                    </div>
                    
                    <button type="submit" className="w-full bg-[#f46d22] text-white py-3 rounded-lg font-semibold hover:bg-[#e05a18] focus:outline-none focus:ring-2 focus:ring-[#f46d22] focus:ring-offset-2 transition duration-300 transform hover:scale-105 shadow-md">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>
    </div>
  );
}