import Image from "next/image";
import PostCard from "./components/PostCard";

const featuredPosts = [
  {
    image: "/vercel.svg",
    price: "$1200/mo",
    location: "UCLA, Los Angeles, CA",
    tags: ["Furnished", "Pets allowed"],
    distance: "0.5 mi",
  },
  {
    image: "/globe.svg",
    price: "$950/mo",
    location: "UT Austin, Austin, TX",
    tags: ["Utilities incl.", "Private bath"],
    distance: "1.2 mi",
  },
  {
    image: "/window.svg",
    price: "$800/mo",
    location: "UMich, Ann Arbor, MI",
    tags: ["Roommate needed", "Parking"],
    distance: "0.8 mi",
  },
  {
    image: "/file.svg",
    price: "$1100/mo",
    location: "NYU, New York, NY",
    tags: ["Furnished", "Gym"],
    distance: "0.3 mi",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center gap-6 mt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] text-center mb-2">
          Find your next student sublease!
        </h1>
        <p className="text-lg text-gray-500 text-center max-w-xl mb-4">
          Discover and post student apartment subleases near your campus. Safe, easy, and made for students.
        </p>
        {/* Quick Search Bar */}
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl bg-white border border-[var(--border)] rounded-xl shadow-sm p-4 items-center">
          <input
            type="text"
            placeholder="Location or University"
            className="rounded-lg px-4 py-2 border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-60 text-base"
          />
          <input
            type="date"
            className="rounded-lg px-4 py-2 border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-40 text-base"
          />
          <input
            type="date"
            className="rounded-lg px-4 py-2 border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-40 text-base"
          />
          <div className="flex flex-col items-center w-full sm:w-48">
            <label htmlFor="budget" className="text-xs text-gray-400 mb-1">Budget</label>
            <input
              id="budget"
              type="range"
              min="500"
              max="2500"
              step="50"
              className="w-full accent-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-6 py-2 transition-colors text-base shadow-sm"
          >
            Search
          </button>
        </form>
        <a
          href="/post"
          className="mt-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-sm transition-colors"
        >
          Post your apartment
        </a>
      </section>

      {/* Featured Posts */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Featured Subleases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredPosts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
