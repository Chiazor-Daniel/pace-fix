"use client"

import Link from "next/link"
import { FaAngleUp } from "react-icons/fa6"

import { ArticleTitle } from "../../headers"
import { LatestSlider } from "../.."
import { socials } from "../../../data"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row mt-5">
          <div className="col-md-6 p-3 pe-md-5">
            <ArticleTitle title="pacesetter frontier magazine" light class_={"fs-6 mx-0 mb-3"} width={75} />

            <p className="text-center mt-5">
              <Link href={"/"}>
                <img src={"/footer_logo.jpg"} alt="Pacesetter Bottom Logo" width={300} style={
                  {
                    borderRadius: "10px"
                  }
                } />
              </Link>
            </p>

            <p className="text-justify text-white poppins my-4 lh-2">
              <b>Pacesetter Frontier Magazine</b> is a privately owned, quarterly published, multimedia, multi-connect,
              cosmopolitan, print and online Magazine established in 2020 with a market audience cutting across states
              of Nigeria, the nation's capital – Abuja, and diaspora communities.
            </p>
          </div>
          <div className="col-md-6 p-3 pe-md-5">
            <ArticleTitle title="recent news" light class_={"fs-6 mx-0 mb-3 text-md-center"} width={50} />
            <div className="mt-5 text-white">
              <LatestSlider light />
            </div>
          </div>
        </div>
      </div>
      <div className="credit text-white text-center fs-12">
        <p className="mt-5 w-75 m-auto">

          {/* <a
            href="https://mark-eke.netlify.app"
            className="text-warning fw-bold text-decoration-none"
            rel="noreferrer"
            target="_blank"
          >
            Karm
          </a>{" "} */}
          ©Frontpace Communications Limited
        </p>
        <p className="my-4">
          Follow us on all Social Platforms{" "}
          {socials.map((item) => (
            <a
              href={item.link}
              rel="noreferrer"
              className="text-white p-1 px-2"
              target="_blank"
              key={item.name}
              title={item.name}
            >
              {item.icon}
            </a>
          ))}
        </p>
      </div>
      <button
        id="scroll-top"
        className="rounded-circle shadow btn btn-dark p-3"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaAngleUp className="fs-3" />
      </button>
    </footer>
  )
}

export default Footer
