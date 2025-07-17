"use client";

import PostCard from "../../components/PostCard";
import { useState, useEffect, useMemo } from "react";
import { getAllListings, Listing } from "../../../lib/services/listings";
import { useAuth } from '../../../lib/context/AuthContext';

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
    <div className="flex flex-col md:flex-row gap-8 w-full mt-8">
      {/* Filter Panel */}
      <aside className="w-full md:w-64 bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 flex flex-col gap-6 mb-8 md:mb-0">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Filter</h2>
        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <select
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={university}
            onChange={e => setUniversity(e.target.value)}
          >
            <option value="">All</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <input
            type="range"
            min="500"
            max="2500"
            step="50"
            className="w-full accent-gray-500"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$500</span>
            <span>${price}</span>
            <span>$2500</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease Start</label>
          <input
            type="date"
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={leaseStart}
            onChange={e => setLeaseStart(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease End</label>
          <input
            type="date"
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={leaseEnd}
            onChange={e => setLeaseEnd(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Room Type</label>
          <select
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={roomType}
            onChange={e => setRoomType(e.target.value)}
          >
            <option value="">All</option>
            {roomTypes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </aside>
      {/* Listings Grid */}
      <main className="flex-1">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">All Listings</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
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
            {filteredPosts.map((post) => (
              <PostCard key={post.id} listing={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 