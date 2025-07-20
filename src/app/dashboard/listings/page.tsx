'use client';

import ListingCard from "../../components/ListingCard";
import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/context/AuthContext";
import { getListingsByUser, Listing, deleteListing, updateListing } from "../../../lib/services/listings";
import { useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';

export default function MyListingsPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Listing>>({});
  const [actionLoading, setActionLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const roomTypes = ["Studio", "1BR", "2BR", "3BR", "4BR", "5BR", "6BR", "Shared"];

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
    setEditingId(listing.id || '');
    setEditData(listing);
    setShowEditModal(true);
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
      setShowEditModal(false);
    } catch (err) {
      alert('Failed to update listing.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
    setShowEditModal(false);
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
              <ListingCard listing={post} />
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(post)} className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200">Edit</button>
                <button onClick={() => handleDelete(post.id || '')} className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200" disabled={actionLoading}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Edit Modal */}
      {showEditModal && editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Edit Listing</h2>
              <button onClick={handleEditCancel} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  value={editData.title || ''}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={editData.description || ''}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (USD/month)</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={editData.price || ''}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Room Type</label>
                  <select
                    name="roomType"
                    value={editData.roomType || ''}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  >
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  name="location"
                  value={editData.location || ''}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  placeholder="e.g., Westwood, Los Angeles, CA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">University</label>
                <input
                  name="university"
                  value={editData.university || ''}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lease Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    value={editData.startDate || ''}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lease End Date</label>
                  <input
                    name="endDate"
                    type="date"
                    value={editData.endDate || ''}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Distance to Campus</label>
                <input
                  name="distance"
                  value={editData.distance || ''}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  placeholder="e.g., 0.5 mi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  name="tags"
                  value={Array.isArray(editData.tags) ? editData.tags.join(', ') : ''}
                  onChange={(e) => {
                    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                    setEditData(prev => ({ ...prev, tags: tagsArray }));
                  }}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
                  placeholder="Furnished, Pets allowed, Parking"
                />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFurnished"
                    checked={editData.isFurnished || false}
                    onChange={handleEditChange}
                  />
                  <span className="text-sm">Furnished</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="utilitiesIncluded"
                    checked={editData.utilitiesIncluded || false}
                    onChange={handleEditChange}
                  />
                  <span className="text-sm">Utilities Included</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="petsAllowed"
                    checked={editData.petsAllowed || false}
                    onChange={handleEditChange}
                  />
                  <span className="text-sm">Pets Allowed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="parkingAvailable"
                    checked={editData.parkingAvailable || false}
                    onChange={handleEditChange}
                  />
                  <span className="text-sm">Parking Available</span>
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleEditSave}
                  disabled={actionLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 transition-colors"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleEditCancel}
                  disabled={actionLoading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg px-6 py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 