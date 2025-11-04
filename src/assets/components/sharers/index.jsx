"use client"

import PropTypes from "prop-types"
import { FaFacebook, FaXTwitter, FaWhatsapp, FaTelegram, FaLinkedin, FaThreads } from "react-icons/fa6"

import "./style.css"

const formatShareUrl = (shareLink, link, name, title = "", image = "", description = "") => {
  // Encode parameters for sharing
  const encodedLink = encodeURIComponent(link)
  const encodedTitle = encodeURIComponent(title)
  const encodedImage = encodeURIComponent(image)
  const encodedDescription = encodeURIComponent(description)

  switch (name) {
    case "Facebook":
    case "facebook":
      // Facebook sharing with image and description
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encodedTitle}`

    case "Twitter":
    case "x":
      // Twitter with text and image
      return `https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}&via=PacesetterFrontier`

    case "Threads":
    case "threads":
      // Threads sharing
      return `https://threads.net/intent/post?text=${encodedTitle} ${encodedLink}`

    case "Whatsapp":
    case "whatsapp":
      // WhatsApp with title and link
      return `https://wa.me/?text=${encodedTitle} ${encodedLink}`

    case "Telegram":
    case "telegram":
      // Telegram with title and link
      return `https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`

    case "LinkedIn":
    case "linkedin":
      // LinkedIn with title, summary and source
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}&title=${encodedTitle}&summary=${encodedDescription}&source=PacesetterFrontier`

    default:
      return shareLink + encodedLink
  }
}

const shareSocials = [
  {
    name: "Whatsapp",
    shareLink: "https://wa.me/?text=",
    icon: <FaWhatsapp className="text-success" />,
  },
  {
    name: "Facebook",
    shareLink: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: <FaFacebook className="text-primary" />,
  },
  {
    name: "Twitter",
    shareLink: "https://twitter.com/intent/tweet?url=",
    icon: <FaXTwitter className="text-dark" />,
  },
  {
    name: "Threads",
    shareLink: "https://threads.net/intent/post?text=",
    icon: <FaThreads className="text-dark" />,
  },
  {
    name: "Telegram",
    shareLink: "https://t.me/share/url?url=",
    icon: <FaTelegram className="text-info" />,
  },
  {
    name: "LinkedIn",
    shareLink: "https://www.linkedin.com/sharing/share-offsite/?url=",
    icon: <FaLinkedin className="text-primary" />,
  },
]

const simpleSocials = [
  {
    name: "whatsapp",
    shareLink: "https://wa.me/?text=",
    icon: <FaWhatsapp />,
  },
  {
    name: "facebook",
    shareLink: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: <FaFacebook />,
  },
  {
    name: "x",
    shareLink: "https://twitter.com/intent/tweet?url=",
    icon: <FaXTwitter />,
  },
  {
    name: "threads",
    shareLink: "https://threads.net/intent/post?text=",
    icon: <FaThreads />,
  },
  {
    name: "telegram",
    shareLink: "https://t.me/share/url?url=",
    icon: <FaTelegram />,
  },
]

export const Sharers = ({ title, image, description }) => {
  const link = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="d-flex flex-column gap-2">
      {shareSocials.map((item, index) => {
        const shareLink = formatShareUrl(item.shareLink, link, item.name, title, image, description)

        return (
          <a
            key={index}
            className="d-flex align-items-center justify-content-center p-2 border border-1 rounded sharer-icon text-decoration-none"
            href={shareLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            title={`Share on ${item.name}`}
          >
            {item.icon}
          </a>
        )
      })}
    </div>
  )
}

export const SimpleSharers = ({ title, image, description }) => {
  const link = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="my-4">
      <p className="fw-bold fs-6 mb-3 text-muted">Share this article:</p>
      <div className="d-flex flex-wrap gap-2">
        {simpleSocials.map((item, index) => {
          const shareLink = formatShareUrl(item.shareLink, link, item.name, title, image, description)
          return (
            <a
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 text-capitalize"
              href={shareLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              key={index}
              title={`Share on ${item.name}`}
            >
              {item.icon} {item.name}
            </a>
          )
        })}
      </div>
    </div>
  )
}

Sharers.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
}

SimpleSharers.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
}
