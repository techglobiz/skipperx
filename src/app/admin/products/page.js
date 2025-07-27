'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Product List</h1>
      <Link href="/admin/add-product" className="text-blue-500">Add Product</Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center my-4 p-4 border rounded">
            <div className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-gray-500 text-sm">
                  Category: {product.category ? product.category.name : 'No Category'}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Link href={`/admin/edit-product/${product.id}`} className="text-green-500 mx-2">Edit</Link>
              <button className="text-red-500" onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
