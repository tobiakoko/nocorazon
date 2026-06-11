// Simple in-memory cache with TTL support

import { DataSource } from '@/lib/types';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

// Default TTLs in milliseconds
export const CACHE_TTL = {
  ANALYTICS: 60 * 60 * 1000,      // 1 hour
  TRACKS: 6 * 60 * 60 * 1000,     // 6 hours
  SPOTIFY_TOKEN: 55 * 60 * 1000,  // 55 minutes (tokens expire in 60)
} as const;

export function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;

  if (!entry) {
    return null;
  }

  // Check if expired
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
}

// Get stale data even if expired (for stale-while-revalidate pattern)
function getStaleFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  return entry?.data ?? null;
}

// Wrapper for fetch-with-fallback pattern
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number,
  fallbackData?: T
): Promise<{ data: T; source: DataSource; isStale: boolean }> {
  // Try fresh cache first
  const cached = getFromCache<T>(key);
  if (cached !== null) {
    return { data: cached, source: 'cache', isStale: false };
  }

  try {
    // Fetch fresh data
    const fresh = await fetcher();
    setCache(key, fresh, ttl);
    return { data: fresh, source: 'api', isStale: false };
  } catch (error) {
    // Try stale cache
    const stale = getStaleFromCache<T>(key);
    if (stale !== null) {
      return { data: stale, source: 'cache', isStale: true };
    }

    // Use fallback if provided
    if (fallbackData !== undefined) {
      return { data: fallbackData, source: 'fallback', isStale: true };
    }

    throw error;
  }
}
