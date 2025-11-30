"use client"

import { useState, useEffect } from "react";
import { usePostContext } from "../context";

// Optimized fetch hook that uses global cache and fetches all posts at once
const useOptimizedFetch = (url, cacheKey) => {
    const context = usePostContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            if (!url || url.includes('undefined')) {
                if (isMounted) {
                    setLoading(false);
                    setError("Invalid API URL");
                }
                return;
            }

            try {
                // Check global context cache first
                if (context?.getCache) {
                    const cached = context.getCache(cacheKey);
                    if (cached) {
                        if (isMounted) {
                            setData(cached);
                            setLoading(false);
                        }
                        return;
                    }
                }

                setLoading(true);
                setError(null);

                const response = await fetch(url, {
                    signal,
                    // Add cache headers for browser caching
                    headers: {
                        'Cache-Control': 'public, max-age=300', // 5 minutes
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const resultData = Array.isArray(result) ? result : [];

                // Store in global context cache
                if (context?.updateCache) {
                    context.updateCache(cacheKey, resultData);
                }

                if (isMounted) {
                    setData(resultData);
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong");
                }
                if (isMounted) {
                    setData([]);
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
    }, [url, cacheKey, context]);

    return { data, loading, error };
};

export default useOptimizedFetch;
