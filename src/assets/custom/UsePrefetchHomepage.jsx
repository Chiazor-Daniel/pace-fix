"use client"

import { useEffect } from "react";
import { usePostContext } from "../context";
import { Categories } from "../data";

// Prefetch all homepage data on mount
const usePrefetchHomepage = () => {
    const context = usePostContext();

    useEffect(() => {
        const prefetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            if (!apiUrl) {
                console.warn("API URL not defined, skipping prefetch");
                return;
            }

            // Prefetch main posts (used by sidebar and recent news)
            const mainPostsUrl = `${apiUrl}posts?per_page=20`;

            try {
                // Check if already cached
                if (context?.getCache && context.getCache('posts')) {
                    return; // Already cached
                }

                const response = await fetch(mainPostsUrl, {
                    headers: {
                        'Cache-Control': 'public, max-age=300',
                    },
                    // Add signal to abort if component unmounts
                    signal: AbortSignal.timeout(10000) // 10 second timeout
                });

                if (response.ok) {
                    const data = await response.json();
                    if (context?.updateCache) {
                        context.updateCache('posts', data);
                    }
                }
            } catch (err) {
                // Ignore abort errors and network errors during prefetch
                if (err.name === 'AbortError' || err.message === 'Failed to fetch') {
                    return;
                }
                console.warn('Prefetch warning:', err.message);
            }
        };

        // Start prefetching immediately
        prefetchData();
    }, [context]);
};

export default usePrefetchHomepage;
