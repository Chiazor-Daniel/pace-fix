"use client"

import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import { isValidEmail } from "../../../custom/Utils"
import { CgSpinnerTwo } from "react-icons/cg"

const Form = ({ post_id }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const url = `${process.env.NEXT_PUBLIC_API_URL}comments/`

  const sendApprovalEmail = (full_name, email_address, comment) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}email/`
    const message = comment
    const subject = "Comment awaiting approval."
    // Make an axios call.
    axios
      .post(url, { full_name, email_address, subject, message })
      .then((res) => {
        toast.success("Approval email sent.")
      })
      .catch((err) => {
        const details = err.response.data
        console.error("Issue sending comment approval email", details)
        toast.error("Comment Approval Email not sent!")
      })
  }

  const HandleSubmit = (e) => {
    // Stop the form from submitting.
    e.preventDefault()
    // Verify important fields are filled.
    if (!name) toast.error("Your name is important.")
    if (!email) toast.error("Your email address wasn't provided.")
    if (!comment) toast.error("Your comment is missing.")

    // Start sending process if all is well at this point
    if (comment && name && email) {
      // Validate email address
      if (!isValidEmail(email)) toast.warning("Invalid email provided.")
      // signal the user that comment was sent successfully.
      else {
        setLoading(true)
        // Send comment to the website
        axios
          .post(url, {
            post: post_id,
            content: comment,
            author_email: email,
            author_name: name,
          })
          .then((res) => {
            // Clear the form and send confirmation message
            setName("")
            setEmail("")
            setComment("")
            toast.success("Comment Sent! Awaiting Approval 😁")
            setLoading(false)
            // Send Approval waiting email.
            sendApprovalEmail(name, email, comment)
          })
          .catch((err) => {
            console.error(err.message)
            toast.error("An error occurred. Contact site admin 😭")
            setLoading(false)
          })
      }
    }
  }

  return (
    <div className="comment-form my-5">
      <ToastContainer />
      <h4 className="poppins fw-bold">Leave your reply!</h4>
      <form>
        <label htmlFor="comment">
          <small>Comment</small>
          <sup>*</sup>
        </label>
        <textarea
          id="comment"
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name">
              <small>Name</small>
              <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-control p-2"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name">
              <small>Email Address</small>
              <sup>*</sup>
            </label>
            <input
              type="email"
              className="form-control p-2"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-dark mt-3" onClick={HandleSubmit}>
          {loading ? "Processing ... " : "Send your comment."}
          {loading && <CgSpinnerTwo className="spin-icon" />}
        </button>
      </form>
    </div>
  )
}

export default Form
