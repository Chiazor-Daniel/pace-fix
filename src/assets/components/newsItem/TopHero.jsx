"use client"

import PropTypes from "prop-types"

import { AuthorTime } from "../metaInfo"

import "./style.css"
import { Categories } from "../../data"
import Link from "next/link"

const TopHero = ({ id, date, slug, title, content, categories, yoast_head_json }) => {
  const imageUrl = yoast_head_json.og_image[0].url
  const author = yoast_head_json.author

  return (
    <div className="col-md-12 p-2 mx-2 top-hero d-flex shadow" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="hero-overlay d-flex flex-column">
        <div className="h-50" />
        <div className="m-auto w-75 text-white">
          <p className="text-center">
            {categories.map((id) => (
              <Link
                className="text-white text-decoration-none fw-bold me-1 category"
                href={`/category/${Categories[id]}`}
                key={id}
              >
                {Categories[id]}
              </Link>
            ))}
          </p>
          <p
            className="fs-4 poppins text-center fw-bold title fs-16-mobile"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
          <AuthorTime
            date={date}
            comments={2}
            author={author}
            readTime={yoast_head_json.twitter_misc["Est. reading time"][0]}
            between
          />
        </div>
      </div>
    </div>
  )
}

TopHero.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.object,
  content: PropTypes.object,
  categories: PropTypes.array,
  yoast_head_json: PropTypes.object,
}

export default TopHero
