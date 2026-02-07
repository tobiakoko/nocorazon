"use client";

import { TRACKS } from "@/lib/constants";
import SpotifyEmbed from "@/components/music/SpotifyEmbed";
import TrackList from "@/components/music/TrackList";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { Music, Headphones } from "lucide-react";
import Image from "next/image";

export default function MusicShowcase() {
  const latestTrack = TRACKS[0];

  return (
    <section className="relative">
      {/* Decorative glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 cinematic-glow cinematic-glow-pink opacity-20" />

      {/* Latest Release Section */}
      <ScrollReveal animation="fade-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Latest Release</h2>
          <div className="flex items-center gap-2 text-white/40">
            <Music className="w-4 h-4" />
            <span className="text-sm">2026</span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Album Art Card */}
          <div className="glass-card-highlight p-6 md:p-8 relative overflow-hidden group">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-transparent to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              {/* Album cover */}
              <div className="aspect-square rounded-xl overflow-hidden mb-6 relative shadow-2xl">
                <Image
                  src={latestTrack.albumArt}
                  alt={latestTrack.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-brand-pink/90 flex items-center justify-center shadow-lg shadow-brand-pink/30">
                    <Headphones className="w-7 h-7 text-black" />
                  </div>
                </div>
              </div>

              {/* Track info */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-1">
                  {latestTrack.title}
                </h3>
                {latestTrack.titleJapanese && (
                  <p className="text-lg text-brand-pink mb-3">
                    {latestTrack.titleJapanese}
                  </p>
                )}
                <p className="text-white/50 text-sm">
                  Released {new Date(latestTrack.releaseDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Spotify Embed */}
          <div className="glass-card p-4 md:p-6 flex flex-col">
            <p className="section-heading mb-4">Listen Now</p>
            {latestTrack.spotifyEmbedId ? (
              <SpotifyEmbed
                trackId={latestTrack.spotifyEmbedId}
                height={352}
                theme="dark"
                className="flex-1"
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-white/5 rounded-xl">
                <p className="text-white/40">Spotify embed unavailable</p>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Top Tracks Section */}
      <ScrollReveal animation="fade-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-heading">Top Tracks</h2>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <TrackList tracks={TRACKS} />
      </ScrollReveal>
    </section>
  );
}
