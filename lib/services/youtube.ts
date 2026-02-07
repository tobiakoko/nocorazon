import { YouTubeChannelResponse, YouTubeChannel } from '@/lib/types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Channel ID extracted from the provided YouTube URL
export const YOUTUBE_CHANNEL_ID = 'UC_xHrb-luK5oFmGunkkptGw';

// Fetch channel statistics
export async function getChannelStats(
  channelId: string = YOUTUBE_CHANNEL_ID
): Promise<YouTubeChannel | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error('YouTube API key not configured');
  }

  const response = await fetch(
    `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube channel: ${response.status}`);
  }

  const data: YouTubeChannelResponse = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  return data.items[0];
}

// Get subscriber count as number
export async function getSubscriberCount(
  channelId: string = YOUTUBE_CHANNEL_ID
): Promise<number> {
  const channel = await getChannelStats(channelId);

  if (!channel || channel.statistics.hiddenSubscriberCount) {
    return 0;
  }

  return parseInt(channel.statistics.subscriberCount, 10);
}

// Get total view count as number
export async function getTotalViews(
  channelId: string = YOUTUBE_CHANNEL_ID
): Promise<number> {
  const channel = await getChannelStats(channelId);

  if (!channel) {
    return 0;
  }

  return parseInt(channel.statistics.viewCount, 10);
}

// Check if YouTube API key is configured
export function isYouTubeConfigured(): boolean {
  return !!process.env.YOUTUBE_API_KEY;
}
