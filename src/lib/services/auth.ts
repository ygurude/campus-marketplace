import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  university?: string;
  major?: string;
  graduationYear?: string;
  profilePicture?: string;
  phoneNumber?: string;
  createdAt: Date;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
}

// Create new user account
export const createUser = async (data: {
  email: string;
  password: string;
  displayName: string;
  university: string;
  major: string;
  graduationYear: string;
  profilePicture: string;
  phoneNumber: string;
}) => {
  try {
    // Restrict to .edu emails only
    if (!data.email.trim().toLowerCase().endsWith('.edu')) {
      throw new Error('Only .edu email addresses are allowed.');
    }
    console.log('Creating user with email:', data.email);
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    console.log('User created successfully:', user.uid);

    // Send email verification
    try {
      await sendEmailVerification(user);
    } catch (err) {
      throw new Error('Failed to send verification email. Please try again.');
    }

    // Update profile with display name
    await updateProfile(user, { displayName: data.displayName });
    console.log('Profile updated with display name');

    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: data.displayName,
      university: data.university,
      major: data.major,
      graduationYear: data.graduationYear,
      profilePicture: data.profilePicture,
      phoneNumber: data.phoneNumber,
      createdAt: new Date(),
      isVerified: false,
      rating: 0,
      totalReviews: 0,
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('User document created in Firestore');

    return { user, userData };
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Sign in user
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserData>) => {
  try {
    await setDoc(doc(db, 'users', uid), updates, { merge: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
}; 