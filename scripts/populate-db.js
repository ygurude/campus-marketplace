const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createCollections() {
  try {
    // Create collections by adding a single document with structure
    await setDoc(doc(db, "users", "structure"), {
      uid: "",
      email: "",
      displayName: "",
      university: "",
      major: "",
      graduationYear: null,
      profilePicture: "",
      phoneNumber: "",
      createdAt: new Date(),
      isVerified: false,
      rating: 0,
      totalReviews: 0
    });

    await setDoc(doc(db, "listings", "structure"), {
      title: "",
      description: "",
      price: 0,
      location: "",
      university: "",
      propertyType: "",
      amenities: [],
      images: [],
      contactInfo: {
        phone: "",
        email: ""
      },
      availability: {
        startDate: "",
        endDate: ""
      },
      rules: [],
      utilities: {
        included: [],
        notIncluded: []
      },
      deposit: 0,
      createdAt: new Date(),
      status: "active",
      views: 0,
      favorites: 0,
      userId: ""
    });

    await setDoc(doc(db, "messages", "structure"), {
      senderId: "",
      receiverId: "",
      listingId: "",
      content: "",
      timestamp: new Date(),
      isRead: false,
      messageType: "inquiry"
    });

    console.log("Collections created with structure!");
  } catch (error) {
    console.error("Error creating collections:", error);
  }
}

createCollections(); 