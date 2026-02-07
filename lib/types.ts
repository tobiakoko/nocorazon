import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

export interface SocialLink {
  name: string;
  url: string;
  icon?: LucideIcon | IconType;
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

// API Response Types
export interface ApiResponse<T> {
  data: T;
  source: 'api' | 'cache' | 'fallback';
  timestamp: number;
  isStale?: boolean;
}

// Spotify API Response Types
export interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  followers: { total: number };
  images: SpotifyImage[];
  popularity: number;
  genres: string[];
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  album_type: string;
  total_tracks: number;
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  album: SpotifyAlbum;
  artists: { id: string; name: string }[];
  external_urls: { spotify: string };
  preview_url: string | null;
}

export interface SpotifyTopTracksResponse {
  tracks: SpotifyTrack[];
}

// YouTube API Response Types
export interface YouTubeChannelStatistics {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  hiddenSubscriberCount: boolean;
}

export interface YouTubeChannelSnippet {
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
}

export interface YouTubeChannel {
  id: string;
  snippet: YouTubeChannelSnippet;
  statistics: YouTubeChannelStatistics;
}

export interface YouTubeChannelResponse {
  items: YouTubeChannel[];
}

// Analytics API Response
export interface AnalyticsApiResponse {
  social: PlatformAnalytics[];
  music: MusicAnalytics[];
  source: 'api' | 'cache' | 'fallback';
  timestamp: number;
}

// Tracks API Response
export interface TracksApiResponse {
  tracks: Track[];
  source: 'api' | 'cache' | 'fallback';
  timestamp: number;
}