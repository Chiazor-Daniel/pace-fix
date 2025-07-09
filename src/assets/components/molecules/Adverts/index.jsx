"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import UseFetch from "../../../custom/UseFetch"

const AltImage = "/default_advert.jpg"

const Adverts = ({ index, hideLabel = false }) => {
  const [isClient, setIsClient] = useState(false)
  const [image, setImage] = useState(AltImage)
  
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}promotions/`
  const { loading, data } = UseFetch(url, "adverts")

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !loading && data && data[index]) {
      setImage(data[index]?.image_file || AltImage)
    }
  }, [isClient, loading, data, index])

  if (!isClient) {
    return (
      <div className="text-center my-4">
        <p className={hideLabel ? "d-none" : ""}>
          <b>
            <small>Advertisement</small>
          </b>
        </p>
        <Image
          src={AltImage}
          alt={`Advert ${index}`}
          width={600}
          height={400}
          className={"img-thumbnail rounded advert-img-max-height"}
          style={{ objectFit: "cover" }}
        />
      </div>
    )
  }

  return (
    <div className="text-center my-4">
      <p className={hideLabel ? "d-none" : ""}>
        <b>
          <small>Advertisement</small>
        </b>
      </p>
      <Image
        src={image}
        alt={`Advert ${index}`}
        width={600}
        height={400}
        className={"img-thumbnail rounded advert-img-max-height"}
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}

Adverts.propTypes = {
  index: PropTypes.number.isRequired,
  hideLabel: PropTypes.bool,
}

export default Adverts
