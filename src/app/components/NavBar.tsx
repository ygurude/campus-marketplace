import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";

// Example prop type (customize as needed)
type NavBarProps = {
  user?: {
    name: string;
    avatar?: string;
  };
  onLogout?: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ user, onLogout }) => {
  return (
    <header className="w-full border-b border-[var(--border)] bg-white sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] hover:opacity-80 transition-opacity">
          Campus <span className="text-black">Marketplace</span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/listings"><Button variant="ghost">Browse</Button></Link>
          <Link href="/blog"><Button variant="ghost">Blog</Button></Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-2 cursor-pointer">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login"><Button variant="ghost">Login</Button></Link>
              <Link href="/signup"><Button>Sign Up</Button></Link>
            </>
          )}
          <Link href={user ? "/dashboard/listings/new" : "/login"}>
            <Button className="ml-2" size="lg">List Your Place</Button>
          </Link>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <div className="flex flex-col gap-2 p-4">
                <Link href="/listings"><Button variant="ghost" className="w-full justify-start">Browse</Button></Link>
                <Link href="/blog"><Button variant="ghost" className="w-full justify-start">Blog</Button></Link>
                {user ? (
                  <>
                    <Link href="/dashboard"><Button variant="ghost" className="w-full justify-start">Dashboard</Button></Link>
                    <Link href="/dashboard/profile"><Button variant="ghost" className="w-full justify-start">Profile</Button></Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login"><Button variant="ghost" className="w-full justify-start">Login</Button></Link>
                    <Link href="/signup"><Button className="w-full justify-start">Sign Up</Button></Link>
                  </>
                )}
                <Link href={user ? "/dashboard/listings/new" : "/login"}>
                  <Button className="w-full mt-2">List Your Place</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;