import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Marketplace",
  description: "Find your next student sublease!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-[var(--border)] mb-8 sticky top-0 z-50">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] hover:opacity-80 transition-opacity">
            Campus<span className="text-black"> Marketplace</span>
          </Link>
          <ul className="flex gap-4 items-center text-base font-medium">
            <li><Link href="/listings" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Browse</Link></li>
            <li><Link href="/blog" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Blog</Link></li>
            <li>
              <Link href="/login" className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Login</Link>
            </li>
            <li>
              <Link href="/signup" className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow-sm hover:bg-gray-800 transition-colors border border-black">Sign Up</Link>
            </li>
            <li>
              <Link href="/login" className="ml-2 px-5 py-2 rounded-full bg-black text-white font-semibold shadow-sm hover:bg-gray-800 transition-colors border border-black">List Your Place</Link>
            </li>
          </ul>
        </nav>
        <main className="max-w-5xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
