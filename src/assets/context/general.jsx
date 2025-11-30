"use client"

import { useContext, createContext, useState, useEffect } from "react"

const GeneralContext = createContext()

export const usePostContext = () => useContext(GeneralContext)

export const GeneralProvider = ({ children }) => {
  const [postItem, setPostItem] = useState({})
  const [isSubmenu, setIsSubmenu] = useState(false)
  const [postsCache, setPostsCache] = useState({}) // Global cache for posts

  const updatePostItem = (item) => {
    setPostItem(item)
  }

  const closeSubmenu = () => {
    setIsSubmenu(!isSubmenu)
  }

  const updateCache = (key, data) => {
    setPostsCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }))
  }

  const getCache = (key, ttl = 5 * 60 * 1000) => {
    const cached = postsCache[key]
    if (!cached) return null

    const now = Date.now()
    if (now - cached.timestamp > ttl) {
      return null // Cache expired
    }

    return cached.data
  }

  useEffect(() => {
    console.log("Setting postItem:", "postItem")
  }, [postItem])

  return (
    <GeneralContext.Provider
      value={{
        postItem,
        updatePostItem,
        closeSubmenu,
        postsCache,
        updateCache,
        getCache,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}
