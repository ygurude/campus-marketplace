const universities = ["UCLA", "UT Austin", "UMich", "NYU"];
const roomTypes = ["Studio", "1BR", "2BR", "Shared"];

export default function PostPage() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white border border-[var(--border)] rounded-xl shadow-sm p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Post a Sublease</h1>
      <form className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Apartment Images</label>
          <input type="file" multiple className="w-full rounded-lg border border-[var(--border)] px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location / University</label>
          <select className="w-full rounded-lg border border-[var(--border)] px-4 py-2">
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Lease Start</label>
            <input type="date" className="w-full rounded-lg border border-[var(--border)] px-4 py-2" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Lease End</label>
            <input type="date" className="w-full rounded-lg border border-[var(--border)] px-4 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Price ($)</label>
          <input type="number" min="0" className="w-full rounded-lg border border-[var(--border)] px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Room Type</label>
          <select className="w-full rounded-lg border border-[var(--border)] px-4 py-2">
            {roomTypes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input type="text" placeholder="Furnished, Pets allowed, Parking" className="w-full rounded-lg border border-[var(--border)] px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea rows={4} className="w-full rounded-lg border border-[var(--border)] px-4 py-2" placeholder="Describe your apartment, amenities, and anything else students should know!" />
        </div>
        <button type="submit" className="bg-black hover:bg-gray-800 text-white font-semibold rounded-lg px-8 py-3 text-lg shadow-sm transition-colors mt-2">
          Post Sublease
        </button>
      </form>
    </div>
  );
} 