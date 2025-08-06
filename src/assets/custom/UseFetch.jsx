"use client"

import useSWR from "swr"

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    throw new Error("Response is not JSON")
  }
  return res.json()
}

const useFetch = (url, cacheName = "", expiryMs = 3600000) => {
  const key = cacheName || url

  const { data, error, isLoading, mutate } = useSWR(key, async () => {
    // Check sessionStorage first
    const storageKey = `pacesetter_${key}`
    const cached = sessionStorage.getItem(storageKey)
    const now = Date.now()

    if (cached) {
      const { value, timestamp } = JSON.parse(cached)
      if (now - timestamp < expiryMs) {
        // Return cached immediately (stale-while-revalidate handled by SWR)
        setTimeout(() => mutate(fetcher(url), false), 0) // background refresh
        return value
      }
    }

    // No valid cache → fetch fresh
    const fresh = await fetcher(url)
    sessionStorage.setItem(storageKey, JSON.stringify({ value: fresh, timestamp: now }))
    return fresh
  }, {
    dedupingInterval: expiryMs,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    loading: isLoading,
    data: data || [],
    error: error ? error.message : null,
  }
}

export default useFetch
