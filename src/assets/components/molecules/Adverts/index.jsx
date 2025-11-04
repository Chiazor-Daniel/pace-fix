"use client"

import PropTypes from "prop-types"
import Image from "next/image"
import useFetch from "../../../custom/UseFetch"

const AltImage = "/default_advert.jpg"

const Adverts = ({ index, hideLabel = false }) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}promotions/`
  const { loading, data } = useFetch(url, "adverts")

  const advert = !loading && data?.[index]
  const image = advert?.image_file || AltImage
  const link = advert?.link || null

  return (
    <div className="text-center my-4">
      {!hideLabel && (
        <p>
          <b>
            <small>Advertisement</small>
          </b>
        </p>
      )}

      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="d-block">
          <Image
            src={image}
            alt={`Advert ${index}`}
            width={600}
            height={400}
            className="img-thumbnail rounded advert-img-max-height"
            style={{ objectFit: "cover" }}
          />
        </a>
      ) : (
        <div className="d-block">
          <Image
            src={image}
            alt={`Advert ${index}`}
            width={600}
            height={400}
            className="img-thumbnail rounded advert-img-max-height"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  )
}

Adverts.propTypes = {
  index: PropTypes.number.isRequired,
  hideLabel: PropTypes.bool,
}

export default Adverts
