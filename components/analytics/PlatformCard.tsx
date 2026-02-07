"use client";

import { LucideIcon } from "lucide-react";
import StatCounter from "./StatCounter";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PlatformCardProps {
  platform: string;
  icon: LucideIcon;
  brandColor: string;
  followers: number;
  followerChange: number;
  profileUrl: string;
  isLoading?: boolean;
}

export default function PlatformCard({
  platform,
  icon: Icon,
  brandColor,
  followers,
  followerChange,
  profileUrl,
  isLoading = false,
}: PlatformCardProps) {
  const isPositive = followerChange >= 0;

  if (isLoading) {
    return (
      <div className="glass-card p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl skeleton" />
          <div className="h-4 w-20 skeleton rounded" />
        </div>
        <div className="h-8 w-24 skeleton rounded mb-2" />
        <div className="h-4 w-16 skeleton rounded" />
      </div>
    );
  }

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
      <div className="mb-2">
        <StatCounter
          value={followers}
          format="abbreviated"
          className="text-3xl md:text-4xl font-display font-bold tracking-tight"
        />
      </div>

      {/* Trend indicator */}
      <div
        className={`flex items-center gap-1 text-sm ${
          isPositive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>
          {isPositive ? "+" : ""}
          {followerChange.toFixed(1)}%
        </span>
        <span className="text-white/40 ml-1">30d</span>
      </div>

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
