"use client"

import { useRouter } from "next/navigation"
import Slider from "react-slick"

import { HandleWidth, UseFetch } from "../../custom"
import { Preloader } from "../../components/loaders"
import { Adverts, TopHero } from "../../components"
import { usePostContext } from "../../context"

const HeroSlider = () => {
  // programmatically resize slider with width and get general API URL
  const width = HandleWidth()
  // keep this field prefix for the url ...
  // ?_fields=id,date,slug,title,yoast_head_json.og_image,yoast_head_json.author,content
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts?per_page=10`
  // fetch posts
  const { loading, data } = UseFetch(url, "posts")

  const router = useRouter()
  const { updatePostItem } = usePostContext()

  // Settings needed by the slider (including responsive for center appearance)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    lazyLoad: true,
    className: "center",
    centerMode: true,
    centerPadding: "50px",
    slidesToShow: width < 800 ? 1 : width < 1000 ? 2 : 3,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          centerPadding: "15px",
        },
      },
    ],
  }
  if (loading) return <Preloader fixed />
  else {
    return (
      <div className="row my-5 m-auto">
        <Adverts index={0} />
        <Slider {...sliderSettings}>
          {data.slice(4, 10).map((item) => {
            // ?_fields=id,date,slug,title,yoast_head_json.og_image,yoast_head_json.author,content,
            // const {id, date, slug, title, content, categories, yoast_head_json} = item;
            const { id, slug } = item

            const handlePostClick = () => {
              updatePostItem(item)
              router.push(`/post/${id}/${slug}`)
            }

            return (
              <div onClick={handlePostClick} className="text-decoration-none pointer" key={id}>
                <TopHero {...item} />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}

export default HeroSlider
