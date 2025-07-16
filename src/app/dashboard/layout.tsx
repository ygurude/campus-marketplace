import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // TODO: Replace with real user data from context
  const user = { name: "Jane Student", avatar: undefined };
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
            <Link href="/dashboard/messages"><Button variant="ghost">Messages</Button></Link>
            <Link href="/blog"><Button variant="ghost">Blog</Button></Link>
            <Link href="/dashboard/profile"><Button variant="ghost">Profile</Button></Link>
            <Link href="/dashboard/listings/new"><Button className="ml-2" size="lg">List Your Place</Button></Link>
            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-2 cursor-pointer border border-gray-200 shadow-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
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