'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { useAuth } from '../../lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // TODO: Replace with real user data from context
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        router.push('/verify-email');
      } else {
        setChecking(false);
      }
    } else {
      setChecking(false);
    }
  }, [user, router]);
  if (checking) {
    return <div className="flex min-h-screen items-center justify-center text-lg text-blue-600">Checking verification status...</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] flex flex-col">
      {/* Dashboard Menu Bar */}
      <header className="w-full shadow-sm bg-white/90 backdrop-blur border-b border-[var(--border)] sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/dashboard" className="text-2xl font-extrabold tracking-tight text-blue-700 hover:opacity-80 transition-opacity">
            <span className="text-black">Dashboard</span> 
          </Link>
          {/* Dashboard Menu */}
          <div className="flex items-center gap-2">
            <Link href="/dashboard"><Button variant="ghost">Overview</Button></Link>
            <Link href="/dashboard/listings"><Button variant="ghost">My Listings</Button></Link>
            <Link href="/dashboard/all-listings"><Button variant="ghost">Browse</Button></Link>
            {/* <Link href="/dashboard/messages"><Button variant="ghost">Messages</Button></Link> */}
            {/* <Link href="/blog"><Button variant="ghost">Blog</Button></Link> */}
            <Link href="/dashboard/profile"><Button variant="ghost">Profile</Button></Link>
            <Link href="/dashboard/listings/new"><Button className="ml-2" size="lg">List Your Place</Button></Link>
            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-2 cursor-pointer border border-gray-200 shadow-sm">
                  <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                  <AvatarFallback>{user?.displayName ? user.displayName[0] : 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">Logout</Link> {/* TODO: Wire up real logout */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>
      <main className="flex-1 p-10 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
} 