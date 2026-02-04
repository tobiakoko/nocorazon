import { Instagram, Twitter, Music, Youtube, Disc, Radio, TrendingUp, Users, Activity } from 'lucide-react';
import { SocialLink, StatCardData, DetailedStatData } from './types';

export const NAV_SOCIALS: SocialLink[] = [
  { name: 'Instagram', url: '#', icon: Instagram },
  { name: 'TikTok', url: '#', icon: Music }, // Using Music icon as generic for TikTok
  { name: 'Twitter', url: '#', icon: Twitter },
];

export const MUSIC_PLATFORMS: SocialLink[] = [
  { name: 'Spotify', url: '#', icon: Disc, label: 'Spotify' },
  { name: 'Apple Music', url: '#', icon: Radio, label: 'Apple Music' },
  { name: 'YouTube', url: '#', icon: Youtube, label: 'YouTube' },
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