"use client"
import { useEffect, useRef } from "react"

const GoogleAd = ({ dataAdSlot }) => {
  const adRef = useRef()

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.warn("Adsense error", e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3536158399576400"
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  )
}

export default GoogleAd
