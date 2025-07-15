'use client';

import Image from "next/image";
import PostCard from "./components/PostCard";
import { useEffect, useState } from "react";
import { getFeaturedListings, Listing } from "../lib/services/listings";

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        console.log('Loading featured posts from Firebase...');
        const posts = await getFeaturedListings(4);
        console.log('Featured posts loaded:', posts);
        setFeaturedPosts(posts);
      } catch (error) {
        console.error('Error loading featured posts:', error);
        // Fallback to static data if Firebase fails
        console.log('Using fallback static data');
        setFeaturedPosts([
          {
            id: '1',
            title: 'Cozy Studio Near UCLA',
            description: 'Furnished studio apartment',
            price: 1200,
            location: "UCLA, Los Angeles, CA",
            university: 'UCLA',
            roomType: 'Studio',
            startDate: '2024-07-01',
            endDate: '2024-12-31',
            tags: ["Furnished", "Pets allowed"],
            images: ["/images/standard.jpeg"],
            amenities: [],
            distance: "0.5 mi",
            userId: '',
            userEmail: '',
            userName: '',
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
            title: 'Modern 1BR Near UT Austin',
            description: 'Private bathroom included',
            price: 950,
            location: "UT Austin, Austin, TX",
            university: 'UT Austin',
            roomType: '1BR',
            startDate: '2024-08-15',
            endDate: '2024-12-15',
            tags: ["Utilities incl.", "Private bath"],
            images: ["/images/mark.jpeg"],
            amenities: [],
            distance: "1.2 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: false,
            utilitiesIncluded: true,
            petsAllowed: false,
            parkingAvailable: false,
          },
          {
            id: '3',
            title: 'Shared Room Near UMich',
            description: 'Looking for roommate',
            price: 800,
            location: "UMich, Ann Arbor, MI",
            university: 'UMich',
            roomType: 'Shared',
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            tags: ["Roommate needed", "Parking"],
            images: ["/images/sq5.jpeg"],
            amenities: [],
            distance: "0.8 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: false,
            utilitiesIncluded: false,
            petsAllowed: false,
            parkingAvailable: true,
          },
          {
            id: '4',
            title: 'Luxury 2BR Near NYU',
            description: 'Fully furnished with gym access',
            price: 1100,
            location: "NYU, New York, NY",
            university: 'NYU',
            roomType: '2BR',
            startDate: '2024-09-01',
            endDate: '2025-05-31',
            tags: ["Furnished", "Gym"],
            images: ["/images/hub.jpeg"],
            amenities: [],
            distance: "0.3 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: true,
            utilitiesIncluded: false,
            petsAllowed: false,
            parkingAvailable: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);
  return (
    <div className="flex flex-col gap-12 items-center w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center gap-6 mt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] text-center mb-2">
          Find your next student sublease
        </h1>
        <p className="text-lg text-gray-500 text-center max-w-xl mb-4">
          Discover and list student apartments near your campus. Simple, safe, and made for you.
        </p>
        {/* Quick Search Bar */}
        <form className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search by location or university..."
              className="rounded-t-xl sm:rounded-t-xl sm:rounded-l-xl sm:rounded-none px-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-60 text-base"
            />
            <input
              type="date"
              className="border-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-40 text-base sm:rounded-none"
            />
            <input
              type="date"
              className="border-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-40 text-base sm:rounded-none"
            />
            <div className="flex flex-col items-center w-full sm:w-48 px-4 py-2 sm:py-0 sm:px-4 bg-white sm:bg-transparent border-0 sm:rounded-none">
              <label htmlFor="budget" className="text-xs text-gray-400 mb-1">Budget</label>
              <input
                id="budget"
                type="range"
                min="500"
                max="2500"
                step="50"
                className="w-full accent-gray-500 mt-1"
              />
            </div>
            <div className="h-full flex items-center sm:ml-2 mt-2 sm:mt-0">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 transition-colors text-base rounded-none sm:rounded-r-xl rounded-b-xl sm:rounded-b-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                style={{ boxShadow: "none" }}
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <a
          href="/post"
          className="mt-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-sm transition-colors"
        >
          List Your Place
        </a>
      </section>

      {/* Featured Posts */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Featured Subleases</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredPosts.map((post) => {
              console.log('Rendering PostCard with listing:', post);
              return <PostCard key={post.id} listing={post} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
}
