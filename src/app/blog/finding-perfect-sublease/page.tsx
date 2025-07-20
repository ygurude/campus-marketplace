import Link from "next/link";
import { ArrowLeft, Clock, Calendar, DollarSign, MapPin } from "lucide-react";

export default function FindingPerfectSubleasePage() {
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
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Housing Guide</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Find the Perfect Sublease as a Student
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover proven strategies for finding affordable, safe, and convenient housing near your campus. 
            Learn about timing, budgeting, and red flags to avoid.
          </p>
        </header>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Search Early</h2>
            <p className="text-gray-700 mb-4">
              The best subleases are often snatched up quickly. Start looking 2-3 months before you need to move in, 
              especially if you're searching during peak seasons (August/January for most schools).
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800 font-medium">Pro Tip:</p>
              <p className="text-blue-700">Set up alerts on your campus marketplace and join Facebook groups for your university's housing community.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Set Your Budget Realistically</h2>
            <p className="text-gray-700 mb-4">
              Don't just consider rent - factor in utilities, internet, parking, and any additional fees. 
              A good rule of thumb is to spend no more than 30% of your monthly income on housing.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Base rent amount</li>
              <li>Utilities (electricity, water, gas)</li>
              <li>Internet and cable</li>
              <li>Parking fees</li>
              <li>Security deposit</li>
              <li>Application fees</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Location, Location, Location</h2>
            <p className="text-gray-700 mb-4">
              Consider your daily routine when choosing a location. How far is it from campus? 
              Is there reliable public transportation? Are there grocery stores and other amenities nearby?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Distance to Campus</h3>
                <p className="text-gray-700 text-sm">Walking distance is ideal, but consider bus routes and bike paths too.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Neighborhood Safety</h3>
                <p className="text-gray-700 text-sm">Research crime rates and talk to current students about the area.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Red Flags to Watch For</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-3">🚩 Warning Signs:</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Landlord refuses to show you the actual unit</li>
                <li>• Pressure to sign immediately without reading the lease</li>
                <li>• Unusually low rent for the area (could be a scam)</li>
                <li>• No written lease or unclear terms</li>
                <li>• Landlord asks for payment before you've seen the place</li>
                <li>• Poor communication or evasive answers to questions</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions to Ask Before Signing</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About the Property:</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• What's included in the rent?</li>
                  <li>• How are utilities handled?</li>
                  <li>• What's the parking situation?</li>
                  <li>• Are pets allowed?</li>
                  <li>• What's the policy on guests?</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About the Lease:</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• What's the exact lease term?</li>
                  <li>• What's the security deposit amount?</li>
                  <li>• What are the penalties for breaking the lease?</li>
                  <li>• How do I report maintenance issues?</li>
                  <li>• What's the move-out process?</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Steps Before Moving In</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Take photos of the unit's condition before moving in</li>
              <li>Get everything in writing - don't rely on verbal agreements</li>
              <li>Set up utilities in your name if required</li>
              <li>Get renter's insurance (it's usually very affordable)</li>
              <li>Meet your neighbors and exchange contact information</li>
            </ol>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Start Your Search?</h3>
          <p className="text-gray-700 mb-4">
            Browse available subleases on our platform and find your perfect student housing match.
          </p>
          <Link 
            href="/listings"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Available Subleases
          </Link>
        </div>
      </article>
    </div>
  );
} 