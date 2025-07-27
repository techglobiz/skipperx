'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path) => mounted && pathname === path;

  if (!mounted) {
    return (
      <div className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6 text-center">Admin Panel</h1>
          <nav className="flex flex-col space-y-2">
            <Link href="/admin/dashboard" className="hover:bg-gray-700 p-3 rounded transition duration-300">
              <i className="fas fa-tachometer-alt mr-2"></i>
              Dashboard
            </Link>
            <Link href="/admin/categories" className="hover:bg-gray-700 p-3 rounded transition duration-300">
              <i className="fas fa-tags mr-2"></i>
              Categories
            </Link>
            <Link href="/admin/products" className="hover:bg-gray-700 p-3 rounded transition duration-300">
              <i className="fas fa-box mr-2"></i>
              Products
            </Link>
            <Link href="/admin/add-product" className="hover:bg-gray-700 p-3 rounded transition duration-300">
              <i className="fas fa-plus mr-2"></i>
              Add Product
            </Link>
            <hr className="my-4 border-gray-600" />
            <Link href="/" className="hover:bg-gray-700 p-3 rounded transition duration-300 text-green-400">
              <i className="fas fa-globe mr-2"></i>
              View Website
            </Link>
            <Link href="/login" className="hover:bg-gray-700 p-3 rounded transition duration-300 text-red-400 mt-4">
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Link>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6 text-center">Admin Panel</h1>
        <nav className="flex flex-col space-y-2">
          <Link 
            href="/admin/dashboard" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/dashboard') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-tachometer-alt mr-2"></i>
            Dashboard
          </Link>
          <Link 
            href="/admin/categories" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/categories') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-tags mr-2"></i>
            Categories
          </Link>
          <Link 
            href="/admin/products" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/products') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-box mr-2"></i>
            Products
          </Link>
          <Link 
            href="/admin/add-product" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/add-product') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-plus mr-2"></i>
            Add Product
          </Link>
          <Link 
            href="/admin/pages" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/pages') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-file-alt mr-2"></i>
            Pages
          </Link>
          <Link 
            href="/admin/course-categories" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/course-categories') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-folder mr-2"></i>
            Course Categories
          </Link>
          <Link 
            href="/admin/courses" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/courses') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-graduation-cap mr-2"></i>
            Courses
          </Link>
          
          <Link 
            href="/admin/site-settings" 
            className={`hover:bg-gray-700 p-3 rounded transition duration-300 ${
              isActive('/admin/site-settings') ? 'bg-gray-700 border-l-4 border-orange-500' : ''
            }`}
          >
            <i className="fas fa-cogs mr-2"></i>
            Site Settings
          </Link>
          
          {/* Divider */}
          <hr className="my-4 border-gray-600" />
          
          <Link 
            href="/" 
            className="hover:bg-gray-700 p-3 rounded transition duration-300 text-green-400"
          >
            <i className="fas fa-globe mr-2"></i>
            View Website
          </Link>
          <Link 
            href="/login" 
            className="hover:bg-gray-700 p-3 rounded transition duration-300 text-red-400 mt-4"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
}
