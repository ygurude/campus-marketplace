import PostCard from "../components/PostCard";
import { useState } from "react";

const allPosts = [
  {
    image: "/images/standard.jpeg",
    price: "$1200/mo",
    location: "UCLA, Los Angeles, CA",
    tags: ["Furnished", "Pets allowed"],
    distance: "0.5 mi",
    roomType: "Studio",
    university: "UCLA",
    priceValue: 1200,
    startDate: "2024-07-01",
    endDate: "2024-12-31",
  },
  {
    image: "/images/mark.jpeg",
    price: "$950/mo",
    location: "UT Austin, Austin, TX",
    tags: ["Utilities incl.", "Private bath"],
    distance: "1.2 mi",
    roomType: "1BR",
    university: "UT Austin",
    priceValue: 950,
    startDate: "2024-08-15",
    endDate: "2024-12-15",
  },
  {
    image: "/images/sq5.jpeg",
    price: "$800/mo",
    location: "UMich, Ann Arbor, MI",
    tags: ["Roommate needed", "Parking"],
    distance: "0.8 mi",
    roomType: "Shared",
    university: "UMich",
    priceValue: 800,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    image: "/images/hub.jpeg",
    price: "$1100/mo",
    location: "NYU, New York, NY",
    tags: ["Furnished", "Gym"],
    distance: "0.3 mi",
    roomType: "2BR",
    university: "NYU",
    priceValue: 1100,
    startDate: "2024-09-01",
    endDate: "2025-05-31",
  },
  // Add more posts as needed
];

const universities = ["UCLA", "UT Austin", "UMich", "NYU"];
const roomTypes = ["Studio", "1BR", "2BR", "Shared"];

export default function ListingsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mt-8">
      {/* Filter Panel */}
      <aside className="w-full md:w-64 bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 flex flex-col gap-6 mb-8 md:mb-0">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Filter</h2>
        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <select className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option value="">All</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <input type="range" min="500" max="2500" step="50" className="w-full accent-gray-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease Start</label>
          <input type="date" className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease End</label>
          <input type="date" className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Room Type</label>
          <select className="w-full rounded-lg border border-[var(--border)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option value="">All</option>
            {roomTypes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button className="mt-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-6 py-2 transition-colors text-base shadow-sm">
          Apply Filters
        </button>
      </aside>
      {/* Listings Grid */}
      <section className="flex-1">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">Available Subleases</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allPosts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
} 