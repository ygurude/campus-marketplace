'use client';
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function ConditionalNavBar() {
  const pathname = usePathname();
  // Only show NavBar if not on /dashboard or its subpages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  return <NavBar />;
} 