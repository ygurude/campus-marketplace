import Link from "next/link";
import { ArrowLeft, Clock, Shield, AlertTriangle, MapPin, Lock, Phone } from "lucide-react";

export default function SafetyTipsPage() {
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
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Safety</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Safety Tips for Student Housing
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Essential safety considerations when choosing and living in student housing. 
            From neighborhood research to apartment security measures.
          </p>
        </header>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Researching Neighborhood Safety</h2>
            <p className="text-gray-700 mb-4">
              Before signing a lease, thoroughly research the neighborhood's safety record. 
              This information can help you make an informed decision about where to live.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Online Research
                </h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Check local crime statistics</li>
                  <li>• Read neighborhood reviews</li>
                  <li>• Look up police department reports</li>
                  <li>• Check sex offender registries</li>
                  <li>• Research recent news in the area</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Talk to Locals
                </h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Ask current students about the area</li>
                  <li>• Talk to local business owners</li>
                  <li>• Visit the neighborhood at different times</li>
                  <li>• Check with campus security</li>
                  <li>• Join local community groups online</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Apartment Security Features to Look For</h2>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Essential Security Features
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Deadbolt locks on all exterior doors</li>
                  <li>• Peepholes in front doors</li>
                  <li>• Well-lit common areas and parking</li>
                  <li>• Secure entry systems</li>
                  <li>• Window locks on all windows</li>
                  <li>• Smoke detectors and fire alarms</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Additional Security Measures</h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Security cameras in common areas</li>
                  <li>• On-site security personnel</li>
                  <li>• Gated parking or secure parking areas</li>
                  <li>• Emergency call boxes</li>
                  <li>• Regular security patrols</li>
                  <li>• Background checks for residents</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Safety Practices</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 bg-red-50 p-4">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  When Coming and Going
                </h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Always lock your door, even when leaving briefly</li>
                  <li>• Don't prop open security doors</li>
                  <li>• Be aware of your surroundings</li>
                  <li>• Walk with friends at night</li>
                  <li>• Have your keys ready before reaching your door</li>
                  <li>• Don't share your keys or access codes</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-orange-400 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-800 mb-3">Guest Safety</h3>
                <ul className="text-orange-700 space-y-2">
                  <li>• Don't let strangers into your building</li>
                  <li>• Meet delivery people at the door</li>
                  <li>• Be cautious about who you invite over</li>
                  <li>• Let roommates know about guests</li>
                  <li>• Trust your instincts about people</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Emergency Preparedness</h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Know emergency exits and evacuation routes</li>
                  <li>• Keep emergency contacts easily accessible</li>
                  <li>• Have a first aid kit</li>
                  <li>• Know how to contact building management</li>
                  <li>• Keep important documents in a safe place</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology and Safety</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Smart Security Devices</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Smart doorbell cameras</li>
                  <li>• Motion sensor lights</li>
                  <li>• Smart locks (with backup keys)</li>
                  <li>• Window sensors</li>
                  <li>• Security apps for your phone</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Digital Safety</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Don't post your address online</li>
                  <li>• Be careful with location sharing</li>
                  <li>• Secure your Wi-Fi network</li>
                  <li>• Don't share access codes digitally</li>
                  <li>• Use strong passwords for building access</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Red Flags to Watch For</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Safety Warning Signs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Property Issues:</h4>
                  <ul className="text-red-700 space-y-1">
                    <li>• Broken or missing locks</li>
                    <li>• Poor lighting in common areas</li>
                    <li>• Unsecured entry points</li>
                    <li>• Broken windows or doors</li>
                    <li>• No emergency contact information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Neighborhood Issues:</h4>
                  <ul className="text-red-700 space-y-1">
                    <li>• High crime rates in the area</li>
                    <li>• Poor street lighting</li>
                    <li>• Abandoned buildings nearby</li>
                    <li>• Lack of police presence</li>
                    <li>• No security cameras in the area</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Building a Safety Network</h2>
            <p className="text-gray-700 mb-4">
              Create a network of trusted people who can help in emergency situations:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Contacts</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Campus security office</li>
                  <li>• Local police department</li>
                  <li>• Building management</li>
                  <li>• Trusted friends or family</li>
                  <li>• Roommates' contact information</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Safety Apps</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Campus safety apps</li>
                  <li>• Emergency alert systems</li>
                  <li>• Location sharing with trusted contacts</li>
                  <li>• Personal safety apps</li>
                  <li>• Local crime alert services</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Do If You Feel Unsafe</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 bg-red-50 p-4">
                <h3 className="font-semibold text-red-800 mb-2">Immediate Actions</h3>
                <ul className="text-red-700 space-y-1">
                  <li>• Trust your instincts</li>
                  <li>• Call 911 if you're in immediate danger</li>
                  <li>• Contact campus security</li>
                  <li>• Alert your roommates</li>
                  <li>• Document any incidents</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Long-term Solutions</h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• Report issues to building management</li>
                  <li>• Consider moving if safety concerns persist</li>
                  <li>• Join neighborhood watch programs</li>
                  <li>• Advocate for better security measures</li>
                  <li>• Share concerns with other residents</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-red-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Find Safe Student Housing</h3>
          <p className="text-gray-700 mb-4">
            Browse our verified listings to find secure, well-maintained student housing options.
          </p>
          <Link 
            href="/listings"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Available Subleases
          </Link>
        </div>
      </article>
    </div>
  );
} 