'use client';

import { useState, useRef, useEffect } from 'react';

export default function ImageUpload({ currentImage, onImageChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Update preview when currentImage changes
  useEffect(() => {
    setPreview(currentImage || '');
  }, [currentImage]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous error
    setError('');

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Upload successful:', data);
        setPreview(data.url);
        onImageChange(data.url);
        setError('');
      } else {
        console.error('Upload failed:', data);
        setError(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onImageChange(url);
    setError('');
  };

  const clearImage = () => {
    setPreview('');
    onImageChange('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="space-y-4">
        {/* URL Input */}
        <div>
          <input
            key="image-url-input"
            type="text"
            value={preview}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg or upload below"
          />
        </div>

        {/* File Upload */}
        <div className="flex items-center space-x-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Browse Image'}
          </button>
          
          {preview && (
            <button
              type="button"
              onClick={clearImage}
              className="px-4 py-2 text-red-600 hover:text-red-900"
            >
              Clear
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        {/* Image Preview */}
        {preview && !error && (
          <div className="mt-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              onError={() => {
                setError('Failed to load image');
                setPreview('');
                onImageChange('');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
