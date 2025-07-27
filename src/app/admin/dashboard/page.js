'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    pages: 0,
    publishedPages: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categories = await categoriesRes.json();
      
      // Fetch products
      const productsRes = await fetch('/api/products');
      const products = await productsRes.json();
      
      // Fetch pages
      const pagesRes = await fetch('/api/pages');
      const pages = await pagesRes.json();
      
      setStats({
        categories: categories.length,
        products: products.length,
        pages: pages.length,
        publishedPages: pages.filter(page => page.isPublished).length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="fas fa-tags text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <i className="fas fa-box text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="fas fa-file-alt text-purple-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pages}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <i className="fas fa-globe text-orange-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published Pages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.publishedPages}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/categories" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Categories</h3>
              <p className="text-gray-600">Add, edit, or delete categories</p>
            </div>
            <i className="fas fa-tags text-blue-600 text-2xl"></i>
          </div>
        </Link>
        
        <Link href="/admin/products" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Products</h3>
              <p className="text-gray-600">Add, edit, or delete products</p>
            </div>
            <i className="fas fa-box text-green-600 text-2xl"></i>
          </div>
        </Link>
        
        <Link href="/admin/pages" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Pages</h3>
              <p className="text-gray-600">Create and manage dynamic pages</p>
            </div>
            <i className="fas fa-file-alt text-purple-600 text-2xl"></i>
          </div>
        </Link>
      </div>
    </div>
  );
}
