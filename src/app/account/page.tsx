import PostCard from "../components/PostCard";

const myPosts = [
  {
    image: "/vercel.svg",
    price: "$1200/mo",
    location: "UCLA, Los Angeles, CA",
    tags: ["Furnished", "Pets allowed"],
    distance: "0.5 mi",
  },
  {
    image: "/window.svg",
    price: "$800/mo",
    location: "UMich, Ann Arbor, MI",
    tags: ["Roommate needed", "Parking"],
    distance: "0.8 mi",
  },
];

export default function AccountPage() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">My Account</h1>
      <section className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">Account Info</h2>
        <div className="flex flex-col gap-2 text-gray-700">
          <span><b>Name:</b> Jane Student</span>
          <span><b>Email:</b> jane@student.edu</span>
          <span><b>University:</b> UCLA</span>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">My Sublease Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {myPosts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
} 