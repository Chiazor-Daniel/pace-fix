"use client";

import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { ArticleTitle } from "../../headers";
import { LoadMore } from "../../buttons";
import { VerticalSegment } from "../../newsItem";
import { UseFetch, getKeyByValue } from "../../../custom";
import { Categories } from "../../../data";

const CommonHome = ({ name, start, skip = 4, columns = 6, extras = "" }) => {
  const categoryId = getKeyByValue(Categories, name) ?? 6;
  const url = extras.trim()
    ? `${process.env.NEXT_PUBLIC_API_URL}posts?search=${extras}&per_page=16`
    : `${process.env.NEXT_PUBLIC_API_URL}posts?categories=${categoryId}&per_page=5`;

  const [begin, setBegin] = useState(start);
  const { loading, data } = UseFetch(url, `posts_${name}`); // 👈 fetch immediately

  const handleClick = () => setBegin((prev) => prev + skip);

  const visiblePosts = useMemo(() => {
    if (!data) return [];
    return data.slice(start, begin + skip);
  }, [data, start, begin, skip]);

  return (
    <div className="p-3 mb-5">
      <ArticleTitle title={name} />
      <div className="py-4 row">
        {loading
          ? Array.from({ length: skip }).map((_, i) => (
              <div className={`col-md-${columns} my-3`} key={i}>
                <Skeleton height={200} className="w-100 mb-2 rounded" />
                <Skeleton count={2} />
              </div>
            ))
          : visiblePosts.map((item) => (
              <div className={`col-md-${columns} my-3`} key={item.id}>
                <VerticalSegment {...item} catName={name} item={item} />
              </div>
            ))}
      </div>
      <LoadMore disabled={loading} click={handleClick} />
    </div>
  );
};

CommonHome.propTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  skip: PropTypes.number,
  columns: PropTypes.number,
  extras: PropTypes.string,
};

export default CommonHome;
