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
    <AdsenseAd dataAdSlot="9096348399" />
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

// Sticky mobile footer
export const StickyMobileFooterAd = () => (
  <div className="fixed-bottom d-md-none shadow-lg text-center bg-white" style={{ zIndex: 1000, minHeight: '50px', borderTop: '1px solid #ddd' }} data-ad-location="sticky-mobile-footer">
    <div style={{ fontSize: '10px', color: '#999', padding: '2px' }}>Advertisement</div>
    <AdsenseAd dataAdSlot="9096348399" />
  </div>
);