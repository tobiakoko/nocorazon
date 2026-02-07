import { SpotifyArtist, SpotifyTrack, SpotifyTopTracksResponse } from '@/lib/types';
import { getFromCache, setCache, CACHE_TTL } from './cache';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Artist ID extracted from the provided Spotify URL
export const SPOTIFY_ARTIST_ID = '3cqyOKTotCB10wu7SZ3YfU';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Get Spotify access token using Client Credentials flow
export async function getSpotifyToken(): Promise<string> {
  const cacheKey = 'spotify_token';
  const cached = getFromCache<string>(cacheKey);

  if (cached) {
    return cached;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  const data: SpotifyTokenResponse = await response.json();
  setCache(cacheKey, data.access_token, CACHE_TTL.SPOTIFY_TOKEN);

  return data.access_token;
}

// Fetch artist information
export async function getArtist(artistId: string = SPOTIFY_ARTIST_ID): Promise<SpotifyArtist> {
  const token = await getSpotifyToken();

  const response = await fetch(`${SPOTIFY_API_BASE}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch artist: ${response.status}`);
  }

  return response.json();
}

// Fetch artist's top tracks
export async function getTopTracks(
  artistId: string = SPOTIFY_ARTIST_ID,
  market: string = 'US'
): Promise<SpotifyTrack[]> {
  const token = await getSpotifyToken();

  const response = await fetch(
    `${SPOTIFY_API_BASE}/artists/${artistId}/top-tracks?market=${market}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch top tracks: ${response.status}`);
  }

  const data: SpotifyTopTracksResponse = await response.json();
  return data.tracks;
}

// Fetch artist's albums
export async function getArtistAlbums(
  artistId: string = SPOTIFY_ARTIST_ID,
  limit: number = 10
): Promise<SpotifyTrack['album'][]> {
  const token = await getSpotifyToken();

  const response = await fetch(
    `${SPOTIFY_API_BASE}/artists/${artistId}/albums?include_groups=album,single&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch albums: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

// Check if Spotify credentials are configured
export function isSpotifyConfigured(): boolean {
  return !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET);
}
