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
  const [userReaction, setUserReaction] = React.useState(null)

  const reactions = [
    { label: "Like", emoji: "👍", color: "#007bff" },
    { label: "Love", emoji: "❤️", color: "#e83e8c" },
    { label: "Haha", emoji: "😂", color: "#ffc107" },
    { label: "Wow", emoji: "😮", color: "#17a2b8" },
    { label: "Sad", emoji: "😢", color: "#6c757d" },
    { label: "Angry", emoji: "😡", color: "#dc3545" },
  ]

  React.useEffect(() => {
    if (!postId) return;
    fetch(`/api/likes/${postId}`)
      .then(res => res.json())
      .then(data => {
        if (typeof data.likes === 'number') setLikes(data.likes);
      })
      .catch(err => console.error('Failed to fetch post likes:', err));

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`reaction_post_${postId}`);
      if (stored) setUserReaction(stored);
      else if (localStorage.getItem(`liked_post_${postId}`)) setUserReaction("👍");
    }
  }, [postId]);

  const handleReaction = (reaction) => {
    if (userReaction) return;
    fetch(`/api/likes/${postId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (typeof data.likes === 'number') setLikes(data.likes);
        setUserReaction(reaction);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`reaction_post_${postId}`, reaction);
        }
      })
      .catch(err => console.error('Failed to increment post like:', err));
  };

  const selectedReaction = reactions.find(r => r.emoji === userReaction);

  return (
    <div className="reaction-wrapper my-4 p-3 bg-light rounded">
      <div className="mb-2">
        <small className="text-muted fw-bold">How do you feel about this article?</small>
      </div>

      {/* Show all reactions upfront */}
      <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
        {reactions.map((r) => (
          <button
            key={r.label}
            className={`reaction-btn-visible btn px-3 py-2 border rounded-pill d-flex align-items-center gap-2 transition-all ${userReaction === r.emoji ? 'active' : ''
              }`}
            onClick={() => handleReaction(r.emoji)}
            disabled={!!userReaction}
            title={r.label}
            style={{
              fontSize: '1.2rem',
              backgroundColor: userReaction === r.emoji ? r.color : 'white',
              color: userReaction === r.emoji ? 'white' : '#333',
              borderColor: userReaction === r.emoji ? r.color : '#ddd',
              opacity: userReaction && userReaction !== r.emoji ? 0.5 : 1,
              cursor: userReaction ? 'not-allowed' : 'pointer'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{r.emoji}</span>
            <span className="small fw-bold">{r.label}</span>
          </button>
        ))}
      </div>

      {/* Reaction count */}
      <div className="d-flex align-items-center gap-2 pt-2 border-top">
        <div className="d-flex align-items-center">
          <span className="reaction-small-icon">👍</span>
          <span className="reaction-small-icon">❤️</span>
          <span className="reaction-small-icon">😂</span>
        </div>
        <span className="fw-bold text-muted" style={{ fontSize: '0.9rem' }}>
          {likes.toLocaleString()} {likes === 1 ? 'reaction' : 'reactions'}
        </span>
      </div>
    </div>
  );
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
