'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlatformAnalytics, MusicAnalytics, AnalyticsApiResponse } from '@/lib/types';
import { SOCIAL_ANALYTICS, MUSIC_ANALYTICS } from '@/lib/constants';

// Create maps for icons by platform (icons can't be serialized via JSON)
const socialIconMap = Object.fromEntries(
  SOCIAL_ANALYTICS.map((p) => [p.platform, p.icon])
);
const musicIconMap = Object.fromEntries(
  MUSIC_ANALYTICS.map((p) => [p.platform, p.icon])
);

interface UseAnalyticsReturn {
  socialAnalytics: PlatformAnalytics[];
  musicAnalytics: MusicAnalytics[];
  isLoading: boolean;
  error: string | null;
  source: 'api' | 'cache' | 'fallback';
  refetch: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsReturn {
  const [socialAnalytics, setSocialAnalytics] = useState<PlatformAnalytics[]>(SOCIAL_ANALYTICS);
  const [musicAnalytics, setMusicAnalytics] = useState<MusicAnalytics[]>(MUSIC_ANALYTICS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'api' | 'cache' | 'fallback'>('fallback');

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analytics');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalyticsApiResponse = await response.json();

      // Merge API data with icons from constants (icons can't be serialized via JSON)
      const mergedSocial = data.social.map((platform) => ({
        ...platform,
        icon: socialIconMap[platform.platform] || platform.icon,
      }));
      const mergedMusic = data.music.map((platform) => ({
        ...platform,
        icon: musicIconMap[platform.platform] || platform.icon,
      }));

      setSocialAnalytics(mergedSocial);
      setMusicAnalytics(mergedMusic);
      setSource(data.source);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      // Keep using fallback data
      setSocialAnalytics(SOCIAL_ANALYTICS);
      setMusicAnalytics(MUSIC_ANALYTICS);
      setSource('fallback');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    socialAnalytics,
    musicAnalytics,
    isLoading,
    error,
    source,
    refetch: fetchAnalytics,
  };
}

// Helper to calculate totals
export function useTotalFollowers(analytics: PlatformAnalytics[]): number {
  return analytics.reduce((acc, platform) => acc + platform.followers, 0);
}

export function useTotalStreams(analytics: MusicAnalytics[]): number {
  return analytics.reduce((acc, platform) => acc + platform.totalStreams, 0);
}
