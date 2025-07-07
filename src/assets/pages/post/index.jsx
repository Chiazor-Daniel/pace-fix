"use client"

import { useState, useEffect } from "react"

import { Layout } from ".."
import SideBar from "./SideBar"
import {
  Adverts,
  Disclaimer,
  PostTitle,
  Sharers,
  SimpleSharers,
  BottomRecent,
  ArticleTitle,
  CommentDetails,
  WhatsappChannel,
} from "../../components"
import { PostViews, PostReactions } from "../../components/metaInfo"
import { usePostContext } from "../../context"
import { Tags } from "../../data"

import AltImage from "../../images/backup-img.jpg"
import "./style.css"
import { UseFetch, SocialPreviews } from "../../custom"
import { Preloader } from "../../components/loaders"

const addGoogleAds = (paragraphs) => {
  const script0 = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
         crossorigin="anonymous">
    </script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3536158399576400"
         data-ad-slot="9096348399"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
`
  const script1 = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
         crossorigin="anonymous">
    </script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3536158399576400"
         data-ad-slot="7380011854"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
`

  let count = 0
  const adScripts = {
    0: script0,
    1: script1,
  }

  for (const index in paragraphs) {
    // Add advert script every 4 paragraphs
    if (index % 4 === 0) {
      const addition = `
            <div class="ad-container">${adScripts[count]}</div>
          `
      paragraphs[index] = paragraphs[index] + addition

      if (count === 0) count = 1
      else count = 0
    }
  }
  return paragraphs
}

const PostPage = () => {
  const [imgLoaded, setImgLoaded] = useState(true)
  const [postViews, setPostViews] = useState(0)
  const { postItem } = usePostContext()
  let title, yoast_head_json, content, categories, id, tags
  let information = ""

  // Always call hooks at the top level
  // get news id from url
  const newsID = typeof window !== "undefined" ? window.location.pathname.split("/")[2] : ""
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts/${newsID}`
  // Fetch current news and store as post ID
  const { loading, data } = UseFetch(url, `post_${newsID}`)

  // Simulate post views - in real app, this would come from API
  useEffect(() => {
    if (newsID) {
      // Get views from localStorage or set random number for demo
      const savedViews = localStorage.getItem(`post_views_${newsID}`)
      if (savedViews) {
        setPostViews(Number.parseInt(savedViews))
      } else {
        // Generate random views for demo (50-5000)
        const randomViews = Math.floor(Math.random() * 4950) + 50
        setPostViews(randomViews)
        localStorage.setItem(`post_views_${newsID}`, randomViews.toString())
      }

      // Increment view count
      setTimeout(() => {
        const currentViews = Number.parseInt(localStorage.getItem(`post_views_${newsID}`) || "0")
        const newViews = currentViews + 1
        setPostViews(newViews)
        localStorage.setItem(`post_views_${newsID}`, newViews.toString())
      }, 2000)
    }
  }, [newsID])

  // Check postItem is not empty by confirming title
  if (Object.keys(postItem).length === 0) {
    if (loading) return <Preloader />
    else {
      // destructuring needed variables
      ;({ title, yoast_head_json, content, categories, id, tags } = data)
      // Usually when you get here using a copied url
    }
  } else {
    // When you are clicking a post from the main page.
    ;({ title, yoast_head_json, content, categories, id, tags } = postItem)
  }

  const Image = imgLoaded ? yoast_head_json.og_image[0].url : AltImage
  const imgCaption = yoast_head_json.schema["@graph"][2].caption
  information = content.rendered

  // Set up variables for meta details
  const { title: og_title, twitter_creator, twitter_card, og_description, og_image } = yoast_head_json

  const addAdvertToNewsInfo = (html) => {
    // Split the html into an array. separate using the paragraph.
    html = html.split("</p>")
    let count = 1
    let existingAdvert = typeof window !== "undefined" ? sessionStorage.getItem("pacesetter_adverts") : null
    if (existingAdvert) {
      // Get advert from session Storage
      existingAdvert = JSON.parse(existingAdvert)
      //   Loop through the array and add advert image to the chosen paragraph.
      for (const index in html) {
        // Add advert image after every 2 paragraph if count is less than 5
        if (index % 3 === 0) {
          if (count >= 5) break
          else if (count < 5) {
            const advertImage = `
            <div class="text-center my-4">
              <p>
                <b>
                  <small>Advertisement</small>
                </b>
              </p>
              <img
                src=${existingAdvert[count].image_file}
                alt="Advert ${count}"
                class="img-thumbnail rounded advert-img-max-height"
              />
        </div>
    `
            html[index] = html[index] + advertImage
            // increment counter.
            count++
          }
        }
      }
    }
    html = addGoogleAds(html)
    //   Join the modified html array into a string and return
    html = html.join("")
    // Use regular expressions to replace width and remove height
    html = html.replace(/width="\d+"/g, 'width="100%"').replace(/height="\d+"/g, "")

    return html
  }

  try {
    information = addAdvertToNewsInfo(information)
  } catch (e) {
    console.error("Error joining advert images to post.", e)
    information = content.rendered
  }

  return (
    <Layout>
      <SocialPreviews
        name={twitter_creator}
        type={twitter_card}
        title={og_title}
        description={og_description}
        image={og_image[0].url}
      />
      <div className="post-container my-5">
        <div className="row">
          <div className="col-md-9">
            <Adverts index={0} />
            <div className="row">
              <div className="col-md-1 sharers">
                <Sharers title={yoast_head_json.title} image={og_image[0].url} description={og_description} />
              </div>
              <div className="col-md-11 post-head">
                <div className="post-image-holder text-center">
                  <img src={Image || "/placeholder.svg"} alt="Post title" className="shadow rounded" />
                  <img
                    src={Image || "/placeholder.svg"}
                    alt="Backup Pic"
                    style={{ display: "none" }}
                    onError={() => setImgLoaded(false)}
                  />
                </div>
                <p className="fw-bold mx-auto mt-2 text-muted">
                  <small>{imgCaption}</small>
                </p>
              </div>
            </div>
            <div className="row my-1 align-items-start">
              <div className="col-md-12 px-0">
                <PostTitle title={title.rendered} details={yoast_head_json} categories={categories} />

                {/* Post Views */}
                <PostViews views={postViews} />

                <div dangerouslySetInnerHTML={{ __html: information }} className="news-holder pe-md-3" />

                {/* Post Reactions */}
                <PostReactions postId={id} initialLikes={Math.floor(Math.random() * 50) + 5} />

                <SimpleSharers title={yoast_head_json.title} image={og_image[0].url} description={og_description} />
                <WhatsappChannel />
                <Disclaimer category={categories} />
                {/* Comments */}
                <CommentDetails post_id={id} />
                <Adverts index={5} />
                {tags.length > 0 && (
                  <div className="mb-3">
                    <span className="badge rounded-pill bg-dark">Tags</span>
                    {tags.map((tag, index) => (
                      <small key={index} className="badge rounded-pill bg-light ms-2 text-muted">
                        {Tags[tag]}
                      </small>
                    ))}
                  </div>
                )}
                <div className="mb-5">
                  <ArticleTitle title="related posts" width={30} />
                </div>
                <BottomRecent categories={categories} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <SideBar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage
