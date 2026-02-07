import { PlayCircle, Apple, Disc } from "lucide-react";
import Image from "next/image";
import GlassCard from "./GlassCard";

export default function NewReleaseSection() {
  return (
    <section className="relative">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-pink/20 blur-[100px] rounded-full pointer-events-none" />

      <GlassCard className="p-0 overflow-hidden border-0 bg-transparent shadow-none backdrop-blur-none md:bg-brand-glass md:backdrop-blur-xl md:border md:border-white/10 md:p-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Album Art */}
          <div className="relative group w-full max-w-sm shrink-0 perspective">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink to-purple-600 rounded-sm blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative aspect-[3/4] bg-neutral-900 border-8 border-white p-4 shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12">
              <Image
                src="https://picsum.photos/seed/mountain/600/800"
                alt="Album Cover"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow space-y-8 text-center md:text-left">
            <div>
              <span className="inline-block px-3 py-1 bg-brand-pink text-black text-xs font-bold uppercase tracking-widest mb-4">
                New Release
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none mb-2">
                Midnight <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                  Fuel
                </span>
              </h2>
              <p className="text-brand-pink text-lg tracking-[0.2em] mb-6">
                真夜中の燃料
              </p>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                A late-night confession wrapped in synths and soul. Haunting
                vocals meet cinematic drive into emotion and atmosphere.
                Experience the sound of now.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest mr-4 hidden md:block">
                Listen Now On:
              </span>

              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
                <span className="text-[#1DB954] group-hover:text-black transition-colors">
                  <Disc size={18} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Spotify
                </span>
              </button>

              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
                <span className="text-[#FA243C] group-hover:text-black transition-colors">
                  <Apple size={18} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Apple Music
                </span>
              </button>

              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group">
                <span className="group-hover:text-black transition-colors">
                  <PlayCircle size={18} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Bandcamp
                </span>
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
