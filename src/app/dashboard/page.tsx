export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-2">Welcome back, Jane!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">2</span>
          <span className="text-gray-500 mt-1">Active Listings</span>
        </div>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">3</span>
          <span className="text-gray-500 mt-1">Messages</span>
        </div>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">1</span>
          <span className="text-gray-500 mt-1">Upcoming Tours</span>
        </div>
      </div>
      <div className="bg-white border border-[var(--border)] rounded-xl p-6 mt-4">
        <h2 className="text-xl font-semibold mb-2">Get started</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>List a new apartment for sublease</li>
          <li>Respond to messages from interested students</li>
          <li>Update your profile and preferences</li>
        </ul>
      </div>
    </div>
  );
} 