import { NextResponse } from 'next/server';
import { getTopTracks, isSpotifyConfigured, SPOTIFY_ARTIST_ID } from '@/lib/services/spotify';
import { fetchWithCache, CACHE_TTL } from '@/lib/services/cache';
import { TRACKS } from '@/lib/constants';
import { Track, TracksApiResponse, SpotifyTrack } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Transform Spotify track to our Track format
function transformSpotifyTrack(spotifyTrack: SpotifyTrack, index: number): Track {
  // Get the largest album art available
  const albumArt =
    spotifyTrack.album.images[0]?.url ||
    spotifyTrack.album.images[1]?.url ||
    'https://picsum.photos/seed/album/400/400';

  return {
    id: spotifyTrack.id,
    title: spotifyTrack.name,
    duration: Math.round(spotifyTrack.duration_ms / 1000),
    albumArt,
    releaseDate: spotifyTrack.album.release_date,
    // Spotify doesn't expose stream counts via API, use popularity as proxy
    // Popularity is 0-100, we'll scale it for display purposes
    streams: spotifyTrack.popularity * 10000 + (10 - index) * 50000,
    spotifyUrl: spotifyTrack.external_urls.spotify,
    spotifyEmbedId: spotifyTrack.id,
  };
}

export async function GET() {
  const timestamp = Date.now();

  // If Spotify isn't configured, return fallback immediately
  if (!isSpotifyConfigured()) {
    const response: TracksApiResponse = {
      tracks: TRACKS,
      source: 'fallback',
      timestamp,
    };
    return NextResponse.json(response);
  }

  try {
    const { data: spotifyTracks, source } = await fetchWithCache(
      'spotify_top_tracks',
      () => getTopTracks(SPOTIFY_ARTIST_ID),
      CACHE_TTL.TRACKS,
      [] // Empty array as fallback for fetcher
    );

    // If no tracks from Spotify, return fallback
    if (!spotifyTracks || spotifyTracks.length === 0) {
      const response: TracksApiResponse = {
        tracks: TRACKS,
        source: 'fallback',
        timestamp,
      };
      return NextResponse.json(response);
    }

    // Transform Spotify tracks to our format
    const tracks: Track[] = spotifyTracks.map((track, index) =>
      transformSpotifyTrack(track, index)
    );

    const response: TracksApiResponse = {
      tracks,
      source,
      timestamp,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Tracks fetch error:', error);

    // Return fallback on error
    const response: TracksApiResponse = {
      tracks: TRACKS,
      source: 'fallback',
      timestamp,
    };
    return NextResponse.json(response);
  }
}
