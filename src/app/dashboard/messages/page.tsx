"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const messages = [
  { sender: "Alex G.", subject: "Interested in your UCLA sublease", snippet: "Hi! Is your apartment still available for the fall semester?" },
  { sender: "Sam T.", subject: "Tour request", snippet: "Can I schedule a tour for next week?" },
  { sender: "Taylor R.", subject: "Roommate question", snippet: "Is the room furnished and are utilities included?" },
];

export default function MessagesPage() {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/dashboard');
          }
        }}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-white border border-[var(--border)] rounded-xl p-4 flex flex-col gap-1">
            <span className="font-semibold text-[var(--foreground)]">{msg.sender}</span>
            <span className="text-gray-700">{msg.subject}</span>
            <span className="text-gray-500 text-sm truncate">{msg.snippet}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 