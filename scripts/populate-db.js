const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Firebase config - make sure these match your .env.local file
const firebaseConfig = {
  apiKey: "AIzaSyDmoVXj-iD4IkqxC4fiVFQbgtywJVIKH0A",
  authDomain: "campus-marketplace-417c8.firebaseapp.com",
  projectId: "campus-marketplace-417c8",
  storageBucket: "campus-marketplace-417c8.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleListings = [
  {
    title: 'Cozy Studio Near UCLA',
    description: 'Furnished studio apartment with modern amenities, perfect for students. Walking distance to campus and local restaurants.',
    price: 1200,
    location: "UCLA, Los Angeles, CA",
    university: 'UCLA',
    roomType: 'Studio',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    tags: ["Furnished", "Pets allowed", "Utilities included"],
    images: ["/images/standard.jpeg"],
    amenities: ["WiFi", "Laundry", "Kitchen", "AC"],
    distance: "0.5 mi",
    userId: 'sample-user-1',
    userEmail: 'john@student.edu',
    userName: 'John Student',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isActive: true,
    isFurnished: true,
    utilitiesIncluded: true,
    petsAllowed: true,
    parkingAvailable: false,
  },
  {
    title: 'Modern 1BR Near UT Austin',
    description: 'Private bathroom included with spacious living area. Great location near campus and shopping centers.',
    price: 950,
    location: "UT Austin, Austin, TX",
    university: 'UT Austin',
    roomType: '1BR',
    startDate: '2024-08-15',
    endDate: '2024-12-15',
    tags: ["Utilities incl.", "Private bath", "Parking"],
    images: ["/images/mark.jpeg"],
    amenities: ["WiFi", "Private Bathroom", "Parking", "Gym Access"],
    distance: "1.2 mi",
    userId: 'sample-user-2',
    userEmail: 'sarah@student.edu',
    userName: 'Sarah Johnson',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    isActive: true,
    isFurnished: false,
    utilitiesIncluded: true,
    petsAllowed: false,
    parkingAvailable: true,
  },
  {
    title: 'Shared Room Near UMich',
    description: 'Looking for roommate to share this spacious room. Great for making friends and saving money!',
    price: 800,
    location: "UMich, Ann Arbor, MI",
    university: 'UMich',
    roomType: 'Shared',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    tags: ["Roommate needed", "Parking", "Furnished"],
    images: ["/images/sq5.jpeg"],
    amenities: ["WiFi", "Shared Bathroom", "Kitchen", "Study Area"],
    distance: "0.8 mi",
    userId: 'sample-user-3',
    userEmail: 'mike@student.edu',
    userName: 'Mike Chen',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    isActive: true,
    isFurnished: true,
    utilitiesIncluded: false,
    petsAllowed: false,
    parkingAvailable: true,
  },
  {
    title: 'Luxury 2BR Near NYU',
    description: 'Fully furnished with gym access and doorman. Premium location in the heart of the city.',
    price: 1100,
    location: "NYU, New York, NY",
    university: 'NYU',
    roomType: '2BR',
    startDate: '2024-09-01',
    endDate: '2025-05-31',
    tags: ["Furnished", "Gym", "Doorman", "Premium"],
    images: ["/images/hub.jpeg"],
    amenities: ["WiFi", "Gym", "Doorman", "Laundry", "Kitchen"],
    distance: "0.3 mi",
    userId: 'sample-user-4',
    userEmail: 'emma@student.edu',
    userName: 'Emma Wilson',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    isActive: true,
    isFurnished: true,
    utilitiesIncluded: false,
    petsAllowed: false,
    parkingAvailable: false,
  },
  {
    title: 'Spacious Studio Near USC',
    description: 'Large studio with lots of natural light. Perfect for students who want their own space.',
    price: 1300,
    location: "USC, Los Angeles, CA",
    university: 'USC',
    roomType: 'Studio',
    startDate: '2024-07-15',
    endDate: '2024-12-15',
    tags: ["Spacious", "Natural light", "Furnished"],
    images: ["/images/standard.jpeg"],
    amenities: ["WiFi", "Large Windows", "Kitchen", "AC"],
    distance: "0.7 mi",
    userId: 'sample-user-5',
    userEmail: 'alex@student.edu',
    userName: 'Alex Rodriguez',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    isActive: true,
    isFurnished: true,
    utilitiesIncluded: true,
    petsAllowed: true,
    parkingAvailable: true,
  },
  {
    title: 'Cozy 1BR Near Stanford',
    description: 'Quiet neighborhood with easy access to campus. Perfect for graduate students.',
    price: 1400,
    location: "Stanford, Palo Alto, CA",
    university: 'Stanford',
    roomType: '1BR',
    startDate: '2024-08-01',
    endDate: '2024-12-31',
    tags: ["Quiet", "Graduate", "Furnished"],
    images: ["/images/mark.jpeg"],
    amenities: ["WiFi", "Private Bathroom", "Study Area", "Kitchen"],
    distance: "1.0 mi",
    userId: 'sample-user-6',
    userEmail: 'lisa@student.edu',
    userName: 'Lisa Thompson',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    isActive: true,
    isFurnished: true,
    utilitiesIncluded: false,
    petsAllowed: false,
    parkingAvailable: true,
  }
];

async function populateDatabase() {
  try {
    console.log('Starting to populate database...');
    
    for (const listing of sampleListings) {
      const docRef = await addDoc(collection(db, 'listings'), listing);
      console.log(`Added listing: ${listing.title} with ID: ${docRef.id}`);
    }
    
    console.log('Database populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase(); 