"use client"

import { useEffect } from "react"

export default function Adminpage() {
  useEffect(() => {
    window.open("https://news.pacesetterfrontier.com/enter", "_blank", "noopener,noreferrer")
  }, [])

  // No UI is rendered
  return null
}