import Link from "next/link";
import { ArrowLeft, Clock, Users, MessageSquare, Shield, Heart } from "lucide-react";

export default function RoommateHarmonyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>
      
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Living Tips</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>6 min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Roommate Harmony: Living with New People
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Navigate the challenges of living with roommates you don't know. Tips for communication, 
            setting boundaries, and creating a positive living environment.
          </p>
        </header>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The First Week: Setting the Foundation</h2>
            <p className="text-gray-700 mb-4">
              Your first week living with new roommates sets the tone for your entire living experience. 
              Take this time to establish open communication and clear expectations.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800 font-medium">Pro Tip:</p>
              <p className="text-blue-700">Schedule a roommate meeting within the first 48 hours to discuss house rules, schedules, and expectations.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Topics to Discuss</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Preferences
                </h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• How do you prefer to handle conflicts?</li>
                  <li>• What's your communication style?</li>
                  <li>• How should we share important updates?</li>
                  <li>• What's your schedule like?</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  House Rules & Boundaries
                </h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Quiet hours and noise levels</li>
                  <li>• Guest policies</li>
                  <li>• Shared space usage</li>
                  <li>• Personal space respect</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating a Roommate Agreement</h2>
            <p className="text-gray-700 mb-4">
              A written roommate agreement helps prevent misunderstandings and provides a reference 
              for resolving conflicts. Here's what to include:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Financial Responsibilities</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Rent payment schedule and method</li>
                  <li>• Utility bill division and payment</li>
                  <li>• Shared household items and costs</li>
                  <li>• Late payment consequences</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Chores and Cleaning</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Weekly cleaning schedule</li>
                  <li>• Kitchen and bathroom maintenance</li>
                  <li>• Trash and recycling duties</li>
                  <li>• Deep cleaning responsibilities</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Shared Spaces and Items</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Kitchen storage and food sharing</li>
                  <li>• Living room TV and entertainment</li>
                  <li>• Bathroom supplies and towels</li>
                  <li>• Laundry machine usage</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conflict Resolution Strategies</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-400 bg-green-50 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Address Issues Early</h3>
                <p className="text-green-700 text-sm">
                  Don't let small annoyances build up. Address concerns calmly and directly when they arise.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Use "I" Statements</h3>
                <p className="text-blue-700 text-sm">
                  Instead of "You're always messy," try "I feel frustrated when the kitchen isn't cleaned up."
                </p>
              </div>
              
              <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Find Compromises</h3>
                <p className="text-purple-700 text-sm">
                  Be willing to meet halfway. Not every issue needs a winner and loser.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-400 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Involve a Mediator</h3>
                <p className="text-orange-700 text-sm">
                  If conflicts persist, consider asking a mutual friend or RA to help mediate.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Building Positive Relationships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Small Gestures Matter
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Offer to share meals occasionally</li>
                  <li>• Remember important dates</li>
                  <li>• Be considerate of their schedule</li>
                  <li>• Show interest in their life</li>
                  <li>• Offer help when they're stressed</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Create Shared Experiences
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Plan occasional roommate dinners</li>
                  <li>• Watch movies or shows together</li>
                  <li>• Decorate shared spaces together</li>
                  <li>• Celebrate birthdays and achievements</li>
                  <li>• Support each other's goals</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Roommate Issues and Solutions</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Issue: Different Sleep Schedules</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Solution:</strong> Establish quiet hours and use white noise machines or earplugs. 
                  Consider using a shared calendar to coordinate schedules.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Issue: Messy vs. Clean Roommates</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Solution:</strong> Create specific cleaning schedules and use visual reminders. 
                  Consider using apps to track and rotate chores.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Issue: Food and Kitchen Conflicts</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Solution:</strong> Label personal items clearly, establish food sharing rules, 
                  and create a system for shared groceries.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Issue: Frequent Guests</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Solution:</strong> Set clear guest policies, establish advance notice requirements, 
                  and discuss overnight guest limits.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Things Don't Work Out</h2>
            <p className="text-gray-700 mb-4">
              Sometimes, despite best efforts, roommate relationships don't work out. Here's how to handle it gracefully:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">Steps to Take:</h3>
              <ol className="text-yellow-700 space-y-2">
                <li>1. Have an honest conversation about the issues</li>
                <li>2. Try to find compromises and solutions together</li>
                <li>3. If problems persist, discuss the possibility of one person moving out</li>
                <li>4. Give adequate notice (usually 30-60 days)</li>
                <li>5. Handle the transition professionally and respectfully</li>
                <li>6. Learn from the experience for future roommate situations</li>
              </ol>
            </div>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-purple-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Find Your Perfect Roommate Match?</h3>
          <p className="text-gray-700 mb-4">
            Browse available subleases and find roommates who share your lifestyle and values.
          </p>
          <Link 
            href="/listings"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Available Subleases
          </Link>
        </div>
      </article>
    </div>
  );
} 