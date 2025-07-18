# Firebase Setup Guide

## Overview
This campus marketplace app is now connected to Firebase for:
- User authentication
- Listing storage and management
- Messaging between users
- Real-time data updates
- Image storage

## Firebase Collections

The app uses the following Firestore collections:

### 1. `users`
Stores user profile information:
```typescript
{
  uid: string;
  email: string;
  displayName?: string;
  university?: string;
  phone?: string;
  createdAt: Date;
  isVerified: boolean;
}
```

### 2. `listings`
Stores property listings:
```typescript
{
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
```

### 3. `messages`
Stores user messages:
```typescript
{
  id?: string;
  listingId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  listingTitle?: string;
  listingImage?: string;
}
```

## Environment Variables

Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Security Rules

### Firestore Security Rules

You'll need to set up Firestore security rules. Here's a basic example:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read listings, authenticated users can create/update their own
    match /listings/{listingId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Users can read/write messages they're involved in
    match /messages/{messageId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.senderId || 
         request.auth.uid == resource.data.receiverId);
    }
  }
}
```

### Firebase Storage Security Rules

**IMPORTANT**: You must also set up Firebase Storage security rules to allow image uploads. Go to Firebase Console > Storage > Rules and set these rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload images to listing-images folder
    match /listing-images/{imageId} {
      allow read: if true;  // Anyone can view images
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
    
    // Allow authenticated users to upload profile images
    match /profile-images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Default rule - deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

**Note**: If you're still getting CORS errors after setting these rules, you may need to:
1. Wait a few minutes for the rules to propagate
2. Clear your browser cache
3. Make sure your Firebase project is on the Blaze (pay-as-you-go) plan, as Storage requires it

## Features Implemented

### Authentication
- ✅ User registration with email/password
- ✅ User login/logout
- ✅ User profile management
- ✅ Authentication state management

### Listings
- ✅ Create new listings
- ✅ View all listings
- ✅ Search and filter listings
- ✅ Featured listings on homepage
- ✅ User's own listings in dashboard
- ✅ Image upload functionality

### Messaging (Ready for Implementation)
- ✅ Message service created
- ✅ Real-time message listening
- ✅ Conversation management

## Next Steps

1. **Add your Firebase credentials** to `.env.local`
2. **Set up Firestore security rules** in Firebase Console
3. **Set up Firebase Storage security rules** in Firebase Console (IMPORTANT for image uploads)
4. **Enable Authentication** in Firebase Console (Email/Password)
5. **Upgrade to Blaze plan** if needed for Storage
6. **Test the app** by creating an account and posting listings

## Testing the Integration

1. Start the development server: `npm run dev`
2. Navigate to `/signup` to create an account
3. Create a listing at `/dashboard/listings/new`
4. View listings at `/listings`
5. Check your dashboard at `/dashboard`

The app will fallback to static data if Firebase is not configured, so you can test the UI even without Firebase setup. 