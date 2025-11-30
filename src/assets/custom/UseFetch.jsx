import { useState, useEffect } from "react";

// In-memory cache with TTL (Time To Live)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const useFetch = (url) => {
  const [data, setData] = useState([]); // 👈 start as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        // Check cache first
        const cached = cache.get(url);
        const now = Date.now();

        if (cached && (now - cached.timestamp) < CACHE_TTL) {
          // Use cached data
          if (isMounted) {
            setData(cached.data);
            setLoading(false);
          }
          return;
        }

        setLoading(true);
        setError(null);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const resultData = Array.isArray(result) ? result : [];

        // Store in cache
        cache.set(url, {
          data: resultData,
          timestamp: now
        });

        if (isMounted) {
          setData(resultData); // 👈 always array
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
        if (isMounted) {
          setData([]); // 👈 fallback safe value
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
