'use client';
import { useAuth } from '../../lib/context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getListingsByUser } from '../../lib/services/listings';
import { getUnreadMessageCount } from '../../lib/services/messages';
import { 
  AnimatedCard, 
  GradientText, 
  AnimatedButton, 
  StatsCard, 
  AnimatedListItem,
  AnimatedBackground
} from '../../components/ui/aceternity';
import { Home, User, Plus, List } from 'lucide-react';

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

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground className="opacity-20" />
      
      <div className="relative z-10 flex flex-col gap-6 px-2 sm:px-0 w-full max-w-5xl mx-auto mt-6">
        <AnimatedCard className="p-8" delay={0.1}>
          <div className="flex items-center justify-between gap-4 mb-4 w-full">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-2 border-purple-200 shadow-lg bg-white">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  {displayName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-extrabold mb-1">
                  Welcome back, <GradientText>{displayName}</GradientText>!
                </h1>
                <span className="text-gray-500 text-lg">Here's your dashboard overview</span>
              </div>
            </div>
            <AnimatedButton 
              variant="gradient" 
              onClick={() => router.push('/dashboard/all-listings')}
              className="whitespace-nowrap"
            >
              View All Listings
            </AnimatedButton>
          </div>
        </AnimatedCard>

        <div className="flex flex-col items-center w-full">
          <AnimatedCard className="p-8 w-full max-w-md mb-6" delay={0.2}>
            <div className="text-center">
              <StatsCard 
                title="Active Listings" 
                value={activeListings} 
                icon={Home}
                delay={0.3}
              />
              <div className="mt-4">
                <AnimatedButton 
                  variant="gradient" 
                  onClick={() => router.push('/dashboard/listings')}
                >
                  View My Listings
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        </div>

        <AnimatedCard className="p-8" delay={0.4}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            <GradientText>Quick Actions</GradientText>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <AnimatedListItem delay={0.5}>
              <Link href="/dashboard/listings/new" className="no-underline">
                <div className="rounded-xl p-6 flex flex-col gap-2 items-start bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold">List Your Place</span>
                  <span className="text-sm text-purple-100">Create a new sublease listing</span>
                </div>
              </Link>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.6}>
              <Link href="/dashboard/listings" className="no-underline">
                <div className="rounded-xl p-6 flex flex-col gap-2 items-start bg-white/80 backdrop-blur-sm border border-white/20 text-gray-900 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <List className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-bold">My Listings</span>
                  <span className="text-sm text-gray-600">View and manage your listings</span>
                </div>
              </Link>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.7}>
              <Link href="/dashboard/profile" className="no-underline">
                <div className="rounded-xl p-6 flex flex-col gap-2 items-start bg-white/80 backdrop-blur-sm border border-white/20 text-gray-900 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-bold">Profile</span>
                  <span className="text-sm text-gray-600">Edit your profile and preferences</span>
                </div>
              </Link>
            </AnimatedListItem>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
} 