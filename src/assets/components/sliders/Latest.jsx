"use client"

import Slider from "react-slick"

import { Categories } from "../../data"
import { LittlePieceSegment, VerticalSegment } from "../newsItem"
import { Preloader } from "../loaders"
import { HandleWidth, UseFetch } from "../../custom"

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 3,
  lazyLoad: true,
  slidesToShow: 3,
  vertical: true,
  verticalSwiping: true,
}

// get categories name and id
const getCategory = (ids) => {
  for (const id of ids) {
    const name = Categories[id]
    if (name) return { name, id }
  }
  return { name: "news", id: 6 }
}

const Latest = ({ light = false, class_ = "" }) => {
  // fetch posts
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts`
  const { loading, data } = UseFetch(url, "posts")

  if (loading)
    return (
      <div className="position-relative" style={{ height: 400 }}>
        <Preloader />
      </div>
    )
  else {
    return (
      <div className={`latest-slider position-relative ${light && "latest-light"} ${class_}`}>
        <Slider {...sliderSettings}>
          {data.slice(0, 6).map((item) => {
            return <LittlePieceSegment key={item.id} {...item} item={item} />
          })}
        </Slider>
      </div>
    )
  }
}

export const SideBar = ({ class_ = "" }) => {
  // fetch post if it doesn't already exist
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts`
  const { loading, data } = UseFetch(url, "posts")

  if (loading)
    return (
      <div className="position-relative" style={{ height: 400 }}>
        <Preloader />
      </div>
    )
  else {
    return (
      <div className={`latest-slider position-relative mt-5 ${class_}`}>
        {data.slice(0, 6).map((item, index) => {
          if (index === 0 || index === 3) {
            const category = getCategory(item.categories)
            return (
              <VerticalSegment
                key={item.id}
                {...item}
                item={item}
                titleClass="fs-5"
                imgClass="min-h-200 mt-5"
                sharePost={true}
                catName={category.name}
              />
            )
          } else {
            return <LittlePieceSegment key={item.id} {...item} item={item} />
          }
        })}
      </div>
    )
  }
}

export const BottomRecent = ({ categories }) => {
  const category = getCategory(categories)
  const width = HandleWidth()
  // fetch post if it doesn't already exist
  const url = `${process.env.REACT_APP_API_URL}posts?categories=${category.id}&per_page=16`
  const { loading, data } = UseFetch(url, `posts_${category.name}`)
  if (loading)
    return (
      <div className="position-relative" style={{ height: 400 }}>
        <Preloader />
      </div>
    )
  else {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      lazyLoad: true,
      slidesToShow: width < 800 ? 1 : 2,
    }
    return (
      <div className="row">
        <Slider {...settings}>
          {data.slice(0, 4).map((item) => (
            <VerticalSegment showDesc={false} key={item.id} {...item} catName={category.name} item={item} />
          ))}
        </Slider>
      </div>
    )
  }
}

export default Latest
