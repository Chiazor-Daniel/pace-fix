"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPaperPlane,
  FaPhone,
  FaMapLocation,
  FaSquareEnvelope,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaThreads,
} from "react-icons/fa6";

import { Layout } from "..";
import "./style.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isAdvertisement, setIsAdvertisement] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}email/`;

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name wasn't provided.");
      return;
    }
    if (!email) {
      toast.error("Email Address wasn't provided.");
      return;
    }
    if (!message) {
      toast.error("Message wasn't provided.");
      return;
    }

    const emailData = {
      full_name: name,
      email_address: email,
      subject: isAdvertisement ? `[ADVERTISEMENT] ${subject}` : subject,
      message: isAdvertisement
        ? `ADVERTISEMENT INQUIRY:\n\n${message}`
        : message,
      type: isAdvertisement ? "advertisement" : "general",
    };

    // Make a call to the backend contact api.
    axios
      .post(url, emailData)
      .then((res) => {
        // Send toast message and clear form.
        toast.success("Message Sent Successfully!");
        setName("");
        setMessage("");
        setSubject("");
        setEmail("");
        setIsAdvertisement(false);
      })
      .catch((err) => {
        console.error("Contact form error:", err);
        const details = err.response?.data;
        const status = err.response?.status;

        if (status !== 200) {
          toast.warning(`Error: ${err.message}`);
          if (typeof details === "object" && details) {
            // Loop through object
            for (const detailsKey in details) {
              const message = `${detailsKey}: ${details[detailsKey]}`;
              toast.warning(message);
            }
          }
        } else {
          toast.success("Message Sent Successfully!");
          //   Clear form
          setEmail("");
          setMessage("");
          setName("");
          setSubject("");
          setIsAdvertisement(false);
        }
      });
  };

  return (
    <Layout>
      <div className="post-container my-5">
        <ToastContainer position="top-right" autoClose={5000} />

        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h1 className="fw-bold mb-4">Contact Us</h1>
                <p className="lead">
                  Ready to advertise with us or have a general inquiry? We'd
                  love to hear from you.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="row mb-5">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <FaMapLocation className="fs-1 text-primary mb-3" />
                      <h5 className="fw-bold">Southern Bureau</h5>
                      <p className="mb-0">
                        16-18 Chief Emeka Ebila Street, Off Eso Bus Stop, Agbani
                        Road, Enugu
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <FaMapLocation className="fs-1 text-success mb-3" />
                      <h5 className="fw-bold">Northern Bureau</h5>
                      <p className="mb-0">
                        93A Kwame Nkrumah Crescent, By ECOWAS Secretariat,
                        Asokoro, Abuja
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <FaPhone className="fs-1 text-danger mb-3" />
                      <h5 className="fw-bold">Phone</h5>
                      <p className="mb-1">
                        <a
                          href="tel:+2349137940957"
                          className="text-decoration-none"
                        >
                          09137940957
                        </a>
                      </p>
                      <p className="mb-0">
                        <a
                          href="tel:+2348184441324"
                          className="text-decoration-none"
                        >
                          08184441324
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <FaSquareEnvelope className="fs-1 text-warning mb-3" />
                      <h5 className="fw-bold">Email</h5>
                      <p className="mb-1">
                        <a
                          href="mailto:admin@pacesetterfrontier.com"
                          className="text-decoration-none"
                        >
                          admin@pacesetterfrontier.com
                        </a>
                      </p>
                      <p className="mb-0 small text-muted">
                        Ads:{" "}
                        <a
                          href="mailto:thepacesetter03@gmail.com"
                          className="text-decoration-none"
                        >
                          thepacesetter03@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center mb-5">
                <h5 className="fw-bold mb-3">Follow Us</h5>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="btn btn-outline-primary btn-sm">
                    <FaFacebook className="me-2" />
                    Facebook
                  </a>
                  <a
                    href="https://x.com/pacefrontier?t=Qwc_E5t52eq1beAyuXMdmw&s=09"
                    className="btn btn-outline-dark btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaXTwitter className="me-2" />X (Twitter)
                  </a>
                  <a
                    href="https://www.instagram.com/frontierdiscourse?igsh=MTgyaW9la21pcGtpMg=="
                    className="btn btn-outline-danger btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="me-2" />
                    Instagram
                  </a>
                  <a href="#" className="btn btn-outline-danger btn-sm">
                    <FaYoutube className="me-2" />
                    YouTube
                  </a>
                  <a href="#" className="btn btn-outline-dark btn-sm">
                    <FaThreads className="me-2" />
                    Threads
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="card shadow">
                <div className="card-body">
                  <h3 className="fw-bold mb-4 text-center">
                    Send Us a Message
                  </h3>

                  <form onSubmit={HandleSubmit} className="contactForm">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label fw-bold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label fw-bold">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        placeholder="Enter message subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isAdvertisement"
                          checked={isAdvertisement}
                          onChange={(e) => setIsAdvertisement(e.target.checked)}
                        />
                        <label
                          className="form-check-label fw-bold text-success"
                          htmlFor="isAdvertisement"
                        >
                          This is an advertisement inquiry
                        </label>
                      </div>
                      {isAdvertisement && (
                        <small className="text-muted">
                          Your message will be forwarded to our advertising team
                          for priority handling.
                        </small>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label fw-bold">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        className="form-control"
                        rows="6"
                        placeholder={
                          isAdvertisement
                            ? "Please provide details about your advertising needs, budget, preferred placement, and timeline..."
                            : "Enter your message here..."
                        }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-danger btn-lg fw-bold"
                      >
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Advertisement Info */}
              <div className="alert alert-success mt-4" role="alert">
                <h5 className="alert-heading fw-bold">
                  <FaPaperPlane className="me-2" />
                  Advertise With Us
                </h5>
                <p className="mb-0">
                  We offer electronic and print media ads with unique market
                  control and edge. For advertising inquiries, contact our ad
                  team directly at{" "}
                  <a
                    href="mailto:thepacesetter03@gmail.com"
                    className="alert-link"
                  >
                    thepacesetter03@gmail.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+2348184441324" className="alert-link">
                    08184441324
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
