import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  url: string;
  icon?: LucideIcon;
  label?: string;
}

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  subtext: string;
  icon?: LucideIcon;
  accentColor?: string;
}

export interface DetailedStatData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface MusicPlatform {
  name: string;
  url: string;
  icon: LucideIcon;
}

// Platform Analytics Types (API-ready)
export type SocialPlatform = 'instagram' | 'tiktok' | 'twitter' | 'youtube';
export type MusicStreamingPlatform = 'spotify' | 'appleMusic' | 'youtubeMusic';

export interface PlatformMetric {
  label: string;
  value: number;
  format: 'number' | 'percentage' | 'abbreviated';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

export interface PlatformAnalytics {
  platform: SocialPlatform;
  icon: LucideIcon;
  brandColor: string;
  followers: number;
  followerChange: number;
  engagement?: number;
  reach?: number;
  isVerified?: boolean;
  profileUrl: string;
}

export interface MusicAnalytics {
  platform: MusicStreamingPlatform;
  icon: LucideIcon;
  brandColor: string;
  monthlyListeners: number;
  totalStreams: number;
  playlistPlacements?: number;
  profileUrl: string;
}

// Track Types
export interface Track {
  id: string;
  title: string;
  titleJapanese?: string;
  duration: number; // seconds
  albumArt: string;
  releaseDate: string;
  streams: number;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  spotifyEmbedId?: string;
}

// Show/Tour Types
export type ShowStatus = 'on-sale' | 'sold-out' | 'announced' | 'cancelled';

export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  countryCode: string;
  ticketUrl?: string;
  status: ShowStatus;
  isHeadliner: boolean;
  festivalName?: string;
  imageUrl?: string;
}

// Analytics State (for API readiness)
export interface AnalyticsState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}