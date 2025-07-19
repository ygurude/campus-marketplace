"use client";

import ListingCard from "../../components/ListingCard";
import { useState, useEffect, useMemo } from "react";
import { getAllListings, Listing } from "../../../lib/services/listings";
import { useAuth } from '../../../lib/context/AuthContext';
import { 
  AnimatedCard, 
  GradientText, 
  AnimatedInput, 
  AnimatedButton, 
  AnimatedListItem,
  AnimatedBackground,
  AnimatedSpinner
} from '../../../components/ui/aceternity';
import { Search, Filter, MapPin } from 'lucide-react';

export default function DashboardAllListingsPage() {
  const [allPosts, setAllPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [university, setUniversity] = useState("");
  const [price, setPrice] = useState(2500);
  const [leaseStart, setLeaseStart] = useState("");
  const [leaseEnd, setLeaseEnd] = useState("");
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    const loadListings = async () => {
      try {
        const posts = await getAllListings();
        setAllPosts(posts);
      } catch (error: any) {
        setError(error.message);
        setAllPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, []);

  const universities = useMemo(() => Array.from(new Set(allPosts.map(post => post.university))).filter(Boolean).sort() as string[], [allPosts]);
  const roomTypes = ["Studio", "1BR", "2BR", "Shared"];

  // Filtering logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      if (university && post.university !== university) return false;
      if (roomType && post.roomType !== roomType) return false;
      if (price && post.price > price) return false;
      if (leaseStart && new Date(post.startDate || "") < new Date(leaseStart || "")) return false;
      if (leaseEnd && new Date(post.endDate || "") > new Date(leaseEnd || "")) return false;
      return true;
    });
  }, [allPosts, university, price, leaseStart, leaseEnd, roomType]);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground className="opacity-20" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 w-full mt-8 px-4">
        {/* Filter Panel */}
        <AnimatedCard className="w-full md:w-72 p-6" delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">
              <GradientText>Filter</GradientText>
            </h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <AnimatedListItem delay={0.2}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">University</label>
                <select
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                >
                  <option value="">All Universities</option>
                  {universities.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.3}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Price Range (up to ${price})
                </label>
                <input
                  type="range"
                  min="500"
                  max="2500"
                  step="50"
                  className="w-full accent-blue-500"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <div className="text-sm text-gray-500 mt-1">${price}</div>
              </div>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.4}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Lease Start</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                  value={leaseStart}
                  onChange={(e) => setLeaseStart(e.target.value)}
                />
              </div>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.5}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Lease End</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                  value={leaseEnd}
                  onChange={(e) => setLeaseEnd(e.target.value)}
                />
              </div>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.6}>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Room Type</label>
                <select
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {roomTypes.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </AnimatedListItem>
            
            <AnimatedListItem delay={0.7}>
              <AnimatedButton 
                variant="gradient" 
                onClick={() => {
                  setUniversity("");
                  setPrice(2500);
                  setLeaseStart("");
                  setLeaseEnd("");
                  setRoomType("");
                }}
                className="w-full"
              >
                Clear Filters
              </AnimatedButton>
            </AnimatedListItem>
          </div>
        </AnimatedCard>

        {/* Listings Grid */}
        <section className="flex-1">
          <AnimatedCard className="p-6 mb-6" delay={0.8}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h1 className="text-3xl font-bold">
                  <GradientText>Available Subleases</GradientText>
                </h1>
              </div>
              <div className="text-sm text-gray-600">
                {filteredPosts.length} listings found
              </div>
            </div>
          </AnimatedCard>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <AnimatedCard key={i} delay={0.1 * i}>
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg h-72 animate-pulse">
                    <div className="bg-gray-200 h-56 rounded-t-xl"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredPosts.map((post, index) => (
                <AnimatedCard key={post.id} delay={0.1 * index}>
                  <ListingCard listing={post} />
                </AnimatedCard>
              ))}
            </div>
          )}
          
          {!loading && filteredPosts.length === 0 && (
            <AnimatedCard className="p-12 text-center" delay={0.9}>
              <div className="flex flex-col items-center gap-4">
                <Search className="w-16 h-16 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600">No listings found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
                <AnimatedButton 
                  variant="outline" 
                  onClick={() => {
                    setUniversity("");
                    setPrice(2500);
                    setLeaseStart("");
                    setLeaseEnd("");
                    setRoomType("");
                  }}
                >
                  Clear All Filters
                </AnimatedButton>
              </div>
            </AnimatedCard>
          )}
        </section>
      </div>
    </div>
  );
} 