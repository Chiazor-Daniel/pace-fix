"use client"
import { useRouter } from "next/navigation"
import Slider from "react-slick"
import { HandleWidth, UseFetch } from "../../custom"
import { Preloader } from "../../components/loaders"
import { Adverts, TopHero } from "../../components"
import { usePostContext } from "../../context"
import GoogleAd from "@/app/googleAd/ad"

const HeroSlider = () => {
  const width = HandleWidth()
  const router = useRouter()
  const { updatePostItem } = usePostContext()

  const url = `${process.env.NEXT_PUBLIC_API_URL}posts?per_page=10`
  const { loading, data } = UseFetch(url, "posts")

  const slidesToShow = width < 800 ? 1 : width < 1000 ? 2 : 3
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    lazyLoad: true,
    className: "center",
    centerMode: true,
    centerPadding: width < 700 ? "15px" : "50px",
    slidesToShow,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  }

  // Ad slider settings - no controls, continuous scroll
  const adSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2000,
    slidesToShow: width < 600 ? 1 : width < 900 ? 2 : width < 1200 ? 3 : 4,
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

  const handlePostClick = (item) => {
    updatePostItem(item)
    router.push(`/post/${item.id}/${item.slug}`)
  }

  if (loading) return <Preloader fixed />

  const adItems = [
    <GoogleAd dataAdSlot="9096348399" key="ad1" />,
    <GoogleAd dataAdSlot="7380011854" key="ad2" />,
    <Adverts index={1} key="advert1" />,
    <Adverts index={0} key="advert0" />,
    <Adverts index={2} key="advert2" />,
    <Adverts index={3} key="advert3" />,
    <Adverts index={4} key="advert4" />
  ]

  return (
    <div className="my-5">
      {/* --- Ad Slider Strip --- */}
      <div className="mb-4 ad-slider-container">
        <Slider {...adSliderSettings}>
          {adItems.map((ad, index) => (
            <div key={index} className="ad-slide">
              {ad}
            </div>
          ))}
        </Slider>
      </div>

      {/* --- Hero Post Slider --- */}
      <Slider {...sliderSettings}>
        {data?.slice(4, 10).map((item) => (
          <div
            onClick={() => handlePostClick(item)}
            className="text-decoration-none pointer"
            key={item.id}
          >
            <TopHero {...item} />
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .ad-slider-container {
          height: 300px;
          overflow: hidden;
        }
        
        .ad-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          height: 300px;
          padding: 0 25px;
        }

        /* Hide any slider navigation that might appear */
        .ad-slider-container .slick-dots,
        .ad-slider-container .slick-arrow {
          display: none !important;
        }

        /* Ensure smooth continuous scrolling */
        .ad-slider-container .slick-track {
          display: flex !important;
          align-items: center;
        }

        .ad-slider-container .slick-slide {
          height: auto;
        }
      `}</style>
    </div>
  )
}

export default HeroSlider