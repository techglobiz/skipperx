'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  // Fetch product and categories
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
        setName(data.name || '');
        setPrice(data.price?.toString() || '');
        setImage(data.image || '');
        setPreview(data.image || '');
        setCategoryId(data.categoryId?.toString() || '');
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Please try again.');
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again.');
      }
    };

    const loadData = async () => {
      setLoading(true);
      setError('');
      await Promise.all([fetchProduct(), fetchCategories()]);
      setLoading(false);
    };

    loadData();
  }, [id]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setImage(file); // Save the file to send later
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !price || !categoryId) {
      setError('Please fill in all required fields.');
      return;
    }

    setUpdating(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('price', price);
      formData.append('categoryId', categoryId);
      
      if (image instanceof File) {
        formData.append('image', image);
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="p-6">
      <div className="text-center">Loading...</div>
    </div>
  );

  if (error && !product) return (
    <div className="p-6">
      <div className="text-red-500 mb-4">{error}</div>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit Product</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter product name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Image Preview */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          {preview && (
            <img 
              src={preview} 
              alt="Product preview" 
              className="w-32 h-32 object-cover mb-2 border rounded" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="border p-2 w-full rounded"
            accept="image/*"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            disabled={updating}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {updating ? 'Updating...' : 'Update Product'}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/admin/products')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
