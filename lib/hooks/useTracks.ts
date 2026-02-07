'use client';

import { useState, useEffect, useCallback } from 'react';
import { Track, TracksApiResponse } from '@/lib/types';
import { TRACKS } from '@/lib/constants';

interface UseTracksReturn {
  tracks: Track[];
  featuredTrack: Track | null;
  isLoading: boolean;
  error: string | null;
  source: 'api' | 'cache' | 'fallback';
  refetch: () => Promise<void>;
}

export function useTracks(): UseTracksReturn {
  const [tracks, setTracks] = useState<Track[]>(TRACKS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'api' | 'cache' | 'fallback'>('fallback');

  const fetchTracks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/music/tracks');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TracksApiResponse = await response.json();

      setTracks(data.tracks);
      setSource(data.source);
    } catch (err) {
      console.error('Failed to fetch tracks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tracks');
      // Keep using fallback data
      setTracks(TRACKS);
      setSource('fallback');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  // Featured track is the first one (most popular/recent)
  const featuredTrack = tracks.length > 0 ? tracks[0] : null;

  return {
    tracks,
    featuredTrack,
    isLoading,
    error,
    source,
    refetch: fetchTracks,
  };
}
