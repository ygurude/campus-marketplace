'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmailPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // No auto-redirect, user must log in after verifying

  const handleResend = async () => {
    setSending(true);
    setError('');
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setSent(true);
      }
    } catch (err: any) {
      setError('Failed to resend verification email.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold text-center mb-2">Verify Your Email</h1>
        <p className="text-gray-700 text-center">We sent a verification link to your email address. Please check your inbox and click the link to verify your account.</p>
        <p className="text-gray-500 text-center text-sm">After clicking the link, please log in to access your dashboard.</p>
        {checking && <div className="text-blue-600 text-center">Checking verification status...</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 text-base shadow transition-colors mt-2"
          onClick={handleResend}
          disabled={sending}
        >
          {sending ? 'Resending...' : 'Resend Email'}
        </button>
        {sent && <div className="text-green-600 text-center text-sm">Verification email sent!</div>}
        <button
          className="bg-gray-100 hover:bg-gray-200 text-blue-700 font-semibold rounded-lg px-6 py-2 text-base shadow border border-blue-200 transition-colors mt-2"
          onClick={() => router.push('/login')}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
} 