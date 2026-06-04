import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export function usePlatformQuery<T>(key: readonly unknown[], queryFn: () => Promise<T>, options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>) {
  return useQuery<T>({ queryKey: key, queryFn, staleTime: 30_000, refetchInterval: 60_000, ...options });
}
