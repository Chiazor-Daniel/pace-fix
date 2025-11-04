"use client";

import { useEffect, useState, useRef } from 'react';

// Enhanced Ad Component with tracking
const AdComponent = ({ 
  positionKey, 
  className = "", 
  style = {},
  trackView = true,
  pageType = 'all',
  pageUrl = ''
}) => {
  const [adData, setAdData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const adRef = useRef(null);

  useEffect(() => {
    const loadAdData = async () => {
      try {
        const response = await fetch(`/api/ads/position/${positionKey}?pageType=${pageType}`);
        if (response.ok) {
          const data = await response.json();
          setAdData(data);
        }
      } catch (error) {
        console.error('Error loading ad data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdData();
  }, [positionKey, pageType]);

  useEffect(() => {
    if (adData && adData.isActive && window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle.push({});
        
        // Track ad view
        if (trackView) {
          trackAdView(adData.id, pageUrl, pageType);
        }
      } catch (e) {
        console.warn("Adsense error", e);
      }
    }
  }, [adData, trackView, pageUrl, pageType]);

  const trackAdView = async (slotId, url, type) => {
    try {
      await fetch('/api/ads/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slotId,
          pageUrl: url,
          pageType: type,
          action: 'view'
        }),
      });
    } catch (error) {
      console.error('Error tracking ad view:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={`ad-placeholder ${className}`} style={style}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '250px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading ad...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!adData || !adData.isActive) {
    return null;
  }

  return (
    <div 
      className={`ad-container ${className}`} 
      style={style}
      data-ad-position={positionKey}
      data-ad-slot-id={adData.adSlotId}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adData.adClientId}
        data-ad-slot={adData.adSlotId}
        data-ad-format={adData.adFormat}
        data-full-width-responsive={adData.isResponsive ? "true" : "false"}
        ref={adRef}
      />
      
      {/* Ad performance indicator for admin */}
      {process.env.NODE_ENV === 'development' && (
        <div className="ad-debug-info" style={{ 
          fontSize: '10px', 
          color: '#666', 
          marginTop: '5px',
          padding: '2px 5px',
          backgroundColor: '#f8f9fa',
          borderRadius: '3px'
        }}>
          Position: {positionKey} | Slot: {adData.adSlotId} | Active: {adData.isActive ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
};

// Pre-configured ad components for different positions
export const HeaderBannerAd = ({ className, style }) => (
  <AdComponent 
    positionKey="header_banner" 
    className={className} 
    style={style}
    pageType="all"
  />
);

export const SidebarTopAd = ({ className, style }) => (
  <AdComponent 
    positionKey="sidebar_top" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const SidebarMiddleAd = ({ className, style }) => (
  <AdComponent 
    positionKey="sidebar_middle" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const SidebarBottomAd = ({ className, style }) => (
  <AdComponent 
    positionKey="sidebar_bottom" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const BelowTitleAd = ({ className, style }) => (
  <AdComponent 
    positionKey="below_title" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const InContentAd = ({ className, style }) => (
  <AdComponent 
    positionKey="in_content" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const EndOfArticleAd = ({ className, style }) => (
  <AdComponent 
    positionKey="end_of_article" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const MobileStickyFooterAd = ({ className, style }) => (
  <AdComponent 
    positionKey="mobile_sticky_footer" 
    className={className} 
    style={style}
    pageType="all"
  />
);

export const HomeHeroAd = ({ className, style }) => (
  <AdComponent 
    positionKey="home_hero" 
    className={className} 
    style={style}
    pageType="home"
  />
);

export const HomeSidebarAd = ({ className, style }) => (
  <AdComponent 
    positionKey="home_sidebar" 
    className={className} 
    style={style}
    pageType="home"
  />
);

export const CategoryHeaderAd = ({ className, style }) => (
  <AdComponent 
    positionKey="category_header" 
    className={className} 
    style={style}
    pageType="category"
  />
);

export const SearchResultsAd = ({ className, style }) => (
  <AdComponent 
    positionKey="search_results" 
    className={className} 
    style={style}
    pageType="search"
  />
);

// Generic ad component for custom positions
export const CustomAd = ({ positionKey, className, style, pageType = 'all' }) => (
  <AdComponent 
    positionKey={positionKey} 
    className={className} 
    style={style}
    pageType={pageType}
  />
);

export default AdComponent;
