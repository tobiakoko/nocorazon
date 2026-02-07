import { NextResponse } from 'next/server';
import { getArtist, isSpotifyConfigured, SPOTIFY_ARTIST_ID } from '@/lib/services/spotify';
import { getChannelStats, isYouTubeConfigured, YOUTUBE_CHANNEL_ID } from '@/lib/services/youtube';
import { fetchWithCache, CACHE_TTL } from '@/lib/services/cache';
import { SOCIAL_ANALYTICS, MUSIC_ANALYTICS } from '@/lib/constants';
import { PlatformAnalytics, MusicAnalytics, AnalyticsApiResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = Date.now();
  let source: 'api' | 'cache' | 'fallback' = 'fallback';

  // Start with fallback data
  let socialAnalytics: PlatformAnalytics[] = [...SOCIAL_ANALYTICS];
  let musicAnalytics: MusicAnalytics[] = [...MUSIC_ANALYTICS];

  try {
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
          socialAnalytics = socialAnalytics.map((platform) => {
            if (platform.platform === 'youtube') {
              return {
                ...platform,
                followers: subscriberCount,
                reach: viewCount,
                profileUrl: `https://youtube.com/channel/${YOUTUBE_CHANNEL_ID}`,
              };
            }
            return platform;
          });

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
          musicAnalytics = musicAnalytics.map((platform) => {
            if (platform.platform === 'spotify') {
              return {
                ...platform,
                // Note: Spotify API provides followers, not monthly listeners
                // Monthly listeners is only available via Spotify for Artists
                monthlyListeners: spotifyArtist.followers.total,
                profileUrl: spotifyArtist.external_urls.spotify,
              };
            }
            return platform;
          });

          if (spotifySource === 'api') source = 'api';
          else if (spotifySource === 'cache' && source === 'fallback') source = 'cache';
        }
      } catch (error) {
        console.error('Spotify API error:', error);
      }
    }
  } catch (error) {
    console.error('Analytics fetch error:', error);
  }

  // Update profile URLs to match actual artist URLs
  socialAnalytics = socialAnalytics.map((platform) => {
    switch (platform.platform) {
      case 'instagram':
        return { ...platform, profileUrl: 'https://www.instagram.com/_nocorazon_' };
      case 'tiktok':
        return { ...platform, profileUrl: 'https://www.tiktok.com/@goat.tingz' };
      case 'twitter':
        return { ...platform, profileUrl: 'https://x.com/betterdayz_' };
      case 'youtube':
        return {
          ...platform,
          profileUrl: `https://youtube.com/channel/${YOUTUBE_CHANNEL_ID}`,
        };
      default:
        return platform;
    }
  });

  musicAnalytics = musicAnalytics.map((platform) => {
    switch (platform.platform) {
      case 'spotify':
        return {
          ...platform,
          profileUrl: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
        };
      case 'appleMusic':
        return {
          ...platform,
          profileUrl: 'https://music.apple.com/us/artist/nocorazon/1525131687',
        };
      case 'youtubeMusic':
        return {
          ...platform,
          profileUrl: `https://music.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`,
        };
      default:
        return platform;
    }
  });

  const response: AnalyticsApiResponse = {
    social: socialAnalytics,
    music: musicAnalytics,
    source,
    timestamp,
  };

  return NextResponse.json(response);
}
