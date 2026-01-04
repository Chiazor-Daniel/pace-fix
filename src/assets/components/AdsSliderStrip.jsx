"use client"
import Slider from "react-slick"
import { HandleWidth } from "../custom"
import { Adverts } from "."

const AdsSliderStrip = () => {
  const width = HandleWidth()

  // Ad slider settings - no controls, continuous scroll
  // We avoid Google Ads here because Slick Slider clones elements 
  // which breaks Google AdSense initialization.
  const adSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: width < 600 ? 1 : width < 900 ? 2 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    swipe: true,
  }

  const adItems = [
    <Adverts index={0} key="advert0" hideLabel />,
    <Adverts index={1} key="advert1" hideLabel />,
    <Adverts index={2} key="advert2" hideLabel />,
    <Adverts index={3} key="advert3" hideLabel />,
    <Adverts index={4} key="advert4" hideLabel />,
    <Adverts index={5} key="advert5" hideLabel />,
    <Adverts index={6} key="advert6" hideLabel />
  ]

  return (
    <div className="mb-4 ad-slider-outer">
      <div className="ad-slider-container shadow-sm border rounded bg-white overflow-hidden">
        <Slider {...adSliderSettings}>
          {adItems.map((ad, index) => (
            <div key={index} className="ad-slide">
              <div className="ad-content-wrapper">
                {ad}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx>{`
        .ad-slider-outer {
          position: relative;
          z-index: 10;
        }
        
        .ad-slider-container {
          height: 120px;
        }
        
        .ad-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          height: 120px;
          outline: none;
        }

        .ad-content-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }

        .ad-slider-container .slick-track {
          display: flex !important;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default AdsSliderStrip
