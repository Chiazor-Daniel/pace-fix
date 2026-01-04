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
  const [showReactions, setShowReactions] = React.useState(false)

  const reactions = [
    { label: "Like", emoji: "👍", color: "#007bff" },
    { label: "Love", emoji: "❤️", color: "#e83e8c" },
    { label: "Haha", emoji: "😂", color: "#ffc107" },
    { label: "Wow", emoji: "😮", color: "#ffc107" },
    { label: "Sad", emoji: "😢", color: "#ffc107" },
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
        setShowReactions(false);
      })
      .catch(err => console.error('Failed to increment post like:', err));
  };

  const selectedReaction = reactions.find(r => r.emoji === userReaction) || reactions[0];

  return (
    <div className="reaction-wrapper my-4">
      <div className="d-flex align-items-center gap-3">
        <div
          className="position-relative"
          onMouseEnter={() => !userReaction && setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          {/* Reaction Bar (Pill) */}
          {showReactions && (
            <div className="reaction-bar shadow-lg bg-white rounded-pill px-2 py-1 d-flex gap-2">
              {reactions.map((r) => (
                <button
                  key={r.label}
                  className="reaction-btn btn p-1 border-0 rounded-circle transition-all hover-scale"
                  onClick={() => handleReaction(r.emoji)}
                  title={r.label}
                  style={{ fontSize: '1.8rem' }}
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}

          {/* Main Toggle Button */}
          <button
            className={`btn rounded-pill d-flex align-items-center gap-2 px-3 py-2 border-0 shadow-sm transition-all ${userReaction ? 'bg-white' : 'btn-outline-secondary'}`}
            onClick={() => !userReaction && handleReaction("👍")}
            style={{
              color: userReaction ? selectedReaction.color : 'inherit',
              fontWeight: userReaction ? '700' : '500'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{userReaction || "👍"}</span>
            <span>{userReaction ? selectedReaction.label : "Like"}</span>
          </button>
        </div>

        <div className="reaction-stats d-flex align-items-center gap-2">
          <div className="d-flex -space-x-2">
            <span className="reaction-small-icon">👍</span>
            <span className="reaction-small-icon">❤️</span>
          </div>
          <span className="fw-bold text-muted" style={{ fontSize: '0.9rem' }}>
            {likes.toLocaleString()}
          </span>
        </div>
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
