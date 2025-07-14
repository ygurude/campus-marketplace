import Image from "next/image";
import PostCard from "./components/PostCard";

const featuredPosts = [
  {
    image: "/images/standard.jpeg",
    price: "$1200/mo",
    location: "UCLA, Los Angeles, CA",
    tags: ["Furnished", "Pets allowed"],
    distance: "0.5 mi",
  },
  {
    image: "/images/mark.jpeg",
    price: "$950/mo",
    location: "UT Austin, Austin, TX",
    tags: ["Utilities incl.", "Private bath"],
    distance: "1.2 mi",
  },
  {
    image: "/images/sq5.jpeg",
    price: "$800/mo",
    location: "UMich, Ann Arbor, MI",
    tags: ["Roommate needed", "Parking"],
    distance: "0.8 mi",
  },
  {
    image: "/images/hub.jpeg",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredPosts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
