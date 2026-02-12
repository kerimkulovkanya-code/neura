import { QueryClient } from "@tanstack/react-query"

/**
 * Default query options for all queries
 * These can be overridden on a per-query basis
 */
const defaultQueryOptions = {
  queries: {
    // Stale time: Data is considered fresh for 5 minutes
    // Reduces unnecessary refetches for frequently accessed data
    staleTime: 5 * 60 * 1000, // 5 minutes

    // Cache time: Keep unused data in cache for 10 minutes
    // Allows instant data display when navigating back
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

    // Retry failed requests 3 times with exponential backoff
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Refetch on window focus for data freshness
    // Useful when user returns to the tab
    refetchOnWindowFocus: true,

    // Don't refetch on mount if data is still fresh
    refetchOnMount: true,

    // Refetch when network reconnects
    refetchOnReconnect: true,

    // Throw errors to error boundaries instead of returning them
    // Better error handling with React error boundaries
    throwOnError: false,

    // Network mode: online-first approach
    // Queries will pause when offline and resume when online
    networkMode: "online",
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,
    retryDelay: 1000,

    // Network mode for mutations
    networkMode: "online",

    // Throw errors for mutations to be caught by error boundaries
    throwOnError: false,
  },
}

/**
 * QueryClient instance with optimized configuration
 * 
 * Features:
 * - Intelligent caching with 5-minute stale time
 * - Automatic retry with exponential backoff
 * - Network-aware refetching
 * - Performance optimized for production use
 * 
 * @see https://tanstack.com/query/latest/docs/react/reference/QueryClient
 */
export const queryClientInstance = new QueryClient({
  defaultOptions: defaultQueryOptions,
})

/**
 * Helper function to invalidate queries by key pattern
 * Useful for cache invalidation after mutations
 * 
 * @param {string | string[]} queryKey - Query key or key pattern to invalidate
 * @example
 * invalidateQueries(['users']) // Invalidates all user queries
 * invalidateQueries(['users', userId]) // Invalidates specific user query
 */
export const invalidateQueries = (queryKey) => {
  return queryClientInstance.invalidateQueries({ queryKey })
}

/**
 * Helper function to prefetch data
 * Useful for optimistic data loading
 * 
 * @param {string | string[]} queryKey - Query key to prefetch
 * @param {Function} queryFn - Function that fetches the data
 * @param {Object} options - Additional prefetch options
 * @example
 * prefetchQuery(['user', userId], () => fetchUser(userId))
 */
export const prefetchQuery = (queryKey, queryFn, options = {}) => {
  return queryClientInstance.prefetchQuery({
    queryKey,
    queryFn,
    ...options,
  })
}

/**
 * Helper function to set query data manually
 * Useful for optimistic updates
 * 
 * @param {string | string[]} queryKey - Query key to update
 * @param {any} data - New data to set
 * @example
 * setQueryData(['user', userId], newUserData)
 */
export const setQueryData = (queryKey, data) => {
  return queryClientInstance.setQueryData(queryKey, data)
}

/**
 * Helper function to get query data from cache
 * 
 * @param {string | string[]} queryKey - Query key to retrieve
 * @returns {any} Cached data or undefined
 * @example
 * const userData = getQueryData(['user', userId])
 */
export const getQueryData = (queryKey) => {
  return queryClientInstance.getQueryData(queryKey)
}

/**
 * Helper function to remove queries from cache
 * Useful for cleanup or forced refetch
 * 
 * @param {string | string[]} queryKey - Query key to remove
 * @example
 * removeQueries(['users']) // Removes all user queries from cache
 */
export const removeQueries = (queryKey) => {
  return queryClientInstance.removeQueries({ queryKey })
}

/**
 * Helper function to cancel ongoing queries
 * Useful for cleanup on component unmount
 * 
 * @param {string | string[]} queryKey - Query key to cancel
 * @example
 * cancelQueries(['users']) // Cancels all ongoing user queries
 */
export const cancelQueries = (queryKey) => {
  return queryClientInstance.cancelQueries({ queryKey })
}

// Export the QueryClient class for type definitions or custom instances
export { QueryClient }