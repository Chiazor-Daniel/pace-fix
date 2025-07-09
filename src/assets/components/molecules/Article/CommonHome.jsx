"use client"

import PropTypes from "prop-types"
import { ArticleTitle } from "../../headers"
import { LoadMore } from "../../buttons"
import { VerticalSegment } from "../../newsItem"
import { UseFetch, getKeyByValue } from "../../../custom"
import { Preloader } from "../../loaders"
import { Categories } from "../../../data"
import { useState } from "react"
import { useInView } from 'react-intersection-observer';

const CommonHome = ({ name, start, skip = 4, columns = 6, extras = "" }) => {
  // name = name.toLowerCase();
  let category_id = getKeyByValue(Categories, name)
  if (category_id === undefined) category_id = 6
  let url = `${process.env.NEXT_PUBLIC_API_URL}posts?categories=${category_id}&per_page=5`
  
  // Modify url based on extras
  if (extras.trim().length > 0) {
    url = `${process.env.NEXT_PUBLIC_API_URL}posts?search=${extras}&per_page=16`
  }
  const [begin, setBegin] = useState(start)
  const { ref, inView } = useInView({ triggerOnce: true });

  const handleClick = () => {
    setBegin((prev) => prev + skip)
  }

  // fetch posts
  const { loading, data } = UseFetch(inView ? url : null, `posts_${name}`)
  // index for now
  const end = begin + skip
  return (<div className="p-3 mb-5" ref={ref}>
      <ArticleTitle title={name} />
      <div className="py-4 row">
        {loading ? (
          <div className="position-relative" style={{ height: 400 }}>
            <Preloader />
          </div>
        ) : (
          data.slice(start, end).map((item) => (
            <div className={`col-md-${columns} my-3`} key={item.id}>
              <VerticalSegment {...item} catName={name} item={item} />
            </div>
          ))
        )}
      </div>
      <LoadMore disabled={loading} click={handleClick} />
    </div>
  )
}

CommonHome.propTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  skip: PropTypes.number,
  columns: PropTypes.number,
  extras: PropTypes.string,
}

export default CommonHome
