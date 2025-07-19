'use client';

import ListingCard from "../../components/ListingCard";
import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/context/AuthContext";
import { getListingsByUser, Listing, deleteListing, updateListing } from "../../../lib/services/listings";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Listing>>({});
  const [actionLoading, setActionLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    try {
      await deleteListing(id);
      setMyPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      alert('Failed to delete listing.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingId(listing.id || ''); // fallback to empty string if undefined
    setEditData(listing);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setEditData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSave = async () => {
    if (!editingId) return;
    setActionLoading(true);
    try {
      await updateListing(editingId, editData);
      setMyPosts((prev) => prev.map((post) => post.id === editingId ? { ...post, ...editData } : post));
      setEditingId(null);
      setEditData({});
    } catch (err) {
      alert('Failed to update listing.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

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
        console.error('Error loading my listings:', error);
        setError(error.message);
        // Fallback to static data if Firebase fails
        setMyPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadMyListings();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to view your listings.</p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/dashboard');
          }
        }}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2].map((i) => (
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
          {myPosts.map((post) => (
            <div key={post.id} className="relative">
              {editingId === post.id ? (
                <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-4 flex flex-col gap-2">
                  <input name="title" value={editData.title || ''} onChange={handleEditChange} className="border rounded px-2 py-1 mb-1" />
                  <textarea name="description" value={editData.description || ''} onChange={handleEditChange} className="border rounded px-2 py-1 mb-1" />
                  <input name="price" type="number" value={editData.price || ''} onChange={handleEditChange} className="border rounded px-2 py-1 mb-1" />
                  <input name="location" value={editData.location || ''} onChange={handleEditChange} className="border rounded px-2 py-1 mb-1" />
                  <div className="flex gap-2 mt-2">
                    <button onClick={handleEditSave} className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700" disabled={actionLoading}>Save</button>
                    <button onClick={handleEditCancel} className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200" disabled={actionLoading}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <ListingCard listing={post} />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEdit(post)} className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200">Edit</button>
                    <button onClick={() => handleDelete(post.id || '')} className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200" disabled={actionLoading}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 