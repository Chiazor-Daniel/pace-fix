"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi"
import { TfiSearch, TfiUser } from "react-icons/tfi"
import { SlMenu } from "react-icons/sl"

import { navMenu } from "../../data"
import MobileSide from "./MobileSide"

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [displayNav, setDisplayNav] = useState(false)
  const router = useRouter()

  const HandleSubmit = (e) => {
    e.preventDefault()
    const term = searchTerm.trim()
    // Go to search page if criteria is met.
    if (term.length > 0) {
      // Replace spaces with hyphens for URL
      const searchUrl = term.replace(/\s+/g, "-").toLowerCase()
      router.push(`/search/${searchUrl}`)
    }
    setSearchTerm("")
    // close search modal.
    const closeButton = document.getElementById("search-modal-close")
    if (closeButton) closeButton.click()
  }

  return (
    <div className="p-3 border-bottom border-1 sticky-top bg-white shadow-sm">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link href={"/"} className="navbar-brand">
            <Image
              src="/top-logo.png"
              alt="Pacesetter Frontier Magazine"
              height={80}
              width={260}
              priority
              className="img-fluid"
            />
          </Link>

          <div className="d-flex align-items-center fs-4">
            <div className="nav-body me-3 hide-on-sm">
              {navMenu.map((item, index) => (
                <div key={index} className={`text-uppercase fs-13 mx-2 hover-red ${item.links && "my-dropdowns"}`}>
                  <Link
                    href={item.links ? "#" : `/${item.link}`}
                    className="fw-bold-5 text-dark text-decoration-none d-flex align-items-center"
                  >
                    {item.name} {item.links && <PiDotsThreeOutlineVerticalDuotone className="ms-1" />}
                  </Link>
                  {item.links && (
                    <ul className="my-dropdown-container">
                      {item.links.map((address, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={
                              address.link
                                ? address.link
                                : item.name.toLowerCase() === "columns"
                                  ? `/category/${address.name.toLowerCase().replace(/\s+/g, '-')}`
                                  : `/${address.name.toLowerCase().replace(/\s+/g, '-')}`
                            }
                            className="text-capitalize my-dropdown-item"
                            target={address.link ? `_blank` : undefined}
                            rel={address.link ? "noreferrer" : undefined}
                          >
                            {address.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <button
              className="btn btn-link p-0 me-2 text-dark"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
              title="Search"
            >
              <TfiSearch className="hover-red" />
            </button>



            <button
              className="btn btn-link p-0 text-dark hide-on-lg"
              onClick={() => setDisplayNav(!displayNav)}
              title="Menu"
            >
              <SlMenu className="hover-red fw-bold" />
            </button>
          </div>
        </div>
      </div>

      {/*Enhanced Search Modal*/}
      <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="searchModalLabel">
                Search Articles
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="search-modal-close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={HandleSubmit}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control form-control-lg"
                    placeholder="Search for articles, topics, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <button className="btn btn-danger" type="submit" disabled={!searchTerm.trim()}>
                    <TfiSearch />
                  </button>
                </div>
                <small className="text-muted mt-2 d-block">Press Enter or click search to find articles</small>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side bar */}
      <MobileSide menus={navMenu} display={displayNav} />
    </div>
  )
}

export default NavBar
