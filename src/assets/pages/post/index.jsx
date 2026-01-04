"use client"

import React, { useState, useEffect, useMemo } from "react"
import Head from "next/head"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { Layout } from ".."
import SideBar from "./SideBar"
import { SidebarAd, EndOfArticleAd, StickyMobileFooterAd } from "../../components/AdsPlacements"
import {
  Adverts, Disclaimer, PostTitle, Sharers, SimpleSharers,
  BottomRecent, ArticleTitle, CommentDetails, WhatsappChannel,
  AdsSliderStrip
} from "../../components"
import { PostViews, PostReactions } from "../../components/metaInfo"
import { usePostContext } from "../../context"
import { Tags } from "../../data"
import AltImage from "../../images/backup-img.jpg"
import { UseFetchObject, SocialPreviews } from "../../custom"
import { useParams } from "next/navigation"
import { InContentCustomAd } from "@/components/CustomAdManager"
import GoogleAd from "@/app/googleAd/ad"

const insertAds = (htmlContent) => {
  if (!htmlContent) return [];

  const paragraphs = htmlContent.split('</p>');
  const result = [];

  paragraphs.forEach((p, index) => {
    if (p.trim()) {
      result.push(<div key={`p-${index}`} dangerouslySetInnerHTML={{ __html: p + '</p>' }} />);
    }

    // Inject ad after every 4th paragraph to avoid overwhelming content
    if ((index + 1) % 4 === 0 && index !== paragraphs.length - 1 && index > 0) {
      const isEven = (index + 1) % 8 === 0;
      result.push(
        <div key={`ad-${index}`} className="my-4 text-center border-top border-bottom py-3 bg-light">
          <small className="text-muted d-block mb-2">Advertisement</small>
          {isEven ? (
            <GoogleAd dataAdSlot="7380011854" />
          ) : (
            <InContentCustomAd />
          )}
        </div>
      );
    }
  });

  // Only add final ad if content is very long (more than 8 paragraphs)
  if (paragraphs.length > 8) {
    result.push(
      <div key="ad-final" className="my-4 text-center">
        <GoogleAd dataAdSlot="7380011854" />
      </div>
    );
  }

  return result;
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
      .then((data) => {
        if (typeof data.views === "number") {
          // Deterministic random offset based on newsID (1000-2000 range)
          let seed = 0;
          const str = newsID.toString();
          for (let i = 0; i < str.length; i++) seed += str.charCodeAt(i);
          const random = Math.abs(Math.sin(seed) * 10000) % 1;
          const offset = Math.floor(random * 1001) + 1000; // 1000 to 2000

          setPostViews(data.views + offset)
        }
      })
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
        <div className="container mt-4">
          <AdsSliderStrip />
        </div>
        <div className="row">
          <div className="col-md-9">
            {/* <Adverts index={0} /> */}

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

            <PostTitle title={title?.rendered || (typeof title === "string" ? title : "")} details={yoast_head_json || { twitter_misc: { "Est. reading time": ["0 min"] } }} categories={categories} />
            <PostViews views={postViews} />

            <div className="news-holder pe-md-3">
              {insertAds(information)}
            </div>

            <PostReactions postId={id} initialLikes={Math.floor(Math.random() * 50) + 5} />
            <SimpleSharers title={yoast_head_json?.title || (typeof title === "string" ? title : "")} image={Image} description={yoast_head_json?.og_description || ""} />
            <WhatsappChannel />
            <Disclaimer category={categories} />
            <CommentDetails post_id={id} />

            {tags?.length > 0 && (
              <div className="mb-3 d-flex flex-wrap align-items-center gap-2">
                <span className="badge rounded-pill bg-dark">Tags</span>
                {tags.map((tag, i) => (
                  <small key={i} className="badge rounded-pill bg-light text-muted border">
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
