# Firebase Setup Guide

## Overview
This campus marketplace app is now connected to Firebase for:
- User authentication
- Listing storage and management
- Messaging between users
- Real-time data updates

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

### Messaging (Ready for Implementation)
- ✅ Message service created
- ✅ Real-time message listening
- ✅ Conversation management

## Next Steps

1. **Add your Firebase credentials** to `.env.local`
2. **Set up Firestore security rules** in Firebase Console
3. **Enable Authentication** in Firebase Console (Email/Password)
4. **Test the app** by creating an account and posting listings

## Testing the Integration

1. Start the development server: `npm run dev`
2. Navigate to `/signup` to create an account
3. Create a listing at `/post`
4. View listings at `/listings`
5. Check your dashboard at `/dashboard`

The app will fallback to static data if Firebase is not configured, so you can test the UI even without Firebase setup. 