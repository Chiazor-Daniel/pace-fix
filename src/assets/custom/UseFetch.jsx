import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const useFetch = (url) => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 600000, // Cache for 10 minutes
    shouldRetryOnError: false,
    revalidateIfStale: false, // Don't auto-revalidate stale data
    focusThrottleInterval: 300000, // Throttle focus revalidation to 5 minutes
    keepPreviousData: true, // Keep showing old data while fetching new
  });

  return {
    data: Array.isArray(data) ? data : [],
    loading: isLoading,
    error: error ? error.message || "Something went wrong" : null,
  };
};

export default useFetch;
