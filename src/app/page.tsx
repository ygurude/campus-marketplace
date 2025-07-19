'use client';

import Image from "next/image";
import { 
  AnimatedCard, 
  GradientText, 
  AnimatedButton, 
  AnimatedBackground,
  StatsCard,
  AnimatedListItem,
  AnimatedDivider,
  FloatingActionButton
} from "../components/ui/aceternity";
import { Users, Star, Shield, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground className="opacity-30" />
      
      <div className="relative z-10 flex flex-col gap-16 items-center w-full">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center gap-8 mt-16 mb-8 px-4">
          <AnimatedCard className="p-8 text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-center leading-tight drop-shadow-md mb-6">
              <GradientText>Campus Marketplace</GradientText>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 text-center max-w-2xl mb-8">
              The easiest way for students to find and list subleases near campus. Safe, simple, and made for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton variant="gradient" onClick={() => window.location.href = '/listings'}>
                Browse Subleases
              </AnimatedButton>
              <AnimatedButton variant="outline" onClick={() => window.location.href = '/signup'}>
                List Your Place
              </AnimatedButton>
            </div>
          </AnimatedCard>
          
          <AnimatedCard className="p-6" delay={0.2}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-500 text-sm font-medium">Trusted by students at</span>
              <div className="flex gap-6 mt-2 opacity-80">
                <Image src="/icons/globe.svg" alt="UCLA" width={32} height={32} />
                <Image src="/icons/file.svg" alt="UT Austin" width={32} height={32} />
                <Image src="/icons/window.svg" alt="UMich" width={32} height={32} />
                <Image src="/icons/vercel.svg" alt="NYU" width={32} height={32} />
              </div>
            </div>
          </AnimatedCard>
        </section>

        {/* How it Works */}
        <section className="w-full max-w-6xl px-4">
          <AnimatedCard className="p-8" delay={0.4}>
            <h2 className="text-3xl font-bold text-center mb-12">
              <GradientText>How it Works</GradientText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedListItem delay={0.5}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Find Your Perfect Place</h3>
                  <p className="text-gray-600">Browse thousands of student subleases near your campus. Filter by price, location, and amenities.</p>
                </div>
              </AnimatedListItem>
              
              <AnimatedListItem delay={0.6}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect & Tour</h3>
                  <p className="text-gray-600">Message landlords directly, schedule tours, and ask questions. No middlemen, just direct communication.</p>
                </div>
              </AnimatedListItem>
              
              <AnimatedListItem delay={0.7}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Move In & Enjoy</h3>
                  <p className="text-gray-600">Sign your lease, move in, and start your new chapter. We're here to make it seamless.</p>
                </div>
              </AnimatedListItem>
            </div>
          </AnimatedCard>
        </section>

        {/* Statistics */}
        <section className="w-full max-w-6xl px-4">
          <AnimatedCard className="p-8" delay={0.8}>
            <h2 className="text-3xl font-bold text-center mb-12">
              <GradientText>Trusted by Students Nationwide</GradientText>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatsCard title="Active Students" value="50K+" icon={Users} delay={0.9} />
              <StatsCard title="Universities" value="200+" icon={HomeIcon} delay={1.0} />
              <StatsCard title="Listings Posted" value="10K+" icon={Star} delay={1.1} />
              <StatsCard title="Satisfaction Rate" value="98%" icon={Shield} delay={1.2} />
            </div>
          </AnimatedCard>
        </section>

        {/* Testimonials */}
        <section className="w-full max-w-6xl px-4">
          <AnimatedCard className="p-8" delay={1.3}>
            <h2 className="text-3xl font-bold text-center mb-12">
              <GradientText>What Students Say</GradientText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedListItem delay={1.4}>
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
                  <p className="text-gray-600 mb-4">"Found my perfect apartment in just 2 days! The process was so easy and the landlord was super responsive."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                      S
                    </div>
                    <div>
                      <div className="font-semibold">Sarah M.</div>
                      <div className="text-sm text-gray-500">UCLA Student</div>
                    </div>
                  </div>
                </div>
              </AnimatedListItem>
              
              <AnimatedListItem delay={1.5}>
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
                  <p className="text-gray-600 mb-4">"As a landlord, I love how easy it is to list my properties and connect with serious students."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                      M
                    </div>
                    <div>
                      <div className="font-semibold">Mike R.</div>
                      <div className="text-sm text-gray-500">Property Owner</div>
                    </div>
                  </div>
                </div>
              </AnimatedListItem>
              
              <AnimatedListItem delay={1.6}>
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
                  <p className="text-gray-600 mb-4">"The verification system gives me peace of mind. I know I'm dealing with real students and verified properties."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                      J
                    </div>
                    <div>
                      <div className="font-semibold">Jessica L.</div>
                      <div className="text-sm text-gray-500">NYU Student</div>
                    </div>
                  </div>
                </div>
              </AnimatedListItem>
            </div>
          </AnimatedCard>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gradient-to-r from-slate-800 to-blue-900 text-white py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  <GradientText>Campus Marketplace</GradientText>
                </h3>
                <p className="text-gray-300 mb-4">The easiest way for students to find and list subleases near campus.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">For Students</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/listings" className="hover:text-white transition-colors">Browse Subleases</a></li>
                  <li><a href="/signup" className="hover:text-white transition-colors">Create Account</a></li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Student Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">For Landlords</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/signup" className="hover:text-white transition-colors">List Your Property</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Landlord Guide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <AnimatedDivider className="my-8" />
            <div className="text-center text-white/80">
              <p>&copy; 2024 Campus Marketplace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <FloatingActionButton onClick={() => window.location.href = '/post'}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </FloatingActionButton>
    </div>
  );
}
