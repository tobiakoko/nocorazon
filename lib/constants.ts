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
    value: 'Instagram',
    subtext: 'By follower count',
    icon: Instagram,
    accentColor: 'text-pink-500'
  },
  {
    id: '2',
    title: 'Total Fans',
    value: '238.1K',
    subtext: 'Across all platforms',
    icon: Users,
    accentColor: 'text-rose-400'
  },
  {
    id: '3',
    title: 'Total Est. Impressions',
    value: '190M',
    subtext: 'Across all platforms',
    icon: Activity,
    accentColor: 'text-cyan-400'
  }
];

export const INSTAGRAM_METRICS: DetailedStatData[] = [
  { label: 'Followers', value: '181.8K', change: '+2.4%', isPositive: true },
  { label: 'Avg Likes', value: '12.5K', change: '+1.1%', isPositive: true },
  { label: 'Reach', value: '450K' },
  { label: 'Engagement', value: '8.2%' }
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
    followers: 181800,
    followerChange: 2.4,
    engagement: 8.2,
    reach: 450000,
    isVerified: true,
    profileUrl: 'https://www.instagram.com/_nocorazon_',
  },
  {
    platform: 'tiktok',
    icon: Music,
    brandColor: '#00F2EA',
    followers: 45200,
    followerChange: 15.8,
    engagement: 12.4,
    reach: 890000,
    profileUrl: 'https://www.tiktok.com/@goat.tingz',
  },
  {
    platform: 'twitter',
    icon: Twitter,
    brandColor: '#1DA1F2',
    followers: 12100,
    followerChange: 0.8,
    engagement: 3.2,
    reach: 85000,
    isVerified: true,
    profileUrl: 'https://x.com/betterdayz_',
  },
  {
    platform: 'youtube',
    icon: Youtube,
    brandColor: '#FF0000',
    followers: 8500,
    followerChange: 3.2,
    reach: 120000,
    profileUrl: 'https://youtube.com/channel/UC_xHrb-luK5oFmGunkkptGw',
  },
];

// Music Streaming Analytics
export const MUSIC_ANALYTICS: MusicAnalytics[] = [
  {
    platform: 'spotify',
    icon: Disc,
    brandColor: '#1DB954',
    monthlyListeners: 125400,
    totalStreams: 2100000,
    playlistPlacements: 47,
    profileUrl: 'https://open.spotify.com/artist/3cqyOKTotCB10wu7SZ3YfU',
  },
  {
    platform: 'appleMusic',
    icon: Radio,
    brandColor: '#FA243C',
    monthlyListeners: 45200,
    totalStreams: 890000,
    playlistPlacements: 12,
    profileUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
  },
  {
    platform: 'youtubeMusic',
    icon: Headphones,
    brandColor: '#FF0000',
    monthlyListeners: 32100,
    totalStreams: 450000,
    profileUrl: 'https://music.youtube.com/channel/UC_xHrb-luK5oFmGunkkptGw',
  },
];

// Tracks
export const TRACKS: Track[] = [
  {
    id: 'midnight-fuel',
    title: 'Midnight Fuel',
    titleJapanese: '真夜中の燃料',
    duration: 225,
    albumArt: 'https://picsum.photos/seed/album1/400/400',
    releaseDate: '2026-01-15',
    streams: 1200000,
    spotifyUrl: 'https://open.spotify.com/track/example1',
    appleMusicUrl: 'https://music.apple.com/track/example1',
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    spotifyEmbedId: '4cOdK2wGLETKBW3PvgPWqT', // Example Spotify track ID
  },
  {
    id: 'cherry-blossom-dreams',
    title: 'Cherry Blossom Dreams',
    titleJapanese: '桜の夢',
    duration: 252,
    albumArt: 'https://picsum.photos/seed/album2/400/400',
    releaseDate: '2025-11-20',
    streams: 890000,
    spotifyUrl: 'https://open.spotify.com/track/example2',
    appleMusicUrl: 'https://music.apple.com/track/example2',
    youtubeUrl: 'https://youtube.com/watch?v=example2',
    spotifyEmbedId: '3n3Ppam7vgaVa1iaRUc9Lp',
  },
  {
    id: 'neon-requiem',
    title: 'Neon Requiem',
    titleJapanese: 'ネオンのレクイエム',
    duration: 208,
    albumArt: 'https://picsum.photos/seed/album3/400/400',
    releaseDate: '2025-09-05',
    streams: 654000,
    spotifyUrl: 'https://open.spotify.com/track/example3',
    appleMusicUrl: 'https://music.apple.com/track/example3',
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    spotifyEmbedId: '7ouMYWpwJ422jRcDASAM',
  },
  {
    id: 'tokyo-nights',
    title: 'Tokyo Nights',
    titleJapanese: '東京の夜',
    duration: 241,
    albumArt: 'https://picsum.photos/seed/album4/400/400',
    releaseDate: '2025-06-12',
    streams: 432000,
    spotifyUrl: 'https://open.spotify.com/track/example4',
    appleMusicUrl: 'https://music.apple.com/track/example4',
    youtubeUrl: 'https://youtube.com/watch?v=example4',
    spotifyEmbedId: '0VjIjW4GlUZAMYd2vXMi3b',
  },
];

// Upcoming Shows
export const UPCOMING_SHOWS: Show[] = [
  {
    id: 'zepp-tokyo-2026',
    date: '2026-03-15',
    venue: 'Zepp Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    status: 'sold-out',
    isHeadliner: true,
    imageUrl: 'https://picsum.photos/seed/tokyo/800/400',
  },
  {
    id: 'observatory-la-2026',
    date: '2026-04-22',
    venue: 'The Observatory',
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    ticketUrl: 'https://tickets.example.com/observatory',
    status: 'on-sale',
    isHeadliner: true,
  },
  {
    id: 'flex-london-2026',
    date: '2026-05-08',
    venue: 'Flex Bar',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    status: 'announced',
    isHeadliner: true,
  },
  {
    id: 'club-berlin-2026',
    date: '2026-05-15',
    venue: 'Berghain Kantine',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    ticketUrl: 'https://tickets.example.com/berlin',
    status: 'on-sale',
    isHeadliner: false,
    festivalName: 'Neon Nights Festival',
  },
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