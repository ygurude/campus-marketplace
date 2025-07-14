import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fafbfc]">
      <aside className="w-64 bg-white border-r border-[var(--border)] flex flex-col gap-2 py-8 px-6 min-h-screen">
        <Link href="/dashboard" className="text-xl font-extrabold mb-8 tracking-tight text-[var(--foreground)] hover:opacity-80 transition-opacity">Dashboard</Link>
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Overview</Link>
          <Link href="/dashboard/listings" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">My Listings</Link>
          <Link href="/dashboard/messages" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Messages</Link>
          <Link href="/blog" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Blog</Link>
          <Link href="/dashboard/profile" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Profile</Link>
        </nav>
        <Link href="/dashboard/listings/new" className="mt-8 px-4 py-2 rounded-full bg-black text-white font-semibold shadow-sm hover:bg-gray-800 transition-colors text-center">List Your Place</Link>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
} 