'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOutUser } from '../../../lib/services/auth';
import { useAuth } from '../../../lib/context/AuthContext';
import { updateUserProfile } from '../../../lib/services/auth';
import { updateUserListings } from '../../../lib/services/listings';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function ProfilePage() {
  const router = useRouter();
  const { user, userData, refreshUserData } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [formData, setFormData] = useState({
    name: userData?.displayName || user?.displayName || '',
    university: userData?.university || '',
  });
  
  // Update form data when user data changes
  useEffect(() => {
    setFormData({
      name: userData?.displayName || user?.displayName || '',
      university: userData?.university || '',
    });
  }, [userData, user]);
  
  const email = user?.email || '';
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    
    setIsUpdating(true);
    setUpdateMessage('');
    
    try {
      const newDisplayName = formData.name;
      const newUniversity = formData.university;
      
      // Update Firebase Auth profile
      if (newDisplayName !== (userData?.displayName || user?.displayName || '')) {
        await updateProfile(auth.currentUser!, { displayName: newDisplayName });
      }
      
      // Update Firestore user data
      const updates: any = {};
      if (newDisplayName !== (userData?.displayName || user?.displayName || '')) updates.displayName = newDisplayName;
      if (newUniversity !== (userData?.university || '')) updates.university = newUniversity;
      
      if (Object.keys(updates).length > 0) {
        await updateUserProfile(user.uid, updates);
        
        // Update existing listings if name changed
        if (newDisplayName !== (userData?.displayName || user?.displayName || '')) {
          await updateUserListings(user.uid, { userName: newDisplayName });
        }
      }
      
      // Refresh user data to show updated values
      await refreshUserData();
      
      setUpdateMessage('Profile updated successfully!');
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (error: any) {
      setUpdateMessage(`Error updating profile: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="max-w-lg">
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
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white border border-[var(--border)] rounded-xl p-6 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={email} 
              disabled
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input 
              type="text" 
              name="university"
              value={formData.university} 
              onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" 
            />
          </div>
          {updateMessage && (
            <div className={`p-3 rounded-lg text-sm ${updateMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {updateMessage}
            </div>
          )}
          <button 
            type="submit" 
            disabled={isUpdating}
            className="mt-2 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 text-base transition-colors"
          >
            {isUpdating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
      <button
        type="button"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-3 text-base transition-colors shadow mt-4"
        onClick={async () => {
          await signOutUser();
          router.push('/');
        }}
      >
        Sign Out
      </button>
    </div>
  );
} 