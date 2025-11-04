import React, { useEffect, useRef } from "react";

// Reusable Adsense Ad component
function AdsenseAd({ dataAdSlot, style, className = "", adFormat = "auto", fullWidth = true }) {
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
    <ins
      className={`adsbygoogle ${className}`}
      style={style || { display: "block" }}
      data-ad-client="ca-pub-3536158399576400"
      data-ad-slot={dataAdSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidth ? "true" : "false"}
      ref={adRef}
    />
  );
}

// Sidebar (desktop)
export const SidebarAd = () => (
  <div className="my-4" data-ad-location="sidebar">
    <AdsenseAd dataAdSlot="YOUR_SIDEBAR_SLOT_ID" />
  </div>
);

// Below article title / above content
export const BelowTitleAd = () => (
  <div className="my-4" data-ad-location="below-title">
    <AdsenseAd dataAdSlot="YOUR_BELOW_TITLE_SLOT_ID" />
  </div>
);

// In-content (between paragraphs)
export const InContentAd = () => (
  <div className="my-4" data-ad-location="in-content">
    <AdsenseAd dataAdSlot="YOUR_IN_CONTENT_SLOT_ID" />
  </div>
);

// End of article
export const EndOfArticleAd = () => (
  <div className="my-4" data-ad-location="end-of-article">
    <AdsenseAd dataAdSlot="YOUR_END_OF_ARTICLE_SLOT_ID" />
  </div>
);

// Sticky mobile footer
export const StickyMobileFooterAd = () => (
  <div className="sticky-bottom d-md-none" data-ad-location="sticky-mobile-footer">
    <AdsenseAd dataAdSlot="YOUR_MOBILE_FOOTER_SLOT_ID" />
  </div>
);