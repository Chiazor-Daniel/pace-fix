import React, { useEffect, useRef } from "react";

// Reusable Adsense Ad component
function AdsenseAd({ dataAdSlot, style, className = "", adFormat = "horizontal, rectangle", fullWidth = false }) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // You may want to log ad errors in production
    }
  }, []);

  return (
    <div style={{ overflow: "hidden", clear: "both", margin: "10px 0" }}>
      <ins
        className={`adsbygoogle ${className}`}
        style={style || { display: "block" }}
        data-ad-client="ca-pub-3536158399576400"
        data-ad-slot={dataAdSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
        ref={adRef}
      />
    </div>
  );
}

// Sidebar (desktop)
export const SidebarAd = () => (
  <div className="my-4" data-ad-location="sidebar">
    <AdsenseAd dataAdSlot="9096348399" adFormat="auto" />
  </div>
);

// Below article title / above content
export const BelowTitleAd = () => (
  <div className="my-4" data-ad-location="below-title">
    <AdsenseAd dataAdSlot="7380011854" />
  </div>
);

// In-content (between paragraphs)
export const InContentAd = () => (
  <div className="my-4" data-ad-location="in-content">
    <AdsenseAd dataAdSlot="7380011854" />
  </div>
);

// End of article
export const EndOfArticleAd = () => (
  <div className="my-4" data-ad-location="end-of-article">
    <AdsenseAd dataAdSlot="7380011854" />
  </div>
);