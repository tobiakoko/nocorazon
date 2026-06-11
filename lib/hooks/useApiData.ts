'use client';

import { useState, useEffect, useCallback } from 'react';
import { DataSource } from '@/lib/types';

export interface UseApiDataReturn<TData> {
  data: TData;
  isLoading: boolean;
  error: string | null;
  source: DataSource;
  refetch: () => Promise<void>;
}

/**
 * Fetch JSON from an internal API route with built-in fallback data.
 *
 * `fallback` and `select` must be stable references (module-level values),
 * otherwise every render triggers a refetch.
 */
export function useApiData<TResponse, TData>(
  url: string,
  fallback: TData,
  select: (response: TResponse) => { data: TData; source: DataSource }
): UseApiDataReturn<TData> {
  const [data, setData] = useState<TData>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<DataSource>('fallback');

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const selected = select((await response.json()) as TResponse);
      setData(selected.data);
      setSource(selected.source);
    } catch (err) {
      console.error(`Failed to fetch ${url}:`, err);
      setError(err instanceof Error ? err.message : 'Request failed');
      setData(fallback);
      setSource('fallback');
    } finally {
      setIsLoading(false);
    }
  }, [url, fallback, select]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, source, refetch };
}
