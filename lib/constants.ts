import { Instagram, Twitter, Music, Youtube, Disc, Radio, Users, Activity, Headphones } from 'lucide-react';
import { SocialLink, StatCardData, DetailedStatData, PlatformAnalytics, MusicAnalytics, Track, Show } from './types';
import { FaInstagram, FaTwitter, FaTiktok, FaSpotify, FaApple, FaYoutube } from "react-icons/fa";
import { SiTidal } from "react-icons/si";

export const NAV_SOCIALS = [
  { name: 'Instagram', url: 'https://www.instagram.com/_nocorazon_', icon: FaInstagram },
  { name: 'TikTok', url: 'https://www.tiktok.com/@goat.tingz', icon: FaTiktok },
  { name: 'Twitter', url: 'https://x.com/betterdayz_', icon: FaTwitter },
];

export const MUSIC_PLATFORMS: SocialLink[] = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/3cqyOKTotCB10wu7SZ3YfU?si=c_2ts543QDahSqQbr9xcug', icon: FaSpotify, label: 'Spotify' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/nocorazon/1525131687', icon: FaApple, label: 'Apple Music' },
  { name: 'YouTube', url: 'https://youtube.com/channel/UC_xHrb-luK5oFmGunkkptGw?si=2MaZfHD0fjs4egId', icon: FaYoutube, label: 'YouTube' },
  { name: 'Tidal', url: 'https://tidal.com/artist/1525131687', icon: SiTidal, label: 'Tidal' },
];

export const OVERVIEW_STATS: StatCardData[] = [
  {
    id: '1',
    title: 'Biggest Platform',
    value: 'TikTok',
    subtext: 'By follower count',
    icon: Instagram,
    accentColor: 'text-pink-500'
  },
  {
    id: '2',
    title: 'Total Fans',
    value: '1.2K',
    subtext: 'Across all platforms',
    icon: Users,
    accentColor: 'text-rose-400'
  },
  {
    id: '3',
    title: 'Total Est. Impressions',
    value: '15K',
    subtext: 'Across all platforms',
    icon: Activity,
    accentColor: 'text-cyan-400'
  }
];

export const INSTAGRAM_METRICS: DetailedStatData[] = [
  { label: 'Followers', value: '420', change: '+5.2%', isPositive: true },
  { label: 'Avg Likes', value: '85', change: '+3.1%', isPositive: true },
  { label: 'Reach', value: '1.2K' },
  { label: 'Engagement', value: '12.4%' }
];

// Artist IDs for API calls
export const ARTIST_IDS = {
  spotify: '3cqyOKTotCB10wu7SZ3YfU',
  youtube: 'UC_xHrb-luK5oFmGunkkptGw',
  appleMusic: '1525131687',
  tidal: '1525131687',
} as const;

// Social Platform Analytics
export const SOCIAL_ANALYTICS: PlatformAnalytics[] = [
  {
    platform: 'instagram',
    icon: Instagram,
    brandColor: '#E4405F',
    followers: 420,
    followerChange: 5.2,
    engagement: 12.4,
    reach: 1200,
    isVerified: false,
    profileUrl: 'https://www.instagram.com/_nocorazon_',
  },
  {
    platform: 'tiktok',
    icon: Music,
    brandColor: '#00F2EA',
    followers: 580,
    followerChange: 8.5,
    engagement: 15.2,
    reach: 4500,
    profileUrl: 'https://www.tiktok.com/@goat.tingz',
  },
  {
    platform: 'twitter',
    icon: Twitter,
    brandColor: '#1DA1F2',
    followers: 125,
    followerChange: 2.1,
    engagement: 4.8,
    reach: 850,
    isVerified: false,
    profileUrl: 'https://x.com/betterdayz_',
  },
  {
    platform: 'youtube',
    icon: Youtube,
    brandColor: '#FF0000',
    followers: 89,
    followerChange: 4.7,
    reach: 2100,
    profileUrl: 'https://youtube.com/channel/UC_xHrb-luK5oFmGunkkptGw',
  },
];

// Music Streaming Analytics
export const MUSIC_ANALYTICS: MusicAnalytics[] = [
  {
    platform: 'spotify',
    icon: Disc,
    brandColor: '#1DB954',
    monthlyListeners: 46,
    totalStreams: 8500,
    playlistPlacements: 3,
    profileUrl: 'https://open.spotify.com/artist/3cqyOKTotCB10wu7SZ3YfU',
  },
  {
    platform: 'appleMusic',
    icon: Radio,
    brandColor: '#FA243C',
    monthlyListeners: 28,
    totalStreams: 4200,
    playlistPlacements: 1,
    profileUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
  },
  {
    platform: 'youtubeMusic',
    icon: Headphones,
    brandColor: '#FF0000',
    monthlyListeners: 15,
    totalStreams: 1800,
    profileUrl: 'https://music.youtube.com/channel/UC_xHrb-luK5oFmGunkkptGw',
  },
];

// Tracks
export const TRACKS: Track[] = [
  {
    id: 'so-good',
    title: 'So Good',
    duration: 198,
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273b4991201bdf3d080a4222455',
    releaseDate: '2024-04-20',
    streams: 3100,
    spotifyUrl: 'https://open.spotify.com/track/2IjgCDJ0H4ZYrrVXUqR8kz',
    appleMusicUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
    spotifyEmbedId: '2IjgCDJ0H4ZYrrVXUqR8kz',
  },
  {
    id: 'steak',
    title: 'Steak',
    duration: 175,
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273b4991201bdf3d080a4222455',
    releaseDate: '2024-04-20',
    streams: 2800,
    spotifyUrl: 'https://open.spotify.com/track/0WIvjxMB8ed1pIRIDQbLWi',
    appleMusicUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
    spotifyEmbedId: '0WIvjxMB8ed1pIRIDQbLWi',
  },
  {
    id: 'dnd',
    title: 'DND',
    duration: 182,
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273a59c8ea695a7638f95c4e1e4',
    releaseDate: '2025-11-23',
    streams: 2400,
    spotifyUrl: 'https://open.spotify.com/track/3jxwTbOUir63qGesbjIsLG',
    appleMusicUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
    spotifyEmbedId: '3jxwTbOUir63qGesbjIsLG',
  },
  {
    id: 'smoking-at-the-disco',
    title: 'Smoking at the Disco',
    duration: 205,
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273b4991201bdf3d080a4222455',
    releaseDate: '2022-12-22',
    streams: 1950,
    spotifyUrl: 'https://open.spotify.com/track/3QULTakuUBUo3HBSQxJeKM',
    appleMusicUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
    spotifyEmbedId: '3QULTakuUBUo3HBSQxJeKM',
  },
  {
    id: 'crack-music',
    title: 'Crack Music',
    duration: 188,
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273b4991201bdf3d080a4222455',
    releaseDate: '2022-12-22',
    streams: 1650,
    spotifyUrl: 'https://open.spotify.com/track/60ze2WSrIvjspdEtTdorDH',
    appleMusicUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
    spotifyEmbedId: '60ze2WSrIvjspdEtTdorDH',
  },
];

// Upcoming Shows
export const UPCOMING_SHOWS: Show[] = [
  
];

// Helper function to format numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Helper to get total social followers
export function getTotalFollowers(): number {
  return SOCIAL_ANALYTICS.reduce((acc, platform) => acc + platform.followers, 0);
}

// Helper to get total streams
export function getTotalStreams(): number {
  return MUSIC_ANALYTICS.reduce((acc, platform) => acc + platform.totalStreams, 0);
}