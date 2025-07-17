import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/context/AuthContext";
import { getListingsByUser, Listing } from "../lib/services/listings";

export default function AccountPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(error.message);
        setMyPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadMyListings();
  }, [user]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">My Account</h1>
      <section className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">Account Info</h2>
        <div className="flex flex-col gap-2 text-gray-700">
          <span><b>Name:</b> {user?.displayName || ""}</span>
          <span><b>Email:</b> {user?.email || ""}</span>
          <span><b>University:</b> {user?.university || ""}</span>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Your Sublease Listings</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {myPosts.map((post, idx) => (
              <PostCard key={post.id} listing={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 