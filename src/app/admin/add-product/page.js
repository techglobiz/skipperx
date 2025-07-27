'use client';

import { useState, useEffect } from 'react';

export default function AddProduct() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    form.reset();
    alert('Product added successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" required className="border p-2 w-full" />
        <input type="number" name="price" placeholder="Price" required className="border p-2 w-full" />
        <input type="file" name="image" accept="image/*" required className="border p-2 w-full" />

        <select name="categoryId" required className="border p-2 w-full">
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Product</button>
      </form>
    </div>
  );
}
  