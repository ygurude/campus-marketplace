import PostCard from "../../components/PostCard";

const myPosts = [
  {
    image: "/images/hub.jpeg",
    price: "$1200/mo",
    location: "UCLA, Los Angeles, CA",
    tags: ["Furnished", "Pets allowed"],
    distance: "0.5 mi",
  },
  {
    image: "/images/standard.jpeg",
    price: "$800/mo",
    location: "UMich, Ann Arbor, MI",
    tags: ["Roommate needed", "Parking"],
    distance: "0.8 mi",
  },
];

export default function MyListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {myPosts.map((post, idx) => (
          <div key={idx} className="relative">
            <PostCard {...post} />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200">Edit</button>
              <button className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 