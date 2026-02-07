"use client";

import { TRACKS } from "@/lib/constants";
import SpotifyEmbed from "@/components/music/SpotifyEmbed";
import TrackList from "@/components/music/TrackList";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { Disc, ExternalLink, Activity } from "lucide-react";
import Image from "next/image";

export default function MusicShowcase() {
  const latestTrack = TRACKS[0];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Decor: A subtle grid to give it structure */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        
        {/* Section Header with Tech-Vibe */}
        <ScrollReveal animation="slide-right">
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                SONIC ARCHIVES
              </h2>
              <p className="text-brand-pink font-mono text-sm tracking-[0.3em] mt-2 uppercase">
                最新リリース // Latest Audio Data
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-brand-pink/50 animate-pulse-slow">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-mono">SYSTEM: ONLINE</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Release: Holographic Interface Card */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="relative w-full group mb-20">
            
            {/* Ambient Glow behind the card derived from Album Art colors */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink/30 to-purple-600/30 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

            {/* The Glass Card */}
            <div className="relative bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden">
              
              {/* Background Blur Image for Atmosphere */}
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                 <Image
                  src={latestTrack.albumArt}
                  alt="Atmosphere"
                  fill
                  className="object-cover blur-3xl scale-110"
                />
              </div>

              <div className="grid lg:grid-cols-12 gap-8 p-6 md:p-10 relative z-10">
                
                {/* COL 1: Album Art (Takes 5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-brand-pink/50 transition-colors duration-500">
                    <Image
                      src={latestTrack.albumArt}
                      alt={latestTrack.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Vinyl Shine Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-white/80">NEW ARRIVAL</span>
                    </div>
                  </div>
                </div>

                {/* COL 2: Info & Player (Takes 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  
                  {/* Metadata */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-start">
                        <span className="font-mono text-brand-pink text-xs tracking-[0.2em] border border-brand-pink/30 px-2 py-1 rounded">
                          01 // SINGLE
                        </span>
                        <Disc className="text-white/20 w-8 h-8 animate-[spin_10s_linear_infinite]" />
                    </div>

                    <div>
                      <h3 className="font-display text-4xl md:text-6xl font-bold leading-[0.9] mb-2 text-white">
                        {latestTrack.title}
                      </h3>
                      {latestTrack.titleJapanese && (
                        <p className="font-sans text-xl md:text-2xl font-light text-white/60 tracking-widest">
                          {latestTrack.titleJapanese}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-4 pt-2">
                         <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden flex items-center gap-1">
                            {/* Decorative Fake Visualizer Bars */}
                            {[...Array(20)].map((_, i) => (
                                <div key={i}
                                    className="h-full w-full bg-brand-pink/40"
                                    style={{
                                        animation: `pulse-height 1s infinite ${(i * 0.05).toFixed(2)}s`
                                    }}
                                />
                            ))}
                         </div>
                    </div>
                  </div>

                  {/* Spotify Integration - Styled Custom Container */}
                  <div className="bg-black/40 rounded-xl p-1 border border-white/5 shadow-inner">
                    {latestTrack.spotifyEmbedId ? (
                      <div className="opacity-90 hover:opacity-100 transition-opacity">
                        <SpotifyEmbed
                            trackId={latestTrack.spotifyEmbedId}
                            height={152} // Compact height for cleaner look
                            theme="dark"
                            className="w-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="h-[152px] flex items-center justify-center bg-white/5 rounded-lg border border-dashed border-white/10">
                        <p className="text-white/40 font-mono text-xs">AUDIO SOURCE OFFLINE</p>
                      </div>
                    )}
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center gap-4 mt-6">
                    <button className="group flex items-center gap-2 text-xs font-mono tracking-widest text-white/50 hover:text-brand-pink transition-colors">
                        VIEW ON SPOTIFY <ExternalLink className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <span className="text-white/20 text-xs font-mono">|</span>
                    <span className="text-white/50 text-xs font-mono">
                        RELEASED: {new Date(latestTrack.releaseDate).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Track List Section */}
        <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
                 <ScrollReveal animation="slide-right">
                    <div className="sticky top-24">
                        <h3 className="font-display text-3xl font-bold mb-4">Top Tracks</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            A curated collection of the most streamed auditory experiences. Listen to the evolution of the sound.
                        </p>
                        <div className="w-12 h-1 bg-brand-pink mb-6" />
                        
                        {/* Decorative Japanese Vertical Text */}
                        <div className="hidden md:block writing-vertical-rl text-white/10 font-black text-6xl select-none absolute -left-12 top-0 h-[400px]">
                            人気のある音楽
                        </div>
                    </div>
                 </ScrollReveal>
            </div>
            
            <div className="md:col-span-8">
                <ScrollReveal animation="fade-up" delay={0.2}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-2">
                        <TrackList tracks={TRACKS} />
                    </div>
                </ScrollReveal>
            </div>
        </div>
        
      </div>
    </section>
  );
}