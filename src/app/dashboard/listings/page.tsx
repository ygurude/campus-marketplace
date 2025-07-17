'use client';

import PostCard from "../../components/PostCard";
import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/context/AuthContext";
import { getListingsByUser, Listing } from "../../../lib/services/listings";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadMyListings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const posts = await getListingsByUser(user.uid);
        setMyPosts(posts);
      } catch (error: any) {
        console.error('Error loading my listings:', error);
        setError(error.message);
        // Fallback to static data if Firebase fails
        setMyPosts([
          {
            id: '1',
            title: 'My Cozy Studio',
            description: 'Furnished studio apartment',
            price: 1200,
            location: "UCLA, Los Angeles, CA",
            university: 'UCLA',
            roomType: 'Studio',
            startDate: '2024-07-01',
            endDate: '2024-12-31',
            tags: ["Furnished", "Pets allowed"],
            images: ["/images/hub.jpeg"],
            amenities: [],
            distance: "0.5 mi",
            userId: user.uid,
            userEmail: user.email || '',
            userName: user.displayName || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: true,
            utilitiesIncluded: false,
            petsAllowed: true,
            parkingAvailable: false,
          },
          {
            id: '2',
            title: 'My Shared Room',
            description: 'Looking for roommate',
            price: 800,
            location: "UMich, Ann Arbor, MI",
            university: 'UMich',
            roomType: 'Shared',
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            tags: ["Roommate needed", "Parking"],
            images: ["/images/standard.jpeg"],
            amenities: [],
            distance: "0.8 mi",
            userId: user.uid,
            userEmail: user.email || '',
            userName: user.displayName || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: false,
            utilitiesIncluded: false,
            petsAllowed: false,
            parkingAvailable: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadMyListings();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to view your listings.</p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/dashboard');
          }
        }}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-[var(--border)] rounded-xl shadow-sm h-64 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-xl"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {myPosts.map((post) => (
            <div key={post.id} className="relative">
              <PostCard listing={post} />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200">Edit</button>
                <button className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 