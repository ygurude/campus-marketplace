'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/context/AuthContext';
import { createListing } from '../../lib/services/listings';
import { ArrowLeft } from 'lucide-react';

const universities = ["UCLA", "UT Austin", "UMich", "NYU"];
const roomTypes = ["Studio", "1BR", "2BR", "Shared"];

export default function PostPage() {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [university, setUniversity] = useState('');
  const [roomType, setRoomType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tags, setTags] = useState('');
  const [isFurnished, setIsFurnished] = useState(false);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [distance, setDistance] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to post a listing');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await createListing({
        title,
        description,
        price: parseInt(price),
        location,
        university,
        roomType: roomType as 'Studio' | '1BR' | '2BR' | 'Shared',
        startDate,
        endDate,
        tags: tagsArray,
        images: [], // TODO: Add image upload functionality
        amenities: [],
        distance,
        userId: user.uid,
        userEmail: user.email!,
        userName: userData?.displayName || user.displayName || 'Anonymous',
        isActive: true,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
        parkingAvailable,
      });

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
      return (
      <div className="w-full max-w-2xl mx-auto mt-10 bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 flex flex-col gap-8">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push('/dashboard');
            }
          }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-2 w-fit"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Post a Sublease</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              placeholder="Cozy Studio Near Campus"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              rows={4} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              placeholder="Describe your apartment, amenities, and anything else students should know!"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <select 
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
            >
              <option value="">Select University</option>
              {universities.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              placeholder="e.g., Westwood, Los Angeles, CA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Distance to Campus</label>
            <input 
              type="text" 
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              placeholder="e.g., 0.5 mi"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Lease Start</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Lease End</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Monthly Price ($)</label>
              <input 
                type="number" 
                min="0" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Room Type</label>
              <select 
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--border)] px-4 py-2"
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2" 
              placeholder="Furnished, Pets allowed, Parking"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={isFurnished}
                onChange={(e) => setIsFurnished(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Furnished</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={utilitiesIncluded}
                onChange={(e) => setUtilitiesIncluded(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Utilities Included</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={petsAllowed}
                onChange={(e) => setPetsAllowed(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Pets Allowed</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={parkingAvailable}
                onChange={(e) => setParkingAvailable(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Parking Available</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Apartment Images (Coming Soon)</label>
            <input type="file" multiple disabled className="w-full rounded-lg border border-[var(--border)] px-4 py-2 bg-gray-50" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-sm transition-colors mt-2"
          >
            {loading ? 'Creating Listing...' : 'Post Sublease'}
          </button>
        </form>
        {user && (
  <button
    type="button"
    onClick={() => router.push('/listings')}
    className="mb-4 self-start bg-gray-100 hover:bg-gray-200 text-blue-700 font-semibold rounded-lg px-5 py-2 shadow border border-gray-200"
  >
    View All Listings
  </button>
)}
      </div>
    );
} 