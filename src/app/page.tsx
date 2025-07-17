'use client';

import Image from "next/image";
import PostCard from "./components/PostCard";
import { useEffect, useState } from "react";
import { getFeaturedListings, Listing } from "../lib/services/listings";

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        console.log('Loading featured posts from Firebase...');
        const posts = await getFeaturedListings(4);
        console.log('Featured posts loaded:', posts);
        setFeaturedPosts(posts);
      } catch (error) {
        console.error('Error loading featured posts:', error);
        // Fallback to static data if Firebase fails
        console.log('Using fallback static data');
        setFeaturedPosts([
          {
            id: '1',
            title: 'Cozy Studio Near UCLA',
            description: 'Furnished studio apartment',
            price: 1200,
            location: "UCLA, Los Angeles, CA",
            university: 'UCLA',
            roomType: 'Studio',
            startDate: '2024-07-01',
            endDate: '2024-12-31',
            tags: ["Furnished", "Pets allowed"],
            images: ["/images/standard.jpeg"],
            amenities: [],
            distance: "0.5 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: true,
            utilitiesIncluded: false,
            petsAllowed: true,
            parkingAvailable: false,
          },
          {
            id: '2',
            title: 'Modern 1BR Near UT Austin',
            description: 'Private bathroom included',
            price: 950,
            location: "UT Austin, Austin, TX",
            university: 'UT Austin',
            roomType: '1BR',
            startDate: '2024-08-15',
            endDate: '2024-12-15',
            tags: ["Utilities incl.", "Private bath"],
            images: ["/images/mark.jpeg"],
            amenities: [],
            distance: "1.2 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: false,
            utilitiesIncluded: true,
            petsAllowed: false,
            parkingAvailable: false,
          },
          {
            id: '3',
            title: 'Shared Room Near UMich',
            description: 'Looking for roommate',
            price: 800,
            location: "UMich, Ann Arbor, MI",
            university: 'UMich',
            roomType: 'Shared',
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            tags: ["Roommate needed", "Parking"],
            images: ["/images/sq5.jpeg"],
            amenities: [],
            distance: "0.8 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: false,
            utilitiesIncluded: false,
            petsAllowed: false,
            parkingAvailable: true,
          },
          {
            id: '4',
            title: 'Luxury 2BR Near NYU',
            description: 'Fully furnished with gym access',
            price: 1100,
            location: "NYU, New York, NY",
            university: 'NYU',
            roomType: '2BR',
            startDate: '2024-09-01',
            endDate: '2025-05-31',
            tags: ["Furnished", "Gym"],
            images: ["/images/hub.jpeg"],
            amenities: [],
            distance: "0.3 mi",
            userId: '',
            userEmail: '',
            userName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
            isFurnished: true,
            utilitiesIncluded: false,
            petsAllowed: false,
            parkingAvailable: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);
  return (
    <div className="flex flex-col gap-16 items-center w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center gap-8 mt-16 mb-8 px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[var(--foreground)] text-center leading-tight drop-shadow-md">
          Campus Marketplace
        </h1>
        <p className="text-xl sm:text-2xl text-gray-500 text-center max-w-2xl mb-2">
          The easiest way for students to find and list subleases near campus. Safe, simple, and made for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="/listings"
            className="bg-primary hover:bg-[var(--accent2)] text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-md transition-colors text-center"
          >
            Browse Subleases
          </a>
          <a
            href="/signup"
            className="bg-white border border-primary hover:bg-secondary text-primary font-semibold rounded-lg px-8 py-3 text-lg shadow-md transition-colors text-center"
          >
            List Your Place
          </a>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm">Trusted by students at</span>
          <div className="flex gap-6 mt-2 opacity-80">
            <Image src="/icons/globe.svg" alt="UCLA" width={32} height={32} />
            <Image src="/icons/file.svg" alt="UT Austin" width={32} height={32} />
            <Image src="/icons/window.svg" alt="UMich" width={32} height={32} />
            <Image src="/icons/vercel.svg" alt="NYU" width={32} height={32} />
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Featured Rooms</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-xl shadow-sm h-64 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredPosts.map((post) => {
              return <PostCard key={post.id} listing={post} />;
            })}
          </div>
        )}
      </section>

      {/* How it Works */}
      <section className="w-full max-w-5xl py-16 bg-secondary rounded-xl mt-12">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black bg-white">
              <span className="text-2xl font-bold text-black">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Your Perfect Place</h3>
            <p className="text-gray-600">Browse thousands of student subleases near your campus. Filter by price, location, and amenities.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black bg-white">
              <span className="text-2xl font-bold text-black">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect & Tour</h3>
            <p className="text-gray-600">Message landlords directly, schedule tours, and ask questions. No middlemen, just direct communication.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black bg-white">
              <span className="text-2xl font-bold text-black">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Move In & Enjoy</h3>
            <p className="text-gray-600">Sign your lease, move in, and start your new chapter. We're here to make it seamless.</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="w-full bg-[var(--accent2)]/10 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Trusted by Students Nationwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Listings Posted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-5xl py-16">
        <h2 className="text-3xl font-bold text-[var(--accent2)] mb-12 text-center">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 mb-4">"Found my perfect apartment in just 2 days! The process was so easy and the landlord was super responsive."</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">S</span>
              </div>
              <div>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">UCLA Student</div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 mb-4">"As a landlord, I love how easy it is to list my properties and connect with serious students."</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">M</span>
              </div>
              <div>
                <div className="font-semibold">Mike R.</div>
                <div className="text-sm text-gray-500">Property Owner</div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 mb-4">"The verification system gives me peace of mind. I know I'm dealing with real students and verified properties."</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">J</span>
              </div>
              <div>
                <div className="font-semibold">Jessica L.</div>
                <div className="text-sm text-gray-500">NYU Student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-primary text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Campus Marketplace</h3>
              <p className="text-gray-400 mb-4">The easiest way for students to find and list subleases near campus.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/listings" className="hover:text-white transition-colors">Browse Subleases</a></li>
                <li><a href="/signup" className="hover:text-white transition-colors">Create Account</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Student Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Landlords</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/signup" className="hover:text-white transition-colors">List Your Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Landlord Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--accent2)] mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 Campus Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
