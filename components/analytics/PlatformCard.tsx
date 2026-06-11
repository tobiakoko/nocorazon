"use client";

import { LucideIcon } from "lucide-react";
import StatCounter from "./StatCounter";

interface PlatformCardProps {
  platform: string;
  icon: LucideIcon;
  brandColor: string;
  followers: number;
  profileUrl: string;
}

export default function PlatformCard({
  platform,
  icon: Icon,
  brandColor,
  followers,
  profileUrl,
}: PlatformCardProps) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-5 md:p-6 block group cursor-pointer relative overflow-hidden"
      style={{
        ["--platform-color" as string]: brandColor,
      }}
    >
      {/* Platform icon and name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${brandColor}20` }}
        >
          <Icon
            className="w-5 h-5 transition-colors"
            style={{ color: brandColor }}
          />
        </div>
        <span className="text-sm font-medium text-white/60 capitalize">
          {platform}
        </span>
      </div>

      {/* Follower count */}
      <div className="mb-1">
        <StatCounter
          value={followers}
          format="abbreviated"
          className="text-3xl md:text-4xl font-display font-bold tracking-tight"
        />
      </div>
      <p className="text-sm text-white/60">followers</p>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${brandColor}30`,
        }}
      />
    </a>
  );
}
