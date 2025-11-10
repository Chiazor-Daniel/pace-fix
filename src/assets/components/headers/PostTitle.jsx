"use client";

import PropTypes from "prop-types";

import { AuthorTime } from "../metaInfo";
import { Categories } from "../../data";
import Link from "next/link";

const PostTitle = ({ title, categories = [], details = {} }) => {
  const readTime = details?.twitter_misc?.["Est. reading time"]?.[0] || "";
  return (
    <div className="my-3">
      <p className="fw-bold mt-4">
        {(categories || []).map((id, index) => (
          <Link
            className="name text-decoration-none me-1 text-capitalize btn-outline-danger btn fw-bold fs-12-mobile"
            href={`/category/${Categories[id] || ""}/`}
            key={id}
          >
            {Categories[id] || ""}
            {(categories?.length || 0) - 1 > index ? ", " : ""}
          </Link>
        ))}
      </p>
      <h2
        className="text-muted lh-1 fw-bold poppins my-5"
        dangerouslySetInnerHTML={{
          __html: typeof title === "string" ? title : title?.rendered || "",
        }}
      />

      <div style={{ maxWidth: 300 }}>
        <AuthorTime
          author={details?.author}
          date={details?.article_published_time}
          comments={12}
          readTime={readTime}
          between
        />
      </div>
    </div>
  );
};

PostTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  categories: PropTypes.array,
  details: PropTypes.object,
};

export default PostTitle;
