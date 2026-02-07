"use client";

import React, { useState, useEffect } from "react";
import { NAV_SOCIALS, MUSIC_PLATFORMS } from "@/lib/constants";
import { Disc, Menu, X } from "lucide-react"; // Added Disc for a generic music icon if needed
import Link from "next/link";
import { cn } from "@/lib/utils"; // Assuming you have a clsx/tailwind-merge utility, if not standard template literals work

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 px-6 md:px-10 transition-all duration-300 ease-in-out border-b",
          scrolled
            ? "bg-brand-dark/70 backdrop-blur-md py-4 border-white/10 shadow-lg"
            : "bg-transparent py-6 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          
          {/* LEFT: Social Icons (Hidden on mobile to save space, or kept minimal) */}
          <div className="hidden md:flex gap-6 items-center">
            {NAV_SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white/70 hover:text-brand-pink transition-colors duration-200"
                aria-label={social.name}
              >
                <span className="absolute -inset-2 bg-white/5 scale-0 rounded-full group-hover:scale-100 transition-transform duration-200" />
                <div className="relative">
                  {social.icon && <social.icon size={20} />}
                </div>
              </a>
            ))}
          </div>

          {/* MOBILE TOGGLE (Visible only on small screens) */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* CENTER: Logo / Brand Name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="group flex flex-col items-center">
              <span className="font-display font-bold text-xl tracking-[0.2em] uppercase group-hover:text-brand-pink transition-colors">
                Nocorazon
              </span>
              {/* Japanese Subtext that appears on hover */}
              <span className="text-[10px] text-brand-pink opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-widest absolute -bottom-3">
                ノコラゾン
              </span>
            </Link>
          </div>

          {/* RIGHT: Music Platforms (The "Cyberpunk" HUD style) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                <Disc size={14} className={`text-brand-pink ${scrolled ? 'animate-spin-slow' : ''}`} />
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                    Stream Now
                </span>
            </div>
            
            <div className="flex gap-4">
                {MUSIC_PLATFORMS.map((platform) => (
                <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold tracking-widest hover:text-brand-pink transition-colors uppercase relative group"
                >
                    {platform.icon && <platform.icon size={20} className="inline-block mr-1" />}
                </a>
                ))}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={cn(
        "fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center items-center gap-8 md:hidden",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col items-center gap-6">
            <p className="text-brand-pink font-mono text-xs tracking-widest mb-4">SOCIALS</p>
            <div className="flex gap-6">
                {NAV_SOCIALS.map((social) => (
                    <a key={social.name} href={social.url} className="p-4 bg-white/5 rounded-full hover:bg-white/10">
                        {social.icon && <social.icon size={24} />}
                    </a>
                ))}
            </div>
        </div>

        <div className="w-12 h-[1px] bg-white/10" />

        <div className="flex flex-col items-center gap-6">
            <p className="text-brand-pink font-mono text-xs tracking-widest mb-4">LISTEN ON</p>
            {MUSIC_PLATFORMS.map((platform) => (
                <a 
                    key={platform.name} 
                    href={platform.url}
                    className="text-2xl font-display font-bold tracking-tighter uppercase"
                >
                    {platform.label}
                </a>
            ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;