'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api/categories/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setCurrentImage(data.image);
      }
    };
    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);

    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      router.push('/admin/categories');
    } else {
      console.error('Error updating category');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit Category</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
        />

        {currentImage && (
          <div>
            <p className="mb-2">Current Image:</p>
            <img src={currentImage} alt="Current" className="w-32 h-32 object-cover" />
          </div>
        )}

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Update Category
        </button>
      </form>
    </div>
  );
}
