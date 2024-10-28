"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login'; // Get the mode (login/signup) from query params
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = mode === 'signup' ? 'http://localhost:5000/auth/signup' : 'http://localhost:5000/auth/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username: mode === 'signup' ? username : undefined, // Send username only in signup mode
        }),
        credentials: 'include',  // Include credentials (cookies, etc.)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Redirect based on mode
      if (mode === 'signup') {
        // Redirect to login after successful signup
        router.push('/auth?mode=login');
      } else if (mode === 'login') {
        localStorage.setItem('token', data.token);  // Save token in local storage
        // Redirect to home after successful login
        router.push('/products');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">{mode === 'signup' ? 'Create account' : 'Sign In'}</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {mode === 'signup' && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-lg ${
            loading ? 'bg-gray-400' : 'bg-pink-500 hover:bg-blue-800'
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : mode === 'signup' ? 'Create your Tradeline account' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
