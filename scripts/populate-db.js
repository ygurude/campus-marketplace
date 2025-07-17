const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  // Your config here
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