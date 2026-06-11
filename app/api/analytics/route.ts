import { NextResponse } from 'next/server';
import { getArtist, isSpotifyConfigured, SPOTIFY_ARTIST_ID } from '@/lib/services/spotify';
import { getChannelStats, isYouTubeConfigured, YOUTUBE_CHANNEL_ID } from '@/lib/services/youtube';
import { fetchWithCache, CACHE_TTL } from '@/lib/services/cache';
import { SOCIAL_ANALYTICS, MUSIC_ANALYTICS } from '@/lib/constants';
import { PlatformAnalytics, MusicAnalytics, AnalyticsApiResponse, DataSource } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = Date.now();
  let source: DataSource = 'fallback';

  // Start with fallback data
  let socialAnalytics: PlatformAnalytics[] = [...SOCIAL_ANALYTICS];
  let musicAnalytics: MusicAnalytics[] = [...MUSIC_ANALYTICS];

  // Fetch YouTube data for social analytics (subscribers)
  if (isYouTubeConfigured()) {
    try {
      const { data: youtubeData, source: ytSource } = await fetchWithCache(
        'youtube_channel',
        () => getChannelStats(YOUTUBE_CHANNEL_ID),
        CACHE_TTL.ANALYTICS
      );

      if (youtubeData) {
        const subscriberCount = parseInt(youtubeData.statistics.subscriberCount, 10);
        const viewCount = parseInt(youtubeData.statistics.viewCount, 10);

        // Update YouTube entry in social analytics
        socialAnalytics = socialAnalytics.map((platform) =>
          platform.platform === 'youtube'
            ? { ...platform, followers: subscriberCount, reach: viewCount }
            : platform
        );

        if (ytSource === 'api') source = 'api';
        else if (ytSource === 'cache' && source === 'fallback') source = 'cache';
      }
    } catch (error) {
      console.error('YouTube API error:', error);
    }
  }

  // Fetch Spotify data for music analytics
  if (isSpotifyConfigured()) {
    try {
      const { data: spotifyArtist, source: spotifySource } = await fetchWithCache(
        'spotify_artist',
        () => getArtist(SPOTIFY_ARTIST_ID),
        CACHE_TTL.ANALYTICS
      );

      if (spotifyArtist) {
        // Update Spotify entry in music analytics
        // Note: Spotify API provides followers, not monthly listeners
        // Monthly listeners is only available via Spotify for Artists
        musicAnalytics = musicAnalytics.map((platform) =>
          platform.platform === 'spotify'
            ? {
                ...platform,
                monthlyListeners: spotifyArtist.followers.total,
                profileUrl: spotifyArtist.external_urls.spotify,
              }
            : platform
        );

        if (spotifySource === 'api') source = 'api';
        else if (spotifySource === 'cache' && source === 'fallback') source = 'cache';
      }
    } catch (error) {
      console.error('Spotify API error:', error);
    }
  }

  const response: AnalyticsApiResponse = {
    social: socialAnalytics,
    music: musicAnalytics,
    source,
    timestamp,
  };

  return NextResponse.json(response);
}
