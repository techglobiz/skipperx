'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg py-4 fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="text-2xl font-bold text-white rounded-lg p-2 hover:bg-gray-700 transition duration-300">
          Admin Panel
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/admin/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition duration-300">
            Dashboard
          </Link>
          <Link href="/admin/categories" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition duration-300">
            Categories
          </Link>
          <Link href="/admin/products" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition duration-300">
            Products
          </Link>
          <Link href="/admin/add-product" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition duration-300">
            Add Product
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition duration-300">
            View Site
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-300 focus:outline-none focus:text-white transition duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-gray-800 py-2 shadow-md ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/admin/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300">
          Dashboard
        </Link>
        <Link href="/admin/categories" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300">
          Categories
        </Link>
        <Link href="/admin/products" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300">
          Products
        </Link>
        <Link href="/admin/add-product" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300">
          Add Product
        </Link>
        <Link href="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300">
          View Site
        </Link>
        <button 
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
