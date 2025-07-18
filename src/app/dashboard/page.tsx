'use client';
import { useAuth } from '../../lib/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListingsByUser } from '../../lib/services/listings';
import { getUnreadMessageCount } from '../../lib/services/messages';

export default function DashboardPage() {
  const { user, userData } = useAuth();
  const displayName = userData?.displayName || user?.displayName || 'Student';
  const avatarUrl = typeof userData?.profilePicture === 'string' && userData.profilePicture
    ? userData.profilePicture
    : (typeof user?.photoURL === 'string' ? user.photoURL : undefined);
  const router = useRouter();

  const [activeListings, setActiveListings] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  useEffect(() => {
    async function fetchStats() {
      if (user) {
        const listings = await getListingsByUser(user.uid);
        setActiveListings(listings.length);
        try {
          const count = await getUnreadMessageCount(user.uid);
          setMessagesCount(count);
        } catch {
          setMessagesCount(0);
        }
      }
    }
    fetchStats();
  }, [user]);
  const stats = [
    { label: 'Active Listings', value: activeListings, href: '/dashboard/listings' },
    { label: 'Messages', value: messagesCount, href: '/dashboard/messages' },
    // You can add more dynamic stats here if needed
  ];

  const actions = [
    {
      label: 'List Your Place',
      description: 'Create a new sublease listing',
      href: '/dashboard/listings/new',
      color: 'bg-blue-600 text-white',
    },
    {
      label: 'My Listings',
      description: 'View and manage your listings',
      href: '/dashboard/listings',
      color: 'bg-white border border-[var(--border)]',
    },
    {
      label: 'Messages',
      description: 'Check your messages',
      href: '/dashboard/messages',
      color: 'bg-white border border-[var(--border)]',
    },
    {
      label: 'Profile',
      description: 'Edit your profile and preferences',
      href: '/dashboard/profile',
      color: 'bg-white border border-[var(--border)]',
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-2 sm:px-0 w-full max-w-5xl mx-auto mt-6">
      <div className="flex items-center justify-between gap-4 mb-4 w-full">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-blue-200 shadow-lg bg-white">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="text-2xl">{displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-extrabold mb-1 text-[var(--foreground)]">Welcome back, {displayName}!</h1>
            <span className="text-gray-500 text-lg">Here’s your dashboard overview</span>
          </div>
        </div>
        <Link href="/dashboard/all-listings" className="inline-block bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-lg px-5 py-2 text-base shadow border border-blue-600 transition-colors">
          View All Listings
        </Link>
      </div>
      {/* Modern stats and quick actions remain as previously redesigned */}
      <div className="flex flex-col items-center w-full">
        <div className="bg-gradient-to-br from-blue-50 to-white border border-[var(--border)] rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-md mb-6">
          <span className="text-5xl font-extrabold text-blue-700 mb-2">{activeListings}</span>
          <span className="text-lg font-medium text-gray-700">Active Listings</span>
          <Link href="/dashboard/listings" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 text-base shadow transition-colors">View My Listings</Link>
        </div>
      </div>
      <div className="bg-white/90 border border-[var(--border)] rounded-2xl shadow-md p-6 flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/listings/new" className="no-underline">
            <div className="rounded-xl p-6 flex flex-col gap-2 items-start bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-[1.03] transition-all cursor-pointer">
              <span className="text-lg font-bold">List Your Place</span>
              <span className="text-sm text-blue-100">Create a new sublease listing</span>
            </div>
          </Link>
          <Link href="/dashboard/listings" className="no-underline">
            <div className="rounded-xl p-6 flex flex-col gap-2 items-start bg-white border border-[var(--border)] text-[var(--foreground)] hover:bg-gray-50 hover:shadow-lg transition-all cursor-pointer">
              <span className="text-lg font-bold">My Listings</span>
              <span className="text-sm text-gray-500">View and manage your listings</span>
            </div>
          </Link>
          <Link href="/dashboard/profile" className="no-underline">
            <div className="rounded-xl p-6 flex flex-col gap-2 items-start bg-white border border-[var(--border)] text-[var(--foreground)] hover:bg-gray-50 hover:shadow-lg transition-all cursor-pointer">
              <span className="text-lg font-bold">Profile</span>
              <span className="text-sm text-gray-500">Edit your profile and preferences</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 