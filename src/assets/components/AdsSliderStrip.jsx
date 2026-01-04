"use client"
import Slider from "react-slick"
import { HandleWidth } from "../custom"
import { Adverts } from "."
import GoogleAd from "@/app/googleAd/ad"

const AdsSliderStrip = () => {
    const width = HandleWidth()

    // Ad slider settings - no controls, continuous scroll
    const adSliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000,
        slidesToShow: width < 600 ? 1 : width < 900 ? 2 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        pauseOnHover: false,
        pauseOnFocus: false,
        swipe: false,
        touchMove: false,
        draggable: false,
    }

    const adItems = [
        <GoogleAd dataAdSlot="9096348399" key="ad1" />,
        <GoogleAd dataAdSlot="7380011854" key="ad2" />,
        <Adverts index={1} key="advert1" hideLabel />,
        <Adverts index={0} key="advert0" hideLabel />,
        <Adverts index={2} key="advert2" hideLabel />,
        <Adverts index={3} key="advert3" hideLabel />,
        <Adverts index={4} key="advert4" hideLabel />
    ]

    return (
        <div className="mb-4 ad-slider-container shadow-sm border rounded bg-white">
            <Slider {...adSliderSettings}>
                {adItems.map((ad, index) => (
                    <div key={index} className="ad-slide">
                        {ad}
                    </div>
                ))}
            </Slider>

            <style jsx>{`
        .ad-slider-container {
          height: 150px;
          overflow: hidden;
        }
        
        .ad-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          height: 150px;
          padding: 0 20px;
        }

        .ad-slider-container .slick-dots,
        .ad-slider-container .slick-arrow {
          display: none !important;
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
