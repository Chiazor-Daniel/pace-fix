"use client"

import { useState } from "react"
import {
  FaMapLocation,
  FaSquareEnvelope,
  FaPager,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaThreads,
} from "react-icons/fa6"
import { CgSpinnerTwo } from "react-icons/cg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Layout } from ".."
import { isValidEmail } from "../../custom/Utils"

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    isAdvertisement: false,
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name")
      return
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address")
      return
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message")
      return
    }

    setLoading(true)

    try {
      // Here you would make the API call to send the email
      const emailData = {
        full_name: formData.name,
        email_address: formData.email,
        phone: formData.phone,
        subject: formData.isAdvertisement ? `Advertisement Inquiry: ${formData.subject}` : formData.subject,
        message: formData.message,
        is_advertisement: formData.isAdvertisement,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        isAdvertisement: false,
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container my-5 py-5">
        {/* About Section */}
        <section className="mb-5">
          <h1 className="fw-bold text-uppercase mb-5">About Pacesetter Frontier Magazine</h1>

          <div className="row">
            <div className="col-lg-8">
              <p className="lead">
                Pacesetter Frontier Magazine is a privately owned, quarterly published, multimedia, multi-connect,
                cosmopolitan, print and online Magazine established in 2020 with a market audience cutting across states
                of Nigeria, the nation's capital – Abuja, and diaspora communities.
              </p>

              <p>
                Our interests are across multiple sectors from Politics, News, Economy, Religion and Education to
                Lifestyle, Culture, Women, Health, Events, etc. Our editions are the Easter, Democracy, Independence and
                Christmas/New Year editions.
              </p>

              <h3 className="fw-bold mt-5 mb-3">Frontier Discourse Initiative</h3>
              <p>
                One of our initiatives is a colloquium named Frontier Discourse Annual Public Lecture Series and Awards,
                among other flagship programs. In 2021, observing the chasm that existed on the African continent
                between those in government and those governed, the desire for more public-private sector platforms for
                reviews and cross-fertilization of development ideas and poised to contribute to an informed Africa,
                acknowledging outstanding contributors to its development, the Magazine spearheaded Frontier Discourse.
              </p>

              <p>
                This initiative has spurred robust discussions on inclusive peace, responsible governance, societal
                progress and development, gaining traction as a major platform by Africa's public-private sector leaders
                and political class. Delegates count are captains of industries, spiritual leaders, traditional rulers,
                the political class, youth bodies, civil & non-governmental organizations, professional bodies, the
                formal sector, high school students, college undergraduates and recipients of the Magazine's honours.
              </p>

              <p>
                The initiative also features History, Comedy, Poetry and Cultural exhibitions and has cumulatively
                hosted over 4,000 Africans physically and virtually.
              </p>

              <p className="fw-bold">
                The Magazine is a leading electronic and print media committed to making a stride in time. Pacesetter
                Frontier cares about quality content, making us one of the widely read magazines you can find around.
              </p>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Contact Information</h5>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary">Southern Bureau</h6>
                    <p className="mb-2">
                      <FaMapLocation className="text-danger me-2" />
                      16-18 Chief Emeka Ebila Street, Off Eso Bus Stop Agbani Road, Enugu
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary">Northern Bureau</h6>
                    <p className="mb-2">
                      <FaMapLocation className="text-danger me-2" />
                      93A Kwame Nkrumah Crescent, By ECOWAS Secretariat, Asokoro, Abuja
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2">
                      <FaSquareEnvelope className="text-danger me-2" />
                      <a href="mailto:admin@pacesetterfrontier.com" className="text-decoration-none text-danger">
                        admin@pacesetterfrontier.com
                      </a>
                    </p>
                    <p className="mb-2">
                      <FaPager className="text-danger me-2" />
                      <a href="tel:+2349137940957" className="text-decoration-none text-danger">
                        09137940957
                      </a>
                      ,
                      <a href="tel:+2348184441324" className="text-decoration-none text-danger ms-1">
                        08184441324
                      </a>
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold">Follow Us</h6>
                    <div className="d-flex gap-3">
                      <a href="#" className="text-primary fs-4">
                        <FaFacebook />
                      </a>
                      <a href="#" className="text-dark fs-4">
                        <FaXTwitter />
                      </a>
                      <a href="#" className="text-danger fs-4">
                        <FaInstagram />
                      </a>
                      <a href="#" className="text-danger fs-4">
                        <FaYoutube />
                      </a>
                      <a href="#" className="text-dark fs-4">
                        <FaThreads />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm mt-4">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-success">Advertise With Us</h5>
                  <p className="small">
                    We offer electronic and print media ads. This gives us a unique control and edge over the market.
                  </p>
                  <p className="small">
                    For advert engagement, reach our ad team through{" "}
                    <a href="mailto:thepacesetter03@gmail.com" className="text-decoration-none text-success">
                      thepacesetter03@gmail.com
                    </a>{" "}
                    or{" "}
                    <a href="tel:+2348184441324" className="text-decoration-none text-success">
                      08184441324
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mt-5 pt-5 border-top">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-4 text-center">Get In Touch</h2>
              <p className="text-center text-muted mb-5">
                Have a question, story tip, or want to advertise with us? We'd love to hear from you!
              </p>

              <form onSubmit={handleSubmit} className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-bold">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label fw-bold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="subject" className="form-label fw-bold">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isAdvertisement"
                        name="isAdvertisement"
                        checked={formData.isAdvertisement}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label fw-bold text-success" htmlFor="isAdvertisement">
                        This is an advertisement inquiry
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-bold">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={
                        formData.isAdvertisement
                          ? "Please describe your advertising needs, target audience, budget, and preferred ad placement..."
                          : "Tell us what's on your mind..."
                      }
                      required
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg px-5" disabled={loading}>
                      {loading ? (
                        <>
                          <CgSpinnerTwo className="spin-icon me-2" />
                          Sending...
                        </>
                      ) : formData.isAdvertisement ? (
                        "Send Advertisement Inquiry"
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About
