"use client"

import { useState } from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Helmet } from "react-helmet-async"

export const HandleWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return width
}

export const manipulateDate = (dateString) => {
  /*
   * This function simply calculates the time given to it and returns how
   * long it has been either as a yesterday, N days ago, last week, N weeks ago
   * last month, N months ago and full time.
   * */
  const originalTime = dateString.replace("T", " ")
  dateString = dateString.split("T")[0]
  const date = new Date(dateString)
  const today = new Date()

  // Function to check if two dates are the same
  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()

  if (isSameDate(date, today)) return originalTime

  const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24))
  let n = diffInDays

  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 0) return "Future"
  if (diffInDays <= 7) return `${n} day(s) ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  n = diffInWeeks
  if (diffInWeeks === 1) return "Last week"
  if (diffInWeeks <= 5) return `${n} week(s) ago`

  const diffInMonths = Math.floor(diffInDays / 30)
  n = diffInMonths
  if (diffInMonths === 1) return "Last month"
  if (diffInMonths <= 12) return `${n} month(s) ago`

  return originalTime
}

export const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value)
}

const capitalizeFirstChars = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const ScrollToTop = (props) => {
  const pathname = usePathname()

  useEffect(() => {
    // Code to change title on location change
    let title = ""
    if (pathname !== "/") {
      // Get the last item in the url
      let name = pathname.split("/")
      let hold = name[name.length - 1]
      //Try fetching name if title is not gotten
      if (!hold) hold = name[name.length - 2]
      // remove the - in the variable
      name = hold.replaceAll("-", " ")
      name = capitalizeFirstChars(name)
      title = `${name} |-|`
    }
    // Modify title.
    modifyTitle(title)

    // Code to scroll up on location change!
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Code to ensure scrolling only after the new content is loaded
    const scrollAfterRender = () => {
      if (window.scrollY) {
        const scrollBtn = document.getElementById("scroll-top")
        if (scrollBtn) scrollBtn.click()
      }
    }

    window.requestAnimationFrame(scrollAfterRender)
  }, [pathname])

  return <>{props.children}</>
}

export const SocialPreviews = ({ title, description, name, type, image }) => {
  return (
    <Helmet>
      <meta name="description" content={description} />

      {/*  Facebook Tags*/}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/*  Twitter Tags*/}
      <meta property="twitter:creator" content={name} />
      <meta property="twitter:card" content={type} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/*  Google Adsense*/}
      <meta name="google-adsense-account" content="ca-pub-3536158399576400" />
    </Helmet>
  )
}

export const modifyTitle = (title) => {
  // Simple function to modify and set title.
  title = title + " Pacesetter Frontier Magazine"
  // replace %20 with spaces when seen.
  title = title.replaceAll("%20", " ")
  if (typeof document !== "undefined") {
    document.title = title.trim()
  }
}

export const isValidEmail = (email) => {
  // Regular expression pattern for validating email addresses
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

export const truncateExcerpt = (rendered, num = 15) => {
  // Remove HTML tags
  const text = rendered.replace(/<\/?[^>]+(>|$)/g, "")
  // Split the text into words
  const words = text.split(/\s+/)
  // Take the first 15 words or given
  const truncatedText = words.slice(0, num).join(" ")
  // Add the ellipsis and closing paragraph tag
  return `<p>${truncatedText} [&hellip;]</p>`
}

export const manipulateDate2 = (dateString) => {
  // Create a Date object from the string
  const dateObj = new Date(dateString)

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get the month, day, and year from the Date object
  const month = monthNames[dateObj.getMonth()]
  const day = String(dateObj.getDate()).padStart(2, "0")
  const year = dateObj.getFullYear()

  // Format the date as "Month DD, YYYY"
  return `${month} ${day}, ${year}`
}
