import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Listing {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  university: string;
  roomType: 'Studio' | '1BR' | '2BR' | 'Shared';
  startDate: string;
  endDate: string;
  tags: string[];
  images: string[];
  amenities: string[];
  distance: string;
  userId: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isFurnished: boolean;
  utilitiesIncluded: boolean;
  petsAllowed: boolean;
  parkingAvailable: boolean;
  contactPhone?: string;
  contactEmail?: string;
}

// Create new listing
export const createListing = async (listingData: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const listingWithTimestamps = {
      ...listingData,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, 'listings'), listingWithTimestamps);
    return { id: docRef.id, ...listingWithTimestamps };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get all listings
export const getAllListings = async (): Promise<Listing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'listings'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Listing[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get listing by ID
export const getListingById = async (id: string): Promise<Listing | null> => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Listing;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get listings by user
export const getListingsByUser = async (userId: string): Promise<Listing[]> => {
  try {
    // First try with ordering
    const q = query(
      collection(db, 'listings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Listing[];
  } catch (error: any) {
    // If composite index error, fall back to simple query
    if (error.message.includes('index')) {
      console.log('Creating composite index for user listings... falling back to simple query');
      const q = query(
        collection(db, 'listings'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as Listing[];
    }
    throw new Error(error.message);
  }
};

// Search listings with filters
export const searchListings = async (filters: {
  university?: string;
  minPrice?: number;
  maxPrice?: number;
  roomType?: string;
  startDate?: string;
  endDate?: string;
  isFurnished?: boolean;
  petsAllowed?: boolean;
}): Promise<Listing[]> => {
  try {
    const constraints: QueryConstraint[] = [where('isActive', '==', true)];
    
    if (filters.university) {
      constraints.push(where('university', '==', filters.university));
    }
    if (filters.minPrice !== undefined) {
      constraints.push(where('price', '>=', filters.minPrice));
    }
    if (filters.maxPrice !== undefined) {
      constraints.push(where('price', '<=', filters.maxPrice));
    }
    if (filters.roomType) {
      constraints.push(where('roomType', '==', filters.roomType));
    }
    if (filters.isFurnished !== undefined) {
      constraints.push(where('isFurnished', '==', filters.isFurnished));
    }
    if (filters.petsAllowed !== undefined) {
      constraints.push(where('petsAllowed', '==', filters.petsAllowed));
    }

    const q = query(collection(db, 'listings'), ...constraints, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Listing[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update listing
export const updateListing = async (id: string, updates: Partial<Listing>) => {
  try {
    const docRef = doc(db, 'listings', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete listing
export const deleteListing = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'listings', id));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get featured listings (most recent active listings)
export const getFeaturedListings = async (limitCount: number = 8): Promise<Listing[]> => {
  try {
    // First try to get active listings with ordering
    const q = query(
      collection(db, 'listings'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Listing[];
  } catch (error: any) {
    // If composite index error, fall back to simple query
    if (error.message.includes('index')) {
      console.log('Creating composite index... falling back to simple query');
      const q = query(
        collection(db, 'listings'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter((listing: any) => listing.isActive)
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limitCount) as Listing[];
    }
    throw new Error(error.message);
  }
}; 