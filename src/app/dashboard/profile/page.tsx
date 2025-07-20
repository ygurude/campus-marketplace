'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, GraduationCap, Settings, LogOut } from 'lucide-react';

// University list from the listing creation form
const usColleges: string[] = [
  "UCLA", "UT Austin", "UMich", "NYU", "UC Berkeley", "Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia", "Cornell", "Duke", "USC", "UCSD", "UCSB", "UC Davis", "Northwestern", "Brown", "Rice", "Vanderbilt", "Emory", "Georgetown", "Carnegie Mellon", "University of Chicago", "University of Pennsylvania", "University of Michigan", "University of Florida", "University of Washington", "University of Wisconsin", "University of Illinois", "University of Texas", "University of North Carolina", "Boston University", "Boston College", "Purdue", "Penn State", "Ohio State", "Georgia Tech", "University of Maryland", "University of Virginia", "University of Minnesota", "University of Arizona", "Arizona State", "Rutgers", "Indiana University", "Michigan State", "Texas A&M", "Florida State", "University of Iowa", "University of Georgia", "University of Colorado", "University of Oregon", "University of Utah", "University of Kansas", "University of Oklahoma", "University of Nebraska", "University of Missouri", "University of Kentucky", "University of Tennessee", "University of Alabama", "University of Arkansas", "University of Mississippi", "University of South Carolina", "University of Louisville", "University of Connecticut", "University of Delaware", "University of New Hampshire", "University of Vermont", "University of Maine", "University of Rhode Island", "University of Hawaii", "University of Alaska", "University of Nevada", "University of New Mexico", "University of Idaho", "University of Montana", "University of Wyoming"
].sort();
import { useState, useEffect } from 'react';
import { signOutUser } from '../../../lib/services/auth';
import { useAuth } from '../../../lib/context/AuthContext';
import { updateUserProfile } from '../../../lib/services/auth';
import { updateUserListings } from '../../../lib/services/listings';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  AnimatedCard, 
  GradientText, 
  AnimatedButton, 
  AnimatedListItem,
  AnimatedBackground,
  AnimatedInput
} from '../../../components/ui/aceternity';

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
    console.log('User data updated:', userData?.university);
    setFormData({
      name: userData?.displayName || user?.displayName || '',
      university: userData?.university || '',
    });
  }, [userData, user]);
  
  const email = user?.email || '';
  const displayName = userData?.displayName || user?.displayName || 'User';
  const avatarUrl = typeof userData?.profilePicture === 'string' && userData.profilePicture
    ? userData.profilePicture
    : (typeof user?.photoURL === 'string' ? user.photoURL : undefined);
  
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
    <div className="relative min-h-screen">
      <AnimatedBackground className="opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <AnimatedCard className="p-6 mb-8" delay={0.1}>
          <div className="flex items-center gap-4 mb-6">
            <AnimatedButton 
              variant="outline" 
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push('/dashboard');
                }
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </AnimatedButton>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-600" />
              <h1 className="text-3xl font-bold">
                <GradientText>Profile Settings</GradientText>
              </h1>
            </div>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <AnimatedCard className="p-6 text-center" delay={0.2}>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24 border-4 border-blue-200 shadow-lg bg-white">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    {displayName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
                  <p className="text-gray-600">{email}</p>
                  {userData?.university && (
                    <p className="text-sm text-gray-500 mt-1">{userData.university}</p>
                  )}
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>
                <div className="text-sm text-gray-500">
                  Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <AnimatedCard className="p-8" delay={0.3}>
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Edit Profile</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedListItem delay={0.4}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Display Name
                    </label>
                    <input
                      type="text" 
                      name="name"
                      value={formData.name} 
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                    />
                  </div>
                </AnimatedListItem>

                <AnimatedListItem delay={0.5}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email" 
                      name="email"
                      value={email} 
                      disabled
                      placeholder="Your email address"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 backdrop-blur-sm transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </AnimatedListItem>

                <AnimatedListItem delay={0.6}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      University
                    </label>
                    <select
                      name="university"
                      value={formData.university} 
                      onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                    >
                      <option value="">Select your university</option>
                      {usColleges.map(university => (
                        <option key={university} value={university}>{university}</option>
                      ))}
                    </select>
                    {formData.university && (
                      <p className="text-xs text-gray-500 mt-1">Current: {formData.university}</p>
                    )}
                  </div>
                </AnimatedListItem>

                {updateMessage && (
                  <AnimatedListItem delay={0.7}>
                    <div className={`p-4 rounded-lg text-sm border ${
                      updateMessage.includes('Error') 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {updateMessage}
                    </div>
                  </AnimatedListItem>
                )}

                <AnimatedListItem delay={0.8}>
                  <button
                    type="submit" 
                    disabled={isUpdating}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg px-6 py-3 text-base transition-all shadow-lg hover:shadow-xl"
                  >
                    {isUpdating ? 'Updating Profile...' : 'Update Profile'}
                  </button>
                </AnimatedListItem>
              </form>
            </AnimatedCard>

            {/* Danger Zone */}
            <AnimatedCard className="p-6 mt-6 border-red-200 bg-red-50" delay={0.9}>
              <div className="flex items-center gap-3 mb-4">
                <LogOut className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Danger Zone</h3>
              </div>
              <p className="text-sm text-red-700 mb-4">
                Sign out of your account. You can sign back in at any time.
              </p>
              <AnimatedButton 
                variant="outline"
                onClick={async () => {
                  await signOutUser();
                  router.push('/');
                }}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </AnimatedButton>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
} 