export default function ProfilePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white border border-[var(--border)] rounded-xl p-6 mb-8">
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" defaultValue="Jane Student" className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" defaultValue="jane@student.edu" className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input type="text" defaultValue="UCLA" className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <button type="submit" className="mt-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-6 py-2 text-base transition-colors">Update Profile</button>
        </form>
      </div>
    </div>
  );
} 