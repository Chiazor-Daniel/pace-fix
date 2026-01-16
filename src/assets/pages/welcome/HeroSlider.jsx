"use client"
import { useRouter } from "next/navigation"
import Slider from "react-slick"
import { HandleWidth, UseFetch } from "../../custom"
import { Preloader } from "../../components/loaders"
import { TopHero, AdsSliderStrip } from "../../components"
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

  const handlePostClick = (item) => {
    updatePostItem(item)
    router.push(`/post/${item.id}/${item.slug}`)
  }

  if (loading) return <Preloader fixed />

  return (
    <div className="my-5">
      <AdsSliderStrip />

      <div className="mb-4 text-center">
        <GoogleAd dataAdSlot="9096348399" />
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
    </div>
  )
}

export default HeroSlider