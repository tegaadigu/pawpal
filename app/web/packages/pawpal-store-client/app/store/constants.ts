export const STALE_TIME = 1000 * 60 * 5// 5 minutes..


export const REACT_QUERY_DEFAULT_PROPS = {
  staleTime: STALE_TIME,
  cacheTime: STALE_TIME,
  retry: false,
  refetchOnMount: true,
  refetchOnReconnect: false,
  refetchInterval: 0, // Turn off polling
  refetchOnWindowFocus: false, // Avoid unnecessary refetches
}
