import { NextResponse } from 'next/server';
import { getTopTracks, isSpotifyConfigured, SPOTIFY_ARTIST_ID } from '@/lib/services/spotify';
import { fetchWithCache, CACHE_TTL } from '@/lib/services/cache';
import { TRACKS } from '@/lib/constants';
import { Track, TracksApiResponse, SpotifyTrack } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Transform Spotify track to our Track format
function transformSpotifyTrack(spotifyTrack: SpotifyTrack): Track {
  // Get the largest album art available
  const albumArt =
    spotifyTrack.album.images[0]?.url ||
    spotifyTrack.album.images[1]?.url ||
    '/nocorazon-crop.webp';

  return {
    id: spotifyTrack.id,
    title: spotifyTrack.name,
    duration: Math.round(spotifyTrack.duration_ms / 1000),
    albumArt,
    releaseDate: spotifyTrack.album.release_date,
    // Spotify doesn't expose stream counts; popularity (0-100) is kept only
    // for ranking and is never displayed as a play count
    streams: spotifyTrack.popularity,
    spotifyUrl: spotifyTrack.external_urls.spotify,
    spotifyEmbedId: spotifyTrack.id,
  };
}

function fallbackResponse(timestamp: number) {
  const response: TracksApiResponse = {
    tracks: TRACKS,
    source: 'fallback',
    timestamp,
  };
  return NextResponse.json(response);
}

export async function GET() {
  const timestamp = Date.now();

  // If Spotify isn't configured, return fallback immediately
  if (!isSpotifyConfigured()) {
    return fallbackResponse(timestamp);
  }

  try {
    const { data: spotifyTracks, source } = await fetchWithCache(
      'spotify_top_tracks',
      () => getTopTracks(SPOTIFY_ARTIST_ID),
      CACHE_TTL.TRACKS,
      [] // Empty array as fallback for fetcher
    );

    if (!spotifyTracks || spotifyTracks.length === 0) {
      return fallbackResponse(timestamp);
    }

    const tracks: Track[] = spotifyTracks.map(transformSpotifyTrack);

    const response: TracksApiResponse = {
      tracks,
      source,
      timestamp,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Tracks fetch error:', error);
    return fallbackResponse(timestamp);
  }
}
