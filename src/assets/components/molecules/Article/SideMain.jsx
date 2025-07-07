"use client"

import { TextFirstSegment } from "../../newsItem"
import { UseFetch } from "../../../custom"
import { Preloader } from "../../loaders"
import { LatestSlider, ArticleTitle, Adverts } from "../.."

const SideMain = () => {
  // fetch posts
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts`
  const { loading, data } = UseFetch(url, "posts")

  return (
    <>
      {loading ? (
        <div className="position-relative" style={{ height: 400 }}>
          <Preloader />
        </div>
      ) : (
        data.slice(2, 8).map((item) => <TextFirstSegment key={item.id} {...item} item={item} />)
      )}
      <div>
        <ArticleTitle title="latest" width={30} class_="fs-5" />
        <LatestSlider class_="mt-5" />
        <Adverts index={5} />
      </div>
    </>
  )
}

export default SideMain
