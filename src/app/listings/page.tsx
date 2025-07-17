'use client';

import PostCard from "../components/PostCard";
import { useState, useEffect, useMemo } from "react";
import { getAllListings, Listing } from "../../lib/services/listings";
import { useAuth } from '../../lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ListingsPage() {
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
        console.error("Error loading listings:", error);
        setError(error.message);
        // Fallback to static data if Firebase fails
        setAllPosts([
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
            propertyType: 'Studio',
            contactInfo: { phone: '', email: '' },
            availability: { startDate: '2024-07-01', endDate: '2024-12-31' },
            rules: [],
            utilities: { included: [], notIncluded: [] },
            deposit: 0,
            status: 'active',
            views: 0,
            favorites: 0,
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
            propertyType: '1BR',
            contactInfo: { phone: '', email: '' },
            availability: { startDate: '2024-08-15', endDate: '2024-12-15' },
            rules: [],
            utilities: { included: [], notIncluded: [] },
            deposit: 0,
            status: 'active',
            views: 0,
            favorites: 0,
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
            propertyType: 'Shared',
            contactInfo: { phone: '', email: '' },
            availability: { startDate: '2024-06-01', endDate: '2024-08-31' },
            rules: [],
            utilities: { included: [], notIncluded: [] },
            deposit: 0,
            status: 'active',
            views: 0,
            favorites: 0,
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
            propertyType: '2BR',
            contactInfo: { phone: '', email: '' },
            availability: { startDate: '2024-09-01', endDate: '2025-05-31' },
            rules: [],
            utilities: { included: [], notIncluded: [] },
            deposit: 0,
            status: 'active',
            views: 0,
            favorites: 0,
          },
        ]);
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

  const { user } = useAuth();
  const router = useRouter();

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
            onChange={(e) => setUniversity(e.target.value)}
          >
            <option value="">All</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price Range (up to ${price})</label>
          <input
            type="range"
            min="500"
            max="2500"
            step="50"
            className="w-full accent-gray-500"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease Start</label>
          <input
            type="date"
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease End</label>
          <input
            type="date"
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Room Type</label>
          <select
            className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">All</option>
            {roomTypes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </aside>
      {/* Listings Grid */}
      <section className="flex-1">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">Available Subleases</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} listing={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 