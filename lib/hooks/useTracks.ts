'use client';

import { Track, TracksApiResponse, DataSource } from '@/lib/types';
import { TRACKS } from '@/lib/constants';
import { useApiData } from './useApiData';

function selectTracks(response: TracksApiResponse): { data: Track[]; source: DataSource } {
  return { data: response.tracks, source: response.source };
}

interface UseTracksReturn {
  tracks: Track[];
  featuredTrack: Track | null;
  isLoading: boolean;
  error: string | null;
  source: DataSource;
  refetch: () => Promise<void>;
}

export function useTracks(): UseTracksReturn {
  const { data: tracks, ...rest } = useApiData('/api/music/tracks', TRACKS, selectTracks);

  // Featured track is the first one (most popular/recent)
  return { tracks, featuredTrack: tracks[0] ?? null, ...rest };
}
