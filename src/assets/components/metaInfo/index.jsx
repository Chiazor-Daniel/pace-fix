"use client"

import React from "react"

import { CgComment, CgEye, CgHeart } from "react-icons/cg"
import { PiClockCountdownFill } from "react-icons/pi"

import PropTypes from "prop-types"
import { manipulateDate2 } from "../../custom"

export const AuthorTime = ({ author, date, comments, readTime, between }) => (
  /* This consists of the Author information and a formatted date. */
  <div
    className={`d-flex fs-13 fs-11-mobile fw-bold ${between ? "justify-content-between" : "justify-content-around"}`}
  >
    <p>
      {author}, {manipulateDate2(date)}
    </p>
    <p className="d-none">
      <CgComment className="mx-2" /> {comments}
    </p>
    {readTime && (
      <p>
        <PiClockCountdownFill className="mx-1" /> {readTime} min(s) read
      </p>
    )}
  </div>
)

export const ViewComment = ({ comment = 0, views = 0 }) => (
  <div className="d-flex align-items-center">
    <span className="d-flex align-items-center me-3 text-muted">
      <CgEye className="me-1" />
      <small>
        {views} {views === 1 ? "view" : "views"}
      </small>
    </span>
    <span className="d-flex align-items-center text-muted d-none">
      <CgComment className="me-1" />
      <small>
        {comment} {comment === 1 ? "comment" : "comments"}
      </small>
    </span>
  </div>
)

export const PostViews = ({ views = 0 }) => (
  <div className="d-flex align-items-center text-muted mb-2">
    <CgEye className="me-2 text-primary" size={18} />
    <span className="fw-bold">
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  </div>
)

export const PostReactions = ({ postId, initialLikes = 0 }) => {
  const [likes, setLikes] = React.useState(initialLikes)
  const [hasLiked, setHasLiked] = React.useState(false)

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1)
      setHasLiked(true)
      // Here you would typically make an API call to save the like
      // saveLike(postId);
    }
  }

  return (
    <div className="d-flex align-items-center gap-3 my-3 p-3 bg-light rounded">
      <button
        className={`btn btn-sm d-flex align-items-center gap-2 ${hasLiked ? "btn-primary" : "btn-outline-primary"}`}
        onClick={handleLike}
        disabled={hasLiked}
      >
        <CgHeart size={18} />
        <span>
          {likes} {likes === 1 ? "Like" : "Likes"}
        </span>
      </button>
      <small className="text-muted">
        {hasLiked ? "Thanks for your reaction!" : "Show your support for this article"}
      </small>
    </div>
  )
}

AuthorTime.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  readTime: PropTypes.string,
  between: PropTypes.bool,
}

ViewComment.propTypes = {
  comment: PropTypes.number,
  views: PropTypes.number,
}

PostViews.propTypes = {
  views: PropTypes.number,
}

PostReactions.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialLikes: PropTypes.number,
}
