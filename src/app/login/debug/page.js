'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginDebugPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState([]);
  const router = useRouter();

  const addLog = (message) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogs([]);
    setStatus('Attempting login...');
    
    addLog('Form submitted');
    addLog(`Email: ${email}`);
    addLog(`Password: ${password}`);

    try {
      addLog('Making fetch request to /api/login');
      
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      addLog(`Response status: ${res.status}`);
      addLog(`Response ok: ${res.ok}`);
      addLog(`Response headers: ${JSON.stringify([...res.headers])}`);

      if (res.ok) {
        const data = await res.json();
        addLog('Login successful!');
        addLog(`Token received: ${data.token ? 'YES' : 'NO'}`);
        addLog(`Token length: ${data.token ? data.token.length : 0}`);

        // Save token to localStorage
        try {
          localStorage.setItem('token', data.token);
          addLog('Token saved to localStorage');
        } catch (storageError) {
          addLog(`LocalStorage error: ${storageError.message}`);
        }

        setStatus('✅ Login successful! Redirecting...');
        
        // Redirect to admin dashboard
        addLog('Attempting redirect to /admin/dashboard');
        router.push('/admin/dashboard');
      } else {
        const errorText = await res.text();
        addLog(`Server error: ${errorText}`);
        setStatus(`❌ Server error: ${errorText}`);
      }
    } catch (error) {
      addLog(`Fetch error: ${error.message}`);
      addLog(`Error stack: ${error.stack}`);
      setStatus(`❌ Network error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login Debug Page
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Debug version with detailed logging
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Debug Login
            </button>
          </div>
        </form>

        {status && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">Status:</h3>
            <p>{status}</p>
          </div>
        )}

        {logs.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded max-h-96 overflow-y-auto">
            <h3 className="font-semibold">Debug Logs:</h3>
            <pre className="text-xs mt-2">
              {logs.join('\n')}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
