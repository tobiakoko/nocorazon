"use client";

import { SOCIAL_ANALYTICS, MUSIC_ANALYTICS, formatNumber, getTotalFollowers, getTotalStreams } from "@/lib/constants";
import PlatformCard from "@/components/analytics/PlatformCard";
import StatCounter from "@/components/analytics/StatCounter";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { Users, Disc, TrendingUp } from "lucide-react";

export default function AnalyticsDashboard() {
  const totalFollowers = getTotalFollowers();
  const totalStreams = getTotalStreams();

  return (
    <section className="relative">
      {/* Decorative glow */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 cinematic-glow cinematic-glow-purple opacity-20" />

      {/* Social Reach Section */}
      <ScrollReveal animation="fade-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Social Reach</h2>
          <div className="flex items-center gap-2 text-white/40">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              <StatCounter value={totalFollowers} format="abbreviated" /> total
            </span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" stagger={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {SOCIAL_ANALYTICS.map((platform) => (
          <PlatformCard
            key={platform.platform}
            platform={platform.platform}
            icon={platform.icon}
            brandColor={platform.brandColor}
            followers={platform.followers}
            followerChange={platform.followerChange}
            profileUrl={platform.profileUrl}
          />
        ))}
      </ScrollReveal>

      {/* Music Reach Section */}
      <ScrollReveal animation="fade-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Music Reach</h2>
          <div className="flex items-center gap-2 text-white/40">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">
              <StatCounter value={totalStreams} format="abbreviated" /> streams
            </span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" stagger={0.15}>
        <div className="grid md:grid-cols-3 gap-4">
          {MUSIC_ANALYTICS.map((platform) => (
            <a
              key={platform.platform}
              href={platform.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${platform.brandColor}15 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${platform.brandColor}20` }}
                  >
                    <platform.icon
                      className="w-6 h-6"
                      style={{ color: platform.brandColor }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium capitalize">
                      {platform.platform === "appleMusic"
                        ? "Apple Music"
                        : platform.platform === "youtubeMusic"
                        ? "YouTube Music"
                        : platform.platform}
                    </h3>
                    <p className="text-sm text-white/50">Streaming Platform</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Monthly Listeners
                    </p>
                    <StatCounter
                      value={platform.monthlyListeners}
                      format="abbreviated"
                      className="text-2xl font-display font-bold"
                    />
                  </div>

                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                        Total Streams
                      </p>
                      <StatCounter
                        value={platform.totalStreams}
                        format="abbreviated"
                        className="text-lg font-semibold text-white/80"
                      />
                    </div>

                    {platform.playlistPlacements && (
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                          Playlists
                        </p>
                        <div className="flex items-center gap-1">
                          <Disc className="w-4 h-4 text-white/60" />
                          <span className="text-lg font-semibold text-white/80">
                            {platform.playlistPlacements}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
