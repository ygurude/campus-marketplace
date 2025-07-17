'use client';
import { useAuth } from '../../lib/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, userData } = useAuth();
  const displayName = userData?.displayName || user?.displayName || 'Student';
  const avatarUrl = typeof userData?.profilePicture === 'string' && userData.profilePicture
    ? userData.profilePicture
    : (typeof user?.photoURL === 'string' ? user.photoURL : undefined);
  const router = useRouter();

  // Example stats (replace with real data if available)
  const stats = [
    { label: 'Active Listings', value: 2, href: '/dashboard/listings' },
    { label: 'Messages', value: 3, href: '/dashboard/messages' },
    { label: 'Upcoming Tours', value: 1, href: '#' },
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
    <div className="flex flex-col gap-10 px-2 sm:px-0">
      <div className="flex items-center gap-6 mb-6">
        <Avatar className="w-20 h-20 border-2 border-blue-200 shadow-lg bg-white">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="text-2xl">{displayName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-[var(--foreground)]">Welcome back, {displayName}!</h1>
          <span className="text-gray-500 text-lg">Here’s your dashboard overview</span>
        </div>
        {user && (
          <button
            className="ml-auto bg-gray-100 hover:bg-gray-200 text-blue-700 font-semibold rounded-lg px-5 py-2 shadow border border-gray-200 cursor-pointer"
            onClick={() => router.push('/dashboard/all-listings')}
          >
            View All Listings
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-2">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="no-underline">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
              <span className="text-3xl font-extrabold text-blue-700 group-hover:text-blue-900">{stat.value}</span>
              <span className="text-gray-600 mt-2 text-lg font-medium group-hover:text-blue-700">{stat.label}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="bg-white/80 border border-[var(--border)] rounded-2xl shadow-md p-8 flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {actions.map((action) => (
            <Link key={action.label} href={action.href} className="no-underline">
              <div
                className={`rounded-xl p-6 flex flex-col gap-2 items-start transition-all cursor-pointer
                  ${action.label === 'List Your Place'
                    ? 'bg-blue-500 border border-blue-600 text-white shadow-lg hover:bg-blue-600 hover:scale-[1.03]'
                    : 'bg-white border border-[var(--border)] text-[var(--foreground)] hover:bg-gray-50 hover:shadow-lg'}
                `}
              >
                <span className={`text-lg font-bold ${action.label === 'List Your Place' ? 'text-white' : 'text-[var(--foreground)]'}`}>{action.label}</span>
                <span className={`text-sm ${action.label === 'List Your Place' ? 'text-blue-100' : 'text-gray-500'}`}>{action.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 