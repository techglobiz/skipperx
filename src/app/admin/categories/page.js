'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);

      const response = await fetch('/api/categories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setName('');
        setImage(null);
        // Reset file input
        document.querySelector('input[type="file"]').value = '';
        fetchCategories();
        alert('Category added successfully!');
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchCategories();
        alert('Category deleted successfully!');
      } else {
        alert('Failed to delete category.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Category Management</h1>

      <form onSubmit={addCategory} className="flex flex-col gap-4 mb-6">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="New Category" className="border p-2 w-full" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Category</button>
      </form>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center my-2">
            <div className="flex items-center gap-4">
              <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded" />
              <span>{cat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-green-500" onClick={() => router.push(`/admin/edit-category/${cat.id}`)}>Edit</button>
              <button className="text-red-500" onClick={() => deleteCategory(cat.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
