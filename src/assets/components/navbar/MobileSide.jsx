"use client"

import Link from "next/link"
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi"

const MobileSide = ({ menus, display }) => {
  return (
    <div className={`hide-on-lg my-mobile-sidenav ${display && "revert-transform"}`}>
      <div className="container my-5 pt-5">
        {menus.map((item, index) => (
          <div
            key={index}
            className={`text-uppercase fs-13 py-2  mx-2 hover-red ${item.links && "my-dropdowns my-mobile-dropdowns"}`}
          >
            <Link href={item.links ? "#" : `/${item.link}`} className="fw-bold-5 text-white text-decoration-none">
              {item.name} {item.links && <PiDotsThreeOutlineVerticalDuotone />}
            </Link>
            {item.links && (
              <ul className="my-mobile-dropdown-container">
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
                      target={address.link ? "_blank" : undefined}
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
  )
}

export default MobileSide
