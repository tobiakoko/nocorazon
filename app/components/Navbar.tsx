"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-brand-dark to-transparent">
      <Link href="/" className="font-display text-xl font-bold uppercase tracking-wider">
        Nocorazon
      </Link>
      <div className="flex items-center gap-8">
        <Link href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
          Music
        </Link>
        <Link href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
          About
        </Link>
        <Link href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
}
