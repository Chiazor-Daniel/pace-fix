"use client";

import { useEffect, useState, useRef } from 'react';

// Custom Ad Component that displays client's own ads
const CustomAdComponent = ({ 
  positionKey, 
  className = "", 
  style = {},
  pageType = 'all',
  pageUrl = ''
}) => {
  const [adData, setAdData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAdData = async () => {
      try {
        const response = await fetch(`/api/ads/custom/position/${positionKey}?pageType=${pageType}`);
        if (response.ok) {
          const data = await response.json();
          setAdData(data);
        }
      } catch (error) {
        console.error('Error loading custom ad data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdData();
  }, [positionKey, pageType]);

  useEffect(() => {
    if (adData && adData.isActive) {
      // Track ad view
      trackAdView(adData._id, pageUrl, pageType);
    }
  }, [adData, pageUrl, pageType]);

  const trackAdView = async (adId, url, type) => {
    try {
      await fetch('/api/ads/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adId,
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
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
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

  const renderAdContent = () => {
    switch (adData.adType) {
      case 'banner':
        return (
          <div className="custom-banner-ad">
            <a href={adData.content.linkUrl} target="_blank" rel="noopener noreferrer">
              <img 
                src={adData.content.imageUrl} 
                alt={adData.content.altText}
                className="img-fluid w-100"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            </a>
          </div>
        );
      
      case 'text':
        return (
          <div className="custom-text-ad p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h5 className="mb-2">{adData.content.title}</h5>
            <p className="mb-3 text-muted">{adData.content.description}</p>
            <a 
              href={adData.content.linkUrl} 
              className="btn btn-primary btn-sm"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {adData.content.buttonText || 'Learn More'}
            </a>
          </div>
        );
      
      case 'html':
        return (
          <div 
            className="custom-html-ad"
            dangerouslySetInnerHTML={{ __html: adData.content.html }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={`custom-ad-container ${className}`} 
      style={style}
      data-ad-position={positionKey}
      data-ad-id={adData._id}
    >
      {renderAdContent()}
      
      {/* Ad debug info for admin */}
      {process.env.NODE_ENV === 'development' && (
        <div className="ad-debug-info" style={{ 
          fontSize: '10px', 
          color: '#666', 
          marginTop: '5px',
          padding: '2px 5px',
          backgroundColor: '#f8f9fa',
          borderRadius: '3px'
        }}>
          Custom Ad: {adData.title} | Position: {positionKey} | Active: {adData.isActive ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
};

// Pre-configured custom ad components for different positions
export const HeaderBannerCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="header_banner" 
    className={className} 
    style={style}
    pageType="all"
  />
);

export const SidebarTopCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="sidebar_top" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const SidebarMiddleCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="sidebar_middle" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const SidebarBottomCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="sidebar_bottom" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const BelowTitleCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="below_title" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const InContentCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="in_content" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const EndOfArticleCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="end_of_article" 
    className={className} 
    style={style}
    pageType="post"
  />
);

export const MobileStickyFooterCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="mobile_sticky_footer" 
    className={className} 
    style={style}
    pageType="all"
  />
);

export const HomeHeroCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="home_hero" 
    className={className} 
    style={style}
    pageType="home"
  />
);

export const HomeSidebarCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="home_sidebar" 
    className={className} 
    style={style}
    pageType="home"
  />
);

export const CategoryHeaderCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="category_header" 
    className={className} 
    style={style}
    pageType="category"
  />
);

export const SearchResultsCustomAd = ({ className, style }) => (
  <CustomAdComponent 
    positionKey="search_results" 
    className={className} 
    style={style}
    pageType="search"
  />
);

// Generic custom ad component for custom positions
export const CustomAd = ({ positionKey, className, style, pageType = 'all' }) => (
  <CustomAdComponent 
    positionKey={positionKey} 
    className={className} 
    style={style}
    pageType={pageType}
  />
);

export default CustomAdComponent;

