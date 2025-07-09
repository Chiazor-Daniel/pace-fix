"use client"

import { manipulateDate2, UseFetch } from "../../../custom"

import "./style.css"
import Form from "./Form"
import { ArticleTitle } from "../../headers"

const Details = ({ post_id }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}comments/?post=${post_id}`
  // Get exiting comments for the post.
  const { loading, data } = UseFetch(url)
  return (
    <div className="container">
      {!loading && (
        <div className="my-5">
          <ArticleTitle
            title={data.length === 0 ? "" : data.length === 1 ? "1 Comment" : `${data.length} Comments`}
            width={30}
          />
          <p className="mb-4" />
          {data.map((comment) => (
            <div className="my-5" key={comment.id}>
              <h4 className="text-muted raleway fw-bold mb-3">{comment.author_name}</h4>
              <p dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
              <small className="fw-bold">{manipulateDate2(comment.date)}</small>
            </div>
          ))}
        </div>
      )}
      <Form post_id={post_id} />
    </div>
  )
}

export default Details
