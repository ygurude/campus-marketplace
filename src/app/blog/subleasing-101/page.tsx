import Link from "next/link";
import { ArrowLeft, Clock, FileText, AlertTriangle, CheckCircle } from "lucide-react";

export default function Subleasing101Page() {
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
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Legal Guide</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>7 min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Subleasing 101: What You Need to Know
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Master the basics of subleasing - from understanding your rights and responsibilities 
            to handling deposits and utilities. Essential knowledge for every student.
          </p>
        </header>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Subleasing?</h2>
            <p className="text-gray-700 mb-4">
              Subleasing occurs when a tenant (the original tenant) rents their apartment to someone else (the subtenant) 
              for a portion of the original lease term. The original tenant remains responsible to the landlord.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Key Points:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• You're renting from a tenant, not directly from the landlord</li>
                <li>• The original tenant is still liable for the lease</li>
                <li>• You have fewer rights than a direct tenant</li>
                <li>• Always get written permission from the landlord</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights as a Subtenant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  What You're Entitled To:
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• A habitable living space</li>
                  <li>• Privacy and quiet enjoyment</li>
                  <li>• Working utilities and appliances</li>
                  <li>• Proper notice before entry</li>
                  <li>• Return of your security deposit</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  What You're NOT Entitled To:
                </h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Direct communication with landlord</li>
                  <li>• Automatic lease renewal</li>
                  <li>• Same rights as original tenant</li>
                  <li>• Guaranteed return of deposit</li>
                  <li>• Protection from original tenant's issues</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Documents You Need</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Written Sublease Agreement
                </h3>
                <p className="text-gray-700 text-sm">
                  This should include rent amount, lease term, utilities, and house rules. 
                  Get everything in writing - never rely on verbal agreements.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Landlord's Written Permission</h3>
                <p className="text-gray-700 text-sm">
                  The original tenant must have written permission from the landlord to sublease. 
                  Ask to see this document before signing anything.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Move-in/Move-out Checklist</h3>
                <p className="text-gray-700 text-sm">
                  Document the condition of the apartment with photos and a detailed checklist. 
                  Both you and the original tenant should sign this.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Handling Money Matters</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Security Deposits</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Get a receipt for your deposit</li>
                  <li>• Understand what damages you're responsible for</li>
                  <li>• Know the timeline for deposit return</li>
                  <li>• Take photos of the apartment's condition</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Rent Payments</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Pay rent on time, every time</li>
                  <li>• Get receipts for all payments</li>
                  <li>• Use traceable payment methods (checks, bank transfers)</li>
                  <li>• Keep records of all transactions</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Utilities</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Clarify who pays for what utilities</li>
                  <li>• Get utility accounts in your name if possible</li>
                  <li>• Keep utility bills for your records</li>
                  <li>• Understand late payment policies</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Problems and Solutions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 bg-red-50 p-4">
                <h3 className="font-semibold text-red-800 mb-2">Problem: Original tenant stops paying rent</h3>
                <p className="text-red-700 text-sm">
                  <strong>Solution:</strong> You may be evicted even if you've paid your rent. 
                  Always verify the original tenant is current on their rent payments.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-400 bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Problem: Landlord doesn't know about sublease</h3>
                <p className="text-orange-700 text-sm">
                  <strong>Solution:</strong> This is illegal. Always ensure the landlord has given written permission.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Problem: Disputes over security deposit</h3>
                <p className="text-blue-700 text-sm">
                  <strong>Solution:</strong> Document everything with photos and get a detailed move-out checklist signed.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You Sign: Checklist</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-4">Essential Questions to Ask:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">About the Original Lease:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• When does the original lease end?</li>
                    <li>• Is the original tenant current on rent?</li>
                    <li>• Has the landlord approved this sublease?</li>
                    <li>• What happens if the original tenant breaks their lease?</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">About Your Sublease:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• What's the exact move-in and move-out date?</li>
                    <li>• How much is rent and when is it due?</li>
                    <li>• What utilities are included?</li>
                    <li>• What's the security deposit amount?</li>
                    <li>• Are pets or guests allowed?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-green-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Find Your Sublease?</h3>
          <p className="text-gray-700 mb-4">
            Now that you understand the basics, start your search for the perfect student housing.
          </p>
          <Link 
            href="/listings"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Available Subleases
          </Link>
        </div>
      </article>
    </div>
  );
} 