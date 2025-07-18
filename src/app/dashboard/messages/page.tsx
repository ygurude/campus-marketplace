// Messaging feature is currently disabled.
// import { useRouter } from 'next/navigation';
// import { ArrowLeft } from 'lucide-react';
// import { useAuth } from '../../../lib/context/AuthContext';
// import { useEffect, useState } from 'react';
// import { getMessagesBetweenUsers, Message } from '../../../lib/services/messages';

// export default function MessagesPage() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [messages, setMessages] = useState<Message[]>([]);
//   useEffect(() => {
//     async function fetchMessages() {
//       if (user) {
//         // For demo, fetch messages where user is sender or receiver (replace with your logic)
//         const msgs = await getMessagesBetweenUsers(user.uid, user.uid);
//         setMessages(msgs);
//       }
//     }
//     fetchMessages();
//   }, [user]);
//   return (
//     <div>
//       <button
//         type="button"
//         onClick={() => {
//           if (window.history.length > 1) {
//             router.back();
//           } else {
//             router.push('/dashboard');
//           }
//         }}
//         className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 w-fit"
//       >
//         <ArrowLeft className="w-5 h-5" /> Back
//       </button>
//       <h1 className="text-2xl font-bold mb-6">Messages</h1>
//       {messages.length === 0 ? (
//         <div className="text-gray-500">No messages found.</div>
//       ) : (
//         <div className="space-y-4">
//           {messages.map((msg, idx) => (
//             <div key={idx} className="bg-white border border-[var(--border)] rounded-xl p-4 shadow-sm">
//               <div className="text-gray-700 mt-1">{msg.content || ''}</div>
//               <div className="text-xs text-gray-400 mt-2">From: {msg.senderName || msg.senderId || ''}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// } 