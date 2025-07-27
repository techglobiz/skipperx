'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SiteSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    siteTitle: '',
    siteDescription: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    favicon: '',
    logo: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialLinks: '',
    googleAnalytics: '',
    facebookPixel: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings({
          ...data,
          socialLinks: typeof data.socialLinks === 'string' ? data.socialLinks : JSON.stringify(data.socialLinks || {}, null, 2)
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Parse social links JSON
      let parsedSocialLinks = {};
      try {
        parsedSocialLinks = JSON.parse(settings.socialLinks || '{}');
      } catch {
        parsedSocialLinks = {};
      }

      const dataToSend = {
        ...settings,
        socialLinks: JSON.stringify(parsedSocialLinks)
      };

      const method = settings.id ? 'PUT' : 'POST';
      const response = await fetch('/api/site-settings', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setMessage('Site settings updated successfully!');
        fetchSettings(); // Refresh the data
        
        // Trigger metadata revalidation
        try {
          await fetch('/api/revalidate-metadata', { 
            method: 'POST',
            cache: 'no-store'
          });
        } catch (error) {
          console.error('Failed to revalidate metadata:', error);
        }
      } else {
        setMessage('Failed to update site settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('An error occurred while updating settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>
        
        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Site Information */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Title *
                </label>
                <input
                  type="text"
                  name="siteTitle"
                  value={settings.siteTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description *
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">SEO Metadata</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={settings.metaTitle}
                  onChange={handleChange}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={settings.metaDescription}
                  onChange={handleChange}
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma separated)
                </label>
                <textarea
                  name="keywords"
                  value={settings.keywords}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Open Graph (Facebook)</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Title
                </label>
                <input
                  type="text"
                  name="ogTitle"
                  value={settings.ogTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Description
                </label>
                <textarea
                  name="ogDescription"
                  value={settings.ogDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Image URL
                </label>
                <input
                  type="text"
                  name="ogImage"
                  value={settings.ogImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/assets/og-image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Twitter</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Title
                </label>
                <input
                  type="text"
                  name="twitterTitle"
                  value={settings.twitterTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Description
                </label>
                <textarea
                  name="twitterDescription"
                  value={settings.twitterDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Image URL
                </label>
                <input
                  type="text"
                  name="twitterImage"
                  value={settings.twitterImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/assets/twitter-image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Social Links</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Links (JSON format)
              </label>
              <textarea
                name="socialLinks"
                value={settings.socialLinks}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder={`{
  "linkedin": "https://linkedin.com/company/skipperx",
  "twitter": "https://twitter.com/skipperx",
  "facebook": "https://facebook.com/skipperx",
  "instagram": "https://instagram.com/skipperx"
}`}
              />
            </div>
          </div>

          {/* Analytics */}
          <div className="pb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Analytics & Tracking</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  name="googleAnalytics"
                  value={settings.googleAnalytics}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  name="facebookPixel"
                  value={settings.facebookPixel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
