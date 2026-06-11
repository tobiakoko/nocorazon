'use client';

import { PlatformAnalytics, MusicAnalytics, AnalyticsApiResponse, DataSource } from '@/lib/types';
import { SOCIAL_ANALYTICS, MUSIC_ANALYTICS } from '@/lib/constants';
import { useApiData } from './useApiData';

// Create maps for icons by platform (icons can't be serialized via JSON)
const socialIconMap = Object.fromEntries(
  SOCIAL_ANALYTICS.map((p) => [p.platform, p.icon])
);
const musicIconMap = Object.fromEntries(
  MUSIC_ANALYTICS.map((p) => [p.platform, p.icon])
);

interface AnalyticsData {
  social: PlatformAnalytics[];
  music: MusicAnalytics[];
}

const FALLBACK: AnalyticsData = {
  social: SOCIAL_ANALYTICS,
  music: MUSIC_ANALYTICS,
};

// Merge API data with icons from constants (icons can't be serialized via JSON)
function selectAnalytics(response: AnalyticsApiResponse): { data: AnalyticsData; source: DataSource } {
  return {
    data: {
      social: response.social.map((platform) => ({
        ...platform,
        icon: socialIconMap[platform.platform] || platform.icon,
      })),
      music: response.music.map((platform) => ({
        ...platform,
        icon: musicIconMap[platform.platform] || platform.icon,
      })),
    },
    source: response.source,
  };
}

interface UseAnalyticsReturn {
  socialAnalytics: PlatformAnalytics[];
  musicAnalytics: MusicAnalytics[];
  isLoading: boolean;
  error: string | null;
  source: DataSource;
  refetch: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsReturn {
  const { data, ...rest } = useApiData('/api/analytics', FALLBACK, selectAnalytics);
  return { socialAnalytics: data.social, musicAnalytics: data.music, ...rest };
}
