import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black border-t border-white/10 overflow-hidden pt-20 pb-8">
      {/* 1. Background Grid Decoration (Cyberpunk vibe) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 border-b border-white/5 pb-12">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mb-8 text-white">
                Sonic <span className="text-brand-pink">Future</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Awaits.</span>
              </h2>
              <div className="flex items-start gap-4">
                 <div className="w-1 h-12 bg-brand-pink/50" />
                 <p className="text-white/40 max-w-sm font-mono text-xs leading-relaxed uppercase tracking-widest">
                    Crafting auditory landscapes for the digital age. Nocorazon is an audio-visual experience designed to move you through the noise.
                 </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-6">
            <h4 className="font-mono text-brand-pink text-xs tracking-[0.2em] uppercase mb-2">Explore</h4>
            <ul className="space-y-4">
                {['Music', 'Tour', 'Merch', 'About'].map((item) => (
                    <li key={item}>
                        <Link href="#" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <span className="w-0 group-hover:w-2 h-[1px] bg-brand-pink transition-all duration-300" />
                            <span className="font-display font-bold text-xl uppercase tracking-widest">{item}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-brand-pink" />
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* Contact / Management */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <div>
                <h4 className="font-mono text-brand-pink text-xs tracking-[0.2em] uppercase mb-4">Management & Booking</h4>
                <a
                  href="mailto:booking@nocorazonmusic.com"
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="p-2 bg-brand-pink/10 rounded-full">
                    <Mail className="w-4 h-4 text-brand-pink" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Contact</span>
                    <span className="text-sm font-bold text-white group-hover:text-brand-pink transition-colors">booking@nocorazon.com</span>
                  </div>
                </a>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/30 text-xs font-mono">
                    <MapPin className="w-3 h-3" />
                    <span>DALLAS / NEW YORK / LOS ANGELES</span>
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: System Status & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-4">
            
            {/* Copyright */}
            <div className="flex flex-col gap-1">
                <h3 className="font-display font-bold text-2xl tracking-widest text-white">NOCORAZON</h3>
                <p className="text-[10px] text-white/30 font-mono">
                    © {currentYear} NOCORAZON MUSIC. ALL RIGHTS RESERVED.
                </p>
            </div>

            {/* Decorative System Text */}
            <div className="hidden md:flex items-center gap-8">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-brand-pink/60 font-mono tracking-widest">ARTIST STATUS</span>
                    <span className="text-xs font-bold text-green-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        OPEN
                    </span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="text-right">
                    <p className="text-[10px] text-white/20 font-mono">V.2.0.26</p>
                    <p className="text-[10px] text-white/20 font-mono">LAT: 35.6762° N</p>
                </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <Link href="#" className="hover:text-brand-pink transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-brand-pink transition-colors">Terms of Use</Link>
                <Link href="#" className="hover:text-brand-pink transition-colors">Credits</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}