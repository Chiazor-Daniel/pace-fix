"use client"

import { useState, useEffect, useMemo } from "react"
import Head from "next/head"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { Layout } from ".."
import SideBar from "./SideBar"
import { SidebarAd, EndOfArticleAd, StickyMobileFooterAd } from "../../components/AdsPlacements"
import {
  Adverts, Disclaimer, PostTitle, Sharers, SimpleSharers,
  BottomRecent, ArticleTitle, CommentDetails, WhatsappChannel
} from "../../components"
import { PostViews, PostReactions } from "../../components/metaInfo"
import { usePostContext } from "../../context"
import { Tags } from "../../data"
import AltImage from "../../images/backup-img.jpg"
import { UseFetchObject, SocialPreviews } from "../../custom"
import { useParams } from "next/navigation"
import GoogleAd from "@/app/googleAd/ad"

const addGoogleAds = (paragraphs) => {
  const scripts = [
    `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3536158399576400" data-ad-slot="9096348399" data-ad-format="auto"></ins>`,
    `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3536158399576400" data-ad-slot="7380011854" data-ad-format="auto"></ins>`
  ]
  let count = 0
  return paragraphs.map((p, i) => i % 4 === 0 ? `${p}<div class="ad-container">${scripts[count++ % 2]}</div>` : p)
}

const PostPage = () => {
  const [imgLoaded, setImgLoaded] = useState(true)
  const [postViews, setPostViews] = useState(0)
  const { postItem } = usePostContext()
  const params = useParams()
  const newsID = params?.id || ""
  const url = newsID ? `${process.env.NEXT_PUBLIC_API_URL}posts/${newsID}` : ""
  const { loading, data } = UseFetchObject(url)

  // fetch views once
  useEffect(() => {
    if (!newsID) return
    fetch(`/api/views/${newsID}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => typeof data.views === "number" && setPostViews(data.views))
      .catch(console.error)
  }, [newsID])

  const post = Object.keys(postItem || {}).length > 0 ? postItem : data
  const { title, yoast_head_json, content, categories = [], id, tags } = post || {}

  // Memoize processed HTML
  const information = useMemo(() => content?.rendered || "", [content])


  const Image = imgLoaded ? (yoast_head_json?.og_image?.[0]?.url || AltImage) : AltImage
  const imgCaption = yoast_head_json?.schema?.["@graph"]?.[2]?.caption || ""

  if (loading || !post) {
    return (
      <Layout>
        <div className="container my-5">
          <Skeleton height={400} className="w-100 mb-4 rounded" />
          <Skeleton width="60%" height={40} className="mb-3" />
          <Skeleton count={8} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{yoast_head_json?.title || (typeof title === "string" ? title : "Post")}</title>
        <meta property="og:title" content={yoast_head_json?.title || (typeof title === "string" ? title : "Post")} />
        <meta property="og:description" content={yoast_head_json?.og_description || ""} />
        <meta property="og:image" content={yoast_head_json?.og_image?.[0]?.url || "/logo.png"} />
      </Head>
      <SocialPreviews
        name={yoast_head_json.twitter_creator}
        type={yoast_head_json.twitter_card}
        title={yoast_head_json.title}
        description={yoast_head_json.og_description}
        image={yoast_head_json.og_image?.[0]?.url}
      />

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap" suppressHydrationWarning>
          <GoogleAd dataAdSlot="9096348399" />
        </div>
        <div className="row">
          <div className="col-md-9">
            <Adverts index={0} />

            <div className="row">
              <div className="col-md-1 sharers">
                <Sharers title={yoast_head_json?.title || (typeof title === "string" ? title : "")} image={Image} description={yoast_head_json?.og_description || ""} />
              </div>
              <div className="col-md-11 post-head">
                <div className="post-image-holder text-center">
                  <img
                    src={Image}
                    alt="Post"
                    className="shadow rounded img-fluid"
                    onError={() => setImgLoaded(false)}
                  />

                </div>
                {imgCaption && <p className="fw-bold mx-auto mt-2 text-muted"><small>{imgCaption}</small></p>}
              </div>
            </div>

            <PostTitle title={title?.rendered || (typeof title === "string" ? title : "")} details={yoast_head_json || { twitter_misc: {"Est. reading time": ["0 min"]}}} categories={categories} />
            <PostViews views={postViews} />

            <div dangerouslySetInnerHTML={{ __html: information }} className="news-holder pe-md-3" />

            <PostReactions postId={id} initialLikes={Math.floor(Math.random() * 50) + 5} />
            <SimpleSharers title={yoast_head_json?.title || (typeof title === "string" ? title : "")} image={Image} description={yoast_head_json?.og_description || ""} />
            <WhatsappChannel />
            <Disclaimer category={categories} />
            <CommentDetails post_id={id} />

            {tags?.length > 0 && (
              <div className="mb-3">
                <span className="badge rounded-pill bg-dark">Tags</span>
                {tags.map((tag, i) => (
                  <small key={i} className="badge rounded-pill bg-light ms-2 text-muted">
                    {Tags[tag]}
                  </small>
                ))}
              </div>
            )}

            <div className="mb-5">
              <ArticleTitle title="related posts" width={30} />
            </div>
            <BottomRecent categories={categories} />
            <EndOfArticleAd />
          </div>

          <div className="col-md-3">
            <SideBar />
            <SidebarAd />
          </div>
        </div>
      </div>
      <StickyMobileFooterAd />
    </Layout>
  )
}

export default PostPage
