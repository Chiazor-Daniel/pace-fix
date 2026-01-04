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
        {/* Top Row: Logo & Actions */}
        <div className="d-flex justify-content-between align-items-center mb-2">
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

          <div className="d-flex align-items-center gap-3">
            {/* Search Trigger */}
            <button
              className="btn btn-link p-0 text-dark"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
              title="Search"
            >
              <TfiSearch size={20} className="hover-red transition-all" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              className="btn btn-link p-0 text-dark hide-on-lg"
              onClick={() => setDisplayNav(!displayNav)}
              title="Menu"
            >
              <SlMenu size={24} className="hover-red fw-bold transition-all" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation (Desktop) */}
        <div className="nav-bottom-row hide-on-sm border-top border-light pt-2 pb-1">
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
            {navMenu.map((item, index) => (
              <div key={index} className={`position-relative group ${item.links && "my-dropdowns"}`}>
                <Link
                  href={item.links ? "#" : `/${item.link}`}
                  className="nav-link-custom text-uppercase fs-12 fw-bold text-secondary text-decoration-none d-flex align-items-center py-1"
                >
                  {item.name} {item.links && <PiDotsThreeOutlineVerticalDuotone className="ms-1" />}
                </Link>

                {/* Custom Underline Effect */}
                <div className="nav-underline"></div>

                {item.links && (
                  <ul className="my-dropdown-container shadow-sm border-top border-danger border-2" style={{ zIndex: 1000, minWidth: '200px', backgroundColor: '#fff', padding: '10px 0' }}>
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
                          className="d-block px-3 py-2 text-decoration-none text-dark fs-13 hover-bg-light transition-all"
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
        </div>
      </div>

      {/*Enhanced Search Modal*/}
      <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
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
