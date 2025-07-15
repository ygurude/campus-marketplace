'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInUser } from '../../lib/services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInUser(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Sign in to your account</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" 
              required 
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" 
              required 
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 text-base transition-colors"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-2">
          Don&apos;t have an account? <a href="/signup" className="text-black font-semibold hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
} 