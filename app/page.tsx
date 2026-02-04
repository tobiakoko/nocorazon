"use client";

import Navbar from "@/components/Navbar";
import SakuraRain from "@/components/SakuraRain";
import GlassCard from "@/components/GlassCard";
import { OVERVIEW_STATS, INSTAGRAM_METRICS } from "@/lib/constants";
import {
  Instagram,
  PlayCircle,
  Apple,
  Disc,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-pink selection:text-black">
      <SakuraRain />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/cyberpunk/1920/1080"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-60 contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center animate-float">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase drop-shadow-lg">
            Nocorazon
          </h1>
          <p className="font-sans text-xl md:text-3xl font-light tracking-[0.5em] text-brand-pink mt-2">
            ノコラゾン
          </p>
        </div>

        <div className="absolute bottom-20 animate-bounce">
          <ArrowRight className="transform rotate-90 text-white/50" />
        </div>
      </header>

      {/* --- CONTENT CONTAINER --- */}
      <main className="relative z-10 px-4 md:px-10 max-w-7xl mx-auto -mt-32 space-y-24 pb-32">
        {/* --- OVERVIEW SECTION --- */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide">
              Overview
            </h2>
            <div className="h-px bg-gradient-to-r from-brand-pink/50 to-transparent flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OVERVIEW_STATS.map((stat) => (
              <GlassCard
                key={stat.id}
                className="flex flex-col items-center text-center justify-center min-h-[200px] group"
              >
                <div
                  className={`mb-4 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${stat.accentColor}`}
                >
                  {stat.icon && <stat.icon size={32} />}
                </div>
                <div className="text-xs font-bold tracking-widest text-white/50 uppercase mb-1">
                  {stat.title}
                </div>
                <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.subtext}</div>
              </GlassCard>
            ))}
          </div>

          {/* Detailed Instagram Stats */}
          <div className="mt-6">
            <GlassCard className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-2 rounded-lg">
                    <Instagram size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display">
                    Instagram Stats
                  </h3>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Data Verified by Instagram
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {INSTAGRAM_METRICS.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                      {metric.label}
                    </div>
                    <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                      {metric.value}
                    </div>
                    {metric.change && (
                      <div
                        className={`text-xs font-bold ${
                          metric.isPositive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {metric.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  LAST UPDATED JAN 21, 2026
                </div>
                <div>@nocorazonmode</div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* --- NEW RELEASE SECTION --- */}
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

        {/* --- NEWSLETTER --- */}
        <section className="relative py-20 overflow-hidden rounded-3xl">
          {/* Background Texture */}
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/volcano/1600/600"
              alt="Texture"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">
              Let&apos;s Stay <br />
              <span className="text-white/50">In Touch</span>
            </h2>
            <p className="text-brand-pink tracking-[0.2em] mb-8">連絡を取り合う</p>
            <p className="text-white/60 mb-10">
              Be the first to know when new music drops or tour dates go live.
              No spam, just vibes.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="flex-grow bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-pink/50 transition-colors placeholder:text-white/20"
              />
              <button
                type="submit"
                className="bg-white text-black font-bold uppercase text-xs tracking-widest px-8 py-3 hover:bg-brand-pink transition-colors duration-300"
              >
                Join The Newsletter
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
