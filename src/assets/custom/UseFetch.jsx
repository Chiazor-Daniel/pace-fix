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
    revalidateOnReconnect: true,
    dedupingInterval: 300000, // Cache for 5 minutes
    shouldRetryOnError: false,
  });

  return {
    data: Array.isArray(data) ? data : [],
    loading: isLoading,
    error: error ? (error.message || "Something went wrong") : null,
  };
};

export default useFetch;
